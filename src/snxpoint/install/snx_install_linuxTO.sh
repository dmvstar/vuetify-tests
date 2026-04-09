#!/bin/bash

# Ustawienia
ARCHIVE_OFFSET=80
TMP_DIR=/tmp
DRY_RUN=false
DATA_FILE=""

# Funkcja wyświetlająca pomoc
Usage() {
    echo "Użycie: $0 [OPCJE] <plik_danych_snx>"
    echo ""
    echo "Argumenty:"
    echo "  <plik_danych_snx>    Plik instalatora SNX (np. snx_install.sh), z którego mają być wypakowane dane."
    echo ""
    echo "Opcje:"
    echo "  --dry-run            Tryb testowy: wyświetla komendy bez ich wykonywania."
    echo "  -h, --help           Wyświetla tę pomoc."
    echo ""
    exit 1
}

# Jeśli nie podano żadnych argumentów, wyświetl usage
if [ $# -eq 0 ]; then
    Usage
fi

# Funkcja logowania i wyjścia
LogEvent() {
    echo "$3"
    if [ "$1" = 1 ]; then
        exit "$2"
    fi
}

# Parsowanie argumentów
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --dry-run) DRY_RUN=true ;;
        -h|--help) Usage ;;
        *) DATA_FILE="$1" ;;
    esac
    shift
done

# Sprawdzenie czy plik danych istnieje
if [ -z "$DATA_FILE" ] || [ ! -f "$DATA_FILE" ]; then
    LogEvent 1 1 "Błąd: Nie podano poprawnego pliku danych. Sprawdź ścieżkę."
fi

ExtractSNX() {
    echo "--- Rozpakowywanie archiwum z $2 ---"
    # Wyciąganie binariów od offsetu ARCHIVE_OFFSET
    tail -n +$1 "$2" | bunzip2 -c - | (cd ${TMP_DIR}; tar xf -) > /dev/null 2>&1
    if [ ! $? -eq 0 ]; then
        LogEvent 1 1 "Błąd: Nie udało się wypakować archiwum. Sprawdź, czy plik jest poprawny."
    fi
}

Cleanup() {
    echo "--- Sprzątanie plików tymczasowych ---"
    rm -f ${TMP_DIR}/snx ${TMP_DIR}/snx_uninstall.sh
    exit 0
}

trap Cleanup SIGINT SIGTERM

# Lista komend do wykonania (Poprawiona linia install)
COMMANDS=(
    "install -o root -g root -m 4711 ${TMP_DIR}/snx /usr/bin/snx"
    "install -o root -g root -m 0755 ${TMP_DIR}/snx_uninstall.sh /usr/bin/snx_uninstall"
    "install -d -o root -g root -m 0755 /etc/snx"
    "install -d -o root -g root -m 0755 /etc/snx/tmp"
)

# 1. Wypakowanie danych do /tmp
ExtractSNX "${ARCHIVE_OFFSET}" "$DATA_FILE"

# 2. Instalacja
if [ "$DRY_RUN" = true ]; then
    echo "🧪 [TRYB TESTOWY] Następujące komendy zostałyby wykonane:"
    for cmd in "${COMMANDS[@]}"; do
        echo "   sudo $cmd"
    done
else
    # Sprawdzanie uprawnień (potrzebne do install -o root)
    EXEC_PREFIX=""
    if [ "$EUID" -ne 0 ]; then
        echo "Skrypt wymaga uprawnień roota do instalacji w /usr/bin."
        EXEC_PREFIX="sudo"
    fi

    echo "⚙️ Instalacja plików systemowych..."
    SUCCESS=true
    for cmd in "${COMMANDS[@]}"; do
        if ! $EXEC_PREFIX $cmd; then
            SUCCESS=false
            break
        fi
    done

    if [ "$SUCCESS" = true ]; then
        echo "✅ Instalacja zakończona sukcesem."
        # Weryfikacja i wersja
        mkdir -p ${TMP_DIR}/SNXNM
        /usr/bin/snx usage 2>&1 | grep -o -m 1 -E "[0-9]+" > ${TMP_DIR}/SNXNM/ver.ini || true
    else
        echo "❌ Instalacja nie powiodła się (sprawdź błędy powyżej)."
    fi
fi

Cleanup
