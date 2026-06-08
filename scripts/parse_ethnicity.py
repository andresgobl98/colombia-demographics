"""
DANE CNPV 2018 — Ethnicity by department extractor (sheet 12PD)
----------------------------------------------------------------
Reads the "Cuadro 12PD Departamental" sheet and merges ethnicity
totals (all ages) into the existing demographics.json file.

Usage:
    python scripts/parse_ethnicity.py
"""

import re
import json
from pathlib import Path
import pandas as pd

# ── CONFIG ────────────────────────────────────────────────────────────────────

XLSX_FILE   = "data/cnpv2018.xlsx"
SHEET_NAME  = "12PD"   # adjust if the tab name differs
SKIP_ROWS   = 12       # rows 1-12 are title/header block
DEMO_FILE   = "src/data/demographics.json"

# ── SCRIPT ────────────────────────────────────────────────────────────────────

def main():
    xlsx_path = Path(XLSX_FILE)
    if not xlsx_path.exists():
        raise FileNotFoundError(f"Could not find '{xlsx_path.resolve()}'")

    print(f"Reading '{xlsx_path}', sheet '{SHEET_NAME}', skipping {SKIP_ROWS} rows…")

    df = pd.read_excel(
        xlsx_path,
        sheet_name=SHEET_NAME,
        skiprows=SKIP_ROWS,
        header=None,
        usecols="A:J",
    )

    df.columns = [
        "departamento", "edad",
        "total", "indigena", "gitano_rrom",
        "raizal", "palenquero", "afro",
        "ningun_grupo", "sin_informacion",
    ]

    # Forward-fill merged department cells
    df["departamento"] = df["departamento"].ffill()

    # Drop rows without a total figure
    df = df.dropna(subset=["total"])

    # Only the all-ages "Total" row per department
    df_total = df[df["edad"].astype(str).str.strip() == "Total"].copy()

    # Skip the national aggregate row (no numeric prefix)
    df_total = df_total[df_total["departamento"].astype(str).str.match(r"^\d+")]

    print(f"Found {len(df_total)} department rows.")

    ethnicity_map = {}
    for _, row in df_total.iterrows():
        raw = str(row["departamento"]).strip()   # e.g. "05 Antioquia"

        match = re.match(r"^(\d+)\s+(.+)$", raw)
        if not match:
            print(f"  !! Unexpected format: '{raw}'")
            continue

        code  = match.group(1).zfill(2)
        total = int(row["total"])

        def pct(val):
            try:
                return round(float(val) / total * 100, 2)
            except (ValueError, ZeroDivisionError):
                return 0.0

        ethnicity_map[code] = {
            "indigena":       pct(row["indigena"]),
            "gitano_rrom":    pct(row["gitano_rrom"]),
            "raizal":         pct(row["raizal"]),
            "palenquero":     pct(row["palenquero"]),
            "afro":           pct(row["afro"]),
            "ningun_grupo":   pct(row["ningun_grupo"]),
            "sin_informacion": pct(row["sin_informacion"]),
        }

    # ── Merge into demographics.json ─────────────────────────────────────────
    demo_path = Path(DEMO_FILE)
    with open(demo_path, encoding="utf-8") as f:
        demo = json.load(f)

    matched, unmatched = 0, []
    for code, eth in ethnicity_map.items():
        if code in demo["departments"]:
            demo["departments"][code]["ethnicity"] = eth
            matched += 1
        else:
            unmatched.append(code)

    with open(demo_path, "w", encoding="utf-8") as f:
        json.dump(demo, f, ensure_ascii=False, indent=2)

    print(f"Merged ethnicity into {matched} departments -> '{demo_path}'")
    if unmatched:
        print(f"  !! No match in demographics.json for codes: {unmatched}")
    print("\nSample (first 2):")
    for code, eth in list(ethnicity_map.items())[:2]:
        print(f"  {code}: {eth}")


if __name__ == "__main__":
    main()
