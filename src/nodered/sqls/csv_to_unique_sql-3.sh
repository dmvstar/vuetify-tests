#!/bin/bash

INPUT_FILE="houses-utf-8-20.csv"
OUTPUT_FILE="insert_data.sql"

if [ ! -f "$INPUT_FILE" ]; then
    echo "Błąd: Plik $INPUT_FILE nie istnieje!"
    exit 1
fi

echo "-- Generated SQL Inserts" > $OUTPUT_FILE

cat "$INPUT_FILE" | awk -F ';' '
NR > 1 {
    # 1. Usuwanie ewentualnych znaków powrotu karetki (\r)
    gsub(/\r/, "", $0)

    # Klucz unikalności: Region (1) + Nowy Powiat (3) + Miejscowość (5)
    unique_key = $1 "|" $3 "|" $5
    
    if (!(unique_key in seen)) {
        seen[unique_key] = 1
        
        # Przypisanie kolumn do zmiennych
        region = $1
        old_dist = $2
        new_dist = $3
        community = $4
        settlement_name_pref = $5
        settlement_name_clear = $5
        street = $7

        # 2. Globalna zamiana: Pojedynczy apostrof na dwa apostrofy 
        #gsub(/'\''/, "''", region)
        #gsub(/'\''/, "''", old_dist)
        #gsub(/'\''/, "''", new_dist)
        #gsub(/'\''/, "''", community)
        #gsub(/'\''/, "''", settlement_name_pref)
        #gsub(/'\''/, "''", settlement_name_clear)
        #gsub(/'\''/, "''", street)

        # 4. REPLACING Apostrophe: Zamiana \x27 na \x27\x27 (SQL escape)
        gsub(/\x27/, "\x27\x27", region)
        gsub(/\x27/, "\x27\x27", old_dist)
        gsub(/\x27/, "\x27\x27", new_dist)
        gsub(/\x27/, "\x27\x27", community)
        gsub(/\x27/, "\x27\x27", settlement_name_pref)
        gsub(/\x27/, "\x27\x27", settlement_name_clear)
        gsub(/\x27/, "\x27\x27", street)


        # 3. Usuwanie prefiksów z settlement_name_clear
        # Usuwa wszystko przed i łącznie z pierwszą kropką LUB pierwszą spacją
        sub(/^[^ .]*[ .]+/, "", settlement_name_clear)

        # 4. Trimowanie spacji (początek i koniec) dla wszystkich pól
        vars[1]="region"; vars[2]="old_dist"; vars[3]="new_dist"; 
        vars[4]="community"; vars[5]="settlement_name_pref"; 
        vars[6]="settlement_name_clear"; vars[7]="street"
        
        # Wykonanie trimowania
        sub(/^[ \t]+/, "", region);                sub(/[ \t]+$/, "", region)
        sub(/^[ \t]+/, "", old_dist);              sub(/[ \t]+$/, "", old_dist)
        sub(/^[ \t]+/, "", new_dist);              sub(/[ \t]+$/, "", new_dist)
        sub(/^[ \t]+/, "", community);             sub(/[ \t]+$/, "", community)
        sub(/^[ \t]+/, "", settlement_name_pref);  sub(/[ \t]+$/, "", settlement_name_pref)
        sub(/^[ \t]+/, "", settlement_name_clear); sub(/[ \t]+$/, "", settlement_name_clear)
        sub(/^[ \t]+/, "", street);                sub(/[ \t]+$/, "", street)

        printf "INSERT INTO location_ukrpost (region_name_ua, old_administrative_district, new_administrative_district, community_name_ref, settlement_name_pref, settlement_name_clear, street_name) VALUES ('\''%s'\'', '\''%s'\'', '\''%s'\'', '\''%s'\'', '\''%s'\'', '\''%s'\'', '\''%s'\'');\n", 
        region, old_dist, new_dist, community, settlement_name_pref, settlement_name_clear, street 
    }
}' >> "$OUTPUT_FILE"

echo "Gotowe! Polecenia SQL zostały zapisane w $OUTPUT_FILE"