API_KEY="62080b6b-6c7f-4a97-98fe-cf357536c1e3"
OFILE="$0".json
DFILE=`basename $0 .sh`.json

curl -w "@curl-format.json" -X POST -H "Content-Type: application/json" \
-s -d "@$DFILE" \
"https://graphhopper.com/api/1/route?key=$API_KEY" | jq "."


