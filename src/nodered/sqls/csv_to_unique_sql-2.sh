#!/bin/bash

INPUT_FILE="houses-utf-8-20.csv"
OUTPUT_FILE="insert_data.sql"

if [ ! -f "$INPUT_FILE" ]; then
    echo "Błąd: Plik $INPUT_FILE nie istnieje!"
    exit 1
fi

echo "-- Generated SQL Inserts" > $OUTPUT_FILE

# Używamy standardowego awk (kompatybilnego z mawk/gawk)
# cat "$INPUT_FILE" | sort -u -t ';' -k 1,1 -k 3,3 -k 5,5 | awk -F ';' '
cat "$INPUT_FILE" | awk -F ';' '
NR > 1 {
    # Usuwanie ewentualnych znaków powrotu karetki (\r) z Windowsa
    gsub(/\r/, "", $0)

    # Klucz unikalności: Region (1) + Nowy Powiat (3) + Miejscowość (5)
    unique_key = $1 "|" $3 "|" $5
    
    if (!(unique_key in seen)) {
        seen[unique_key] = 1
        
        # Funkcja do czyszczenia danych i escapowania apostrofów
        region = $1;      gsub(/'\''/, "''", region);     sub(/^[ \t]+/, "", region);     sub(/[ \t]+$/, "", region)
        old_dist = $2;    gsub(/'\''/, "''", old_dist);   sub(/^[ \t]+/, "", old_dist);   sub(/[ \t]+$/, "", old_dist)
        new_dist = $3;    gsub(/'\''/, "''", new_dist);   sub(/^[ \t]+/, "", new_dist);   sub(/[ \t]+$/, "", new_dist)
        community = $4;   gsub(/'\''/, "''", community);  sub(/^[ \t]+/, "", community);  sub(/[ \t]+$/, "", community)
        settlement_name_pref = $5;  gsub(/'\''/, "''", settlement_name_pref); sub(/^[ \t]+/, "", settlement_name_pref); sub(/[ \t]+$/, "", settlement_name_pref)
        settlement_name_clear = $5;  gsub(/'\''/, "''", settlement_name_clear); sub(/^[ \t]+/, "", settlement_name_clear); sub(/[ \t]+$/, "", settlement_name_clear)
        street = $7;      gsub(/'\''/, "''", street);     sub(/^[ \t]+/, "", street);     sub(/[ \t]+$/, "", street)

        printf "INSERT INTO location_ukrpost (region_name_ua, old_administrative_district, new_administrative_district, community_name_ref, settlement_name_pref, settlement_name_clear, street_name) VALUES ('\''%s'\'', '\''%s'\'', '\''%s'\'', '\''%s'\'', '\''%s'\'', '\''%s'\'', '\''%s'\'');\n", 
        region, old_dist, new_dist, community, settlement_name_pref, settlement_name_clear, street 
    }
}' >> "$OUTPUT_FILE"

echo "Gotowe! Polecenia SQL zostały zapisane w $OUTPUT_FILE"
