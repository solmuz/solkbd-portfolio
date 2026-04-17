#!/usr/bin/env bash
# duckdns-update.sh — update DuckDNS record with current public IP.
# Run from cron every 5 min:  */5 * * * * /path/to/duckdns-update.sh
set -euo pipefail

: "${DUCKDNS_SUBDOMAIN:?DUCKDNS_SUBDOMAIN is required (e.g. solgap)}"
: "${DUCKDNS_TOKEN:?DUCKDNS_TOKEN is required}"

LOG="${DUCKDNS_LOG:-/var/log/duckdns.log}"

resp=$(curl -fsS "https://www.duckdns.org/update?domains=${DUCKDNS_SUBDOMAIN}&token=${DUCKDNS_TOKEN}&ip=")

ts="$(date '+%Y-%m-%dT%H:%M:%S%z')"
echo "$ts  duckdns update: $resp" >> "$LOG"

if [[ "$resp" != "OK" ]]; then
  echo "DuckDNS update failed: $resp" >&2
  exit 1
fi
