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


export const generateCustomerId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};