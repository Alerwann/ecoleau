import { config } from 'dotenv';
config();


export const JWT_SECRET = "votre_cle_secrete";
export const JWT_EXPIRES_IN = "15m"; // expire en 15min
export const REFRESH_TOKEN_EXPIRES_IN = "7d"; // ex: 7 jours