import dotenv from 'dotenv';

dotenv.config()


// export default{
//     JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN,
//     JWT_SECRET : process.env.JWT_SECRET,
//     REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET

// }

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_SECRET = process.env.JWT_SECRET;
export const REFRESH_TOKEN_SECRET =process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRE_IN = process.env.REFRESH_TOKEN_EXPIRE_IN