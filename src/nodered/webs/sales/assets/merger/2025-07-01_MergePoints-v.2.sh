#!/bin/bash
CFROM="#0000FF";

COLORS=('0000ff' '00ff00' 'ff0000');
COLORS=('0000ff' '00ff00' 'ff0000' '3b82f6' '22c55e' 'eab308' '06b6d4' 'ec4899' '6366f1' '14b8a6' 'f97316' 'a855f7' 'ff3d32' '85b2f9' '76db9b' 'f2d066' '65d2e4' 'f38ec0' '9ea0f6' '6dd3c8' 'fba86f' 'c996fa' 'ff8780');

DIR_IN="in/pins"
RESIZE="28x"
RESIZE_P="28x"
DIR_OUT="../../../../../../../out/pin"
DIR_OUT2="../../../../../../../out/pin2"

PIESKA='p_BB.png';   PIESKA_36='p_BB.x36.png';
PIESKA_B='p_B.png';
PIESKA_O='p.png'; PIESKA_O_36='p.x36.png';

POINTS_COLORS=('00ff00' 'ff0000' '0000ff' 'ffff00');
POINTS=('pt-0000ff.png');
POINTS=('pt-0000ff.png' 'pt-00ff00.png' 'pt-ff0000.png' 'pt-ffff00.png');

IMAGES=('i_Home_B.png' 'i_Arrow_UP_B.png' 'i_Arrow_DN_B.png' 'i_Car_B.png' 'i_Gear_B.png' 'i_S_B.png' 'i_Air_B.png' 'i_Bank_B.png' 'i_Bags_B.png' 'i_Park_B.png');
#IMAGES=('i_Home_B.png' 'i_Arrow_UP_B.png' 'i_Arrow_DN_B.png');

#magick p_BB.png i_HomeB.png -composite output1.png
#mogrify -path /fullpath2/tmp2 -format png -fill "#BFBFBF" -opaque "#C0C0C0" *.png
#merge
#magick output1.png -fill ${color} +opaque ${CFROM}
#magick output1.png -fill "#ec4899" +opaque "#0000FF"

echo "Prepare points";
#for point in "${POINTS[@]}"; do
for point in "pt_0000ff.png"; do
    f_POINT=$(basename ${point} .png);    
    for color in "${POINTS_COLORS[@]}"; do
        fc_POINT="${DIR_OUT}/pt-${color}.png"
        fc_POINT_32="${DIR_OUT}/pt-${color}.32.png"
        echo "  Prepare point ${fc_POINT}";
        magick ${DIR_IN}/points/${point} -fill "#${color}" -opaque "${CFROM}" ${fc_POINT}
        magick ${fc_POINT} -resize "${RESIZE_P}" ${fc_POINT_32}
    done    
done

#exit 0

echo "Prepare pins";
cp ${DIR_IN}/${PIESKA} ${DIR_OUT}/${PIESKA_B}

for image in "${IMAGES[@]}"; do
    f_PIESKA=$(basename ${PIESKA} .png);
    f_image=$(basename ${image} .png);
    N_Image="${DIR_OUT}/${f_PIESKA}.${f_image}.pt-000000.png";
    N_Image="${DIR_OUT}/p_${f_image}.pt-000000.png";

    echo "Prepare ${N_Image}";    
    #Add icon
    magick ${DIR_IN}/${PIESKA} ${DIR_IN}/${image} -composite ${N_Image}

    for color in "${COLORS[@]}"; do
        f_color=$(echo ${color} | sed 's:#::g');
        O_Image="${DIR_OUT}/${f_PIESKA}.${f_image}-${f_color}.pt-000000.png";
        S_Image="${DIR_OUT}/${f_PIESKA}.${f_image}-${f_color}.pt-000000.x32.png";
        O_Image="${DIR_OUT}/p_${f_image}-${f_color}.pt-000000.png";
        S_Image="${DIR_OUT}/p_${f_image}-${f_color}.pt-000000.x32.png";
        echo "  Full color To ${O_Image}";
        magick ${N_Image} -fill "#${color}" -opaque "${CFROM}" ${O_Image}
        #resize
        magick ${O_Image} -resize "${RESIZE}" ${S_Image}
        #Add point
        for point in "${POINTS[@]}"; do
            f_POINT=$(basename ${point} .png);
            f_POINT_32=${f_POINT}"_x32.png";
            P_Image="${DIR_OUT}/${f_PIESKA}.${f_image}-${f_color}.${f_POINT}.png";
            P_Image_32="${DIR_OUT}/${f_PIESKA}.${f_image}.${f_color}.${f_POINT}.x32.png";
            P_Image="${DIR_OUT}/p_${f_image}-${f_color}.${f_POINT}.png";
            P_Image_32="${DIR_OUT}/p_${f_image}-${f_color}.${f_POINT}.x32.png";
            echo "          Add point ${point} To ${P_Image}";
            magick ${DIR_OUT}/${point} ${O_Image} -composite ${P_Image}
            #resize
            #echo "              resize ${RESIZE} to ${P_Image_32}";
            magick ${P_Image} -resize "${RESIZE}" ${P_Image_32};
        done
    done


done

exit 0