#!/bin/bash

# Skrypt instalujący libstdc++5:i386 na Kubuntu 25.10
# Wymaga uprawnień sudo

echo "--- Rozpoczynam instalację libstdc++5:i386 ---"

# 1. Aktywacja architektury 32-bitowej (jeśli nie jest włączona)
sudo dpkg --add-architecture i386
sudo apt update

# 2. Pobieranie biblioteki z archiwum Ubuntu (wersja Bionic)
# Jest to ostatnia stabilna wersja tej biblioteki
URL="http://archive.ubuntu.com/ubuntu/pool/universe/g/gcc-3.3/libstdc++5_3.3.6-30ubuntu2_i386.deb"
PACKAGE="/tmp/libstdc++5_i386.deb"

echo "Pobieranie pakietu..."
wget -O "$PACKAGE" "$URL"

# 3. Instalacja pakietu wraz z zależnościami (np. libc6:i386)
echo "Instalacja..."
sudo apt install -y "$PACKAGE"

# 4. Sprzątanie
rm "$PACKAGE"

echo "--- Instalacja zakończona ---"
# Weryfikacja
ls -l /usr/lib/i386-linux-gnu/libstdc++.so.5*

