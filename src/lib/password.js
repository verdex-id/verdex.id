import bcrypt from 'bcrypt';

export async function comparePassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }

export  async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }


  




// export function helloWorld (nama){
// console.log (`helloWorld by  ${nama}`)
// return  `Hello World from ${nama}`
// }  