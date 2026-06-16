"""
DANE PPED 2018–2050 — age-by-sex pyramids by department
--------------------------------------------------------
Reads the "PobDepartamentalxÁreaSexoEdad" sheet (single-year ages) and
aggregates into 5-year groups, producing the lazy-loaded age.json.

Column layout (0-based, confirmed from the sheet):
    0 DP   1 DPNOM   2 AÑO   3 ÁREA   4 Total   5 Hombres   6 Mujeres
    7..107   Hombres 0..100+   (101 single-year columns)
    108..208 Mujeres 0..100+   (101)
    209..309 Total 0..100+     (ignored — it's male + female)

Only the "Total" area row is used. Output is year-major columnar:
    departments[code].male[yearIndex] -> [count per ageGroup]

Usage:
    python scripts/parse_age.py
"""

import json
from pathlib import Path
import pandas as pd

XLSX_FILE   = "data/PPED-AreaSexoEdadDep-2018-2050_VP.xlsx"
SHEET_INDEX = 2
SKIP_ROWS   = 9
STATIC_FILE = "src/data/departments.json"
OUT_FILE    = "src/data/age.json"

MALE_START,   MALE_END   = 7, 108     # slice end is exclusive -> 101 columns
FEMALE_START, FEMALE_END = 108, 209
N_AGES = 101                          # ages 0..100+

# 5-year groups: 0-4 … 80-84, then 85+ (everything 85 and over)
AGE_GROUPS = [f"{i * 5}-{i * 5 + 4}" for i in range(17)] + ["85+"]
TOP_GROUP = len(AGE_GROUPS) - 1       # index of "85+"


def group_index(age):
    return TOP_GROUP if age >= 85 else age // 5


def aggregate(ages):
    """Aggregate 101 single-year counts into the 18 five-year groups."""
    groups = [0] * len(AGE_GROUPS)
    for age in range(N_AGES):
        val = ages[age]
        groups[group_index(age)] += 0 if pd.isna(val) else int(val)
    return groups


def main():
    xlsx_path = Path(XLSX_FILE)
    if not xlsx_path.exists():
        raise FileNotFoundError(f"Could not find '{xlsx_path.resolve()}'")

    xl = pd.ExcelFile(xlsx_path)
    sheet = xl.sheet_names[SHEET_INDEX]
    print(f"Reading '{xlsx_path}', sheet '{sheet}', skipping {SKIP_ROWS} rows…")

    df = pd.read_excel(xl, sheet_name=sheet, skiprows=SKIP_ROWS, header=None)

    dp     = df.iloc[:, 0]
    year   = df.iloc[:, 2]
    area   = df.iloc[:, 3].astype(str).str.strip()
    h_tot  = df.iloc[:, 5]

    mask = area == "Total"
    df_t = df[mask].copy()
    print(f"Found {len(df_t)} department-year 'Total' rows.")

    # Collect per-department, per-year aggregated pyramids
    # tmp[code][year] = {"male": [...18], "female": [...18]}
    tmp = {}
    years_set = set()
    warnings = 0

    for _, row in df_t.iterrows():
        raw = str(row.iloc[0]).strip()
        code = (str(int(row.iloc[0])).zfill(2)
                if raw.replace(".0", "").isdigit() else raw.zfill(2))
        yr = int(row.iloc[2])
        years_set.add(yr)

        male_ages   = row.iloc[MALE_START:MALE_END].tolist()
        female_ages = row.iloc[FEMALE_START:FEMALE_END].tolist()
        male   = aggregate(male_ages)
        female = aggregate(female_ages)

        # sanity: aggregated male total should match the Hombres column
        expected = 0 if pd.isna(row.iloc[5]) else int(row.iloc[5])
        if abs(sum(male) - expected) > 1:
            warnings += 1
            if warnings <= 5:
                print(f"  !! {code} {yr}: male sum {sum(male)} != Hombres {expected}")

        tmp.setdefault(code, {})[yr] = {"male": male, "female": female}

    years = sorted(years_set)

    # Build year-major columnar arrays per department
    departments = {}
    for code, by_year in tmp.items():
        departments[code] = {
            "male":   [by_year[y]["male"]   for y in years],
            "female": [by_year[y]["female"] for y in years],
        }

    # National = element-wise sum across departments, per year & age group
    n_groups = len(AGE_GROUPS)
    national = {
        "male":   [[0] * n_groups for _ in years],
        "female": [[0] * n_groups for _ in years],
    }
    for code, d in departments.items():
        for i in range(len(years)):
            for g in range(n_groups):
                national["male"][i][g]   += d["male"][i][g]
                national["female"][i][g] += d["female"][i][g]

    # Sanity: codes line up with the static master
    static = json.load(open(STATIC_FILE, encoding="utf-8"))
    missing = set(static["departments"]) - set(departments)
    if missing:
        print(f"  !! In static but not in age data: {sorted(missing)}")

    out = {
        "years": years,
        "ageGroups": AGE_GROUPS,
        "departments": departments,
        "national": national,
    }
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))

    size_kb = Path(OUT_FILE).stat().st_size / 1024
    print(f"Wrote {OUT_FILE} ({size_kb:.0f} KB)")
    print(f"  Years: {years[0]}–{years[-1]} ({len(years)})")
    print(f"  Departments: {len(departments)} | Age groups: {AGE_GROUPS}")
    print(f"  National 2018 male by group: {national['male'][0]}")
    if warnings:
        print(f"  ({warnings} total-mismatch warnings)")


if __name__ == "__main__":
    main()
