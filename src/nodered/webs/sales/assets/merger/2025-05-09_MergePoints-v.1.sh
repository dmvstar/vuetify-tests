#!/bin/bash
CFROM="#0000FF";

COLORS=('#3b82f6' '#22c55e' '#eab308' '#06b6d4' '#ec4899' '#6366f1' '#14b8a6' '#f97316' '#a855f7' '#ff3d32' '#85b2f9' '#76db9b' '#f2d066' '#65d2e4' '#f38ec0' '#9ea0f6' '#6dd3c8' '#fba86f' '#c996fa' '#ff8780');
IMAGES=('arrow_DN.png' 'arrow_UP.png' 'i_HomeB.png' 'p_BB.png');
PIESKA='p_BB.png';
IMAGES=('arrow_DN.png' 'arrow_UP.png' 'i_HomeB.png');

#magick p_BB.png i_HomeB.png -composite output1.png
#mogrify -path /fullpath2/tmp2 -format png -fill "#BFBFBF" -opaque "#C0C0C0" *.png
#merge 
#magick output1.png -fill ${color} +opaque ${CFROM}
#magick output1.png -fill "#ec4899" +opaque "#0000FF"
for color in "${COLORS[@]}"; do
    for image in "${IMAGES[@]}"; do
        f_image=$(basename ${image} .png);
        f_PIESKA=$(basename ${PIESKA} .png);
        O_Image="${f_PIESKA}_${f_image}_${color}.png";
        echo "Convert To ${O_Image}";
    done    
done
