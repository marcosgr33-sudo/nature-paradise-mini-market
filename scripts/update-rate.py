"""Read the Banco Central bulletin text from stdin and update the rate snapshot."""
import json
import re
import sys
from datetime import date, datetime, timezone
from pathlib import Path

MONTHS = "enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre".split()
SOURCE = "https://cdn.bancentral.gov.do/documents/estadisticas/mercado-cambiario/documents/tasaus_mc.pdf"
match = re.search(
    r"cierre\s+del\s+(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4}),\s+"
    r"son\s+de\s+RD\$[\d.]+/US\$\s+y\s+RD\$([\d.]+)/US\$",
    sys.stdin.read(),
    re.IGNORECASE,
)
if not match:
    raise SystemExit("Could not identify the sale rate and closing date in the BCRD bulletin")
day, month, year, sale = match.groups()
closing = date(int(year), MONTHS.index(month.lower()) + 1, int(day)).isoformat()
rate = float(sale)
if not 0 < rate < 1000:
    raise SystemExit("Invalid BCRD sale rate")
path = Path("exchange-rate.json")
if path.exists() and json.loads(path.read_text()).get("date", "") > closing:
    raise SystemExit("The bulletin is older than the existing rate")
snapshot = {
    "date": closing,
    "dopPerUsd": rate,
    "source": SOURCE,
    "checkedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
}
path.write_text(json.dumps(snapshot, indent=2) + "\n")
