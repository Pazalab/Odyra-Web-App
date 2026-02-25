import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(RelativeTime);
dayjs.extend(LocalizedFormat);

export const generateRideID = () => {
       const prefix = "ODYRA";

       const numbers = Math.floor(10 + Math.random()*90);

       const characters =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
       let letters = "";
       for(let i = 0; i < 3; i++){
            letters += characters.charAt(Math.floor(Math.random() * characters.length));
       }

       return `${prefix}${numbers}${letters}`
}

export const ConvertDateIntoTimeFromNow = (val) => {
       return dayjs(val).fromNow()
}
export const ConvertDateToReadable = (val) => {
       return dayjs(val).format("lll")
}