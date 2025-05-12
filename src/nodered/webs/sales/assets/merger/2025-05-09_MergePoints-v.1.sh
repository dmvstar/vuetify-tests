#!/bin/bash
CFROM="#0000FF";

COLORS=('#3b82f6' '#22c55e' '#eab308' '#06b6d4' '#ec4899' '#6366f1' '#14b8a6' '#f97316' '#a855f7' '#ff3d32' '#85b2f9' '#76db9b' '#f2d066' '#65d2e4' '#f38ec0' '#9ea0f6' '#6dd3c8' '#fba86f' '#c996fa' '#ff8780');


IMAGES=('arrow_DN.png' 'arrow_UP.png' 'i_HomeB.png' 'p_BB.png');
PIESKA='p_BB.png';
IMAGES0=('arrow_DN.png' 'arrow_UP.png' 'i_HomeB.png');
IMAGES=('i_Home_B.png' 'i_Arrow_UP_B.png' 'i_Arrow_DN_B.png' 'i_Car_B.png' 'i_Gear_B.png' 'i_S_B.png' 'i_Air_B.png' 'i_Bank_B.png' 'i_Bags_B.png' 'i_Park_B.png');

#magick p_BB.png i_HomeB.png -composite output1.png
#mogrify -path /fullpath2/tmp2 -format png -fill "#BFBFBF" -opaque "#C0C0C0" *.png
#merge 
#magick output1.png -fill ${color} +opaque ${CFROM}
#magick output1.png -fill "#ec4899" +opaque "#0000FF"

for image in "${IMAGES[@]}"; do        
    f_PIESKA=$(basename ${PIESKA} .png);
    f_image=$(basename ${image} .png);    
    N_Image="out/${f_PIESKA}_${f_image}.png";
    echo "Prepare ${N_Image}";
    magick in/${PIESKA} in/${image} -composite out/${f_PIESKA}_${f_image}.png
    for color in "${COLORS[@]}"; do
        f_color=$(echo ${color} | sed 's:#::g');
        O_Image="out/${f_PIESKA}_${f_image}_${f_color}.png";
        S_Image="out/${f_PIESKA}_${f_image}_${f_color}_36.png";
        echo "  Full color To ${O_Image}";
        magick ${N_Image} -fill "${color}" -opaque "${CFROM}" ${O_Image}
        magick ${O_Image} -resize 36x ${S_Image}
    done    
done
