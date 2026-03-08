#!/bin/bash

#https://askubuntu.com/questions/306930/is-there-a-way-to-display-a-notification-every-time-you-change-the-keyboard-layo

#DISPLAY=1:

LAYOUT_ID="";
OLD_LAYOUT_ID="";

while true 
do

LAYOUT_ID="$(xset -q | grep -A 0 'LED' | cut -c59-67)";

if [ "${LAYOUT_ID}" != "${OLD_LAYOUT_ID}" ] 
    then

OLD_LAYOUT_ID=${LAYOUT_ID};

if [ "${LAYOUT_ID}" = '00000002' ] 
  then
  LAYOUT="PL (Polski)"
  #notify-send "Current Keyboard Layout: ${LAYOUT}"
  #echo "${LAYOUT}" | osd_cat -f "-urw-urw palladio l-medium-i-normal--0-1280-0-0-p-0-*" &

fi

if [ "${LAYOUT_ID}" = '00001002' ]
  then
  LAYOUT="RUA (RusUkr)"
  #notify-send "Current Keyboard Layout: ${LAYOUT}"
  #echo "${LAYOUT}" | osd_cat -f "-urw-urw palladio l-medium-i-normal--0-1280-0-0-p-0-*" &

fi


notify-send "Current Keyboard Layout: ${LAYOUT}"
#echo "${LAYOUT}" | osd_cat -d 2 -O 5  -A center -p middle  -o 20 -i 20 -s 10 -f "-urw-urw palladio l-medium-i-normal--0-1280-0-0-p-0-*" &
echo "${LAYOUT}" | osd_cat -d 2  -A center -p middle  -f "-urw-urw palladio l-medium-i-normal--0-1280-0-0-p-0-*" &

fi

sleep 1;

done