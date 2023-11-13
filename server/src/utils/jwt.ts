import jwt, { Secret, SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';
import { promisify } from 'util';

export const sign: (
  payload: string | Buffer | object, 
  secretOrPrivateKey: Secret, 
  options?: SignOptions
) => Promise<string> = promisify(jwt.sign);

export const verify: (
  token: string, 
  secretOrPublicKey: Secret, 
  options?: VerifyOptions
) => Promise<string | JwtPayload> = promisify(jwt.verify);

export const decode: (
  token: string, 
  options?: jwt.DecodeOptions
) => Promise<null | { [key: string]: any } | string> = promisify(jwt.decode);
