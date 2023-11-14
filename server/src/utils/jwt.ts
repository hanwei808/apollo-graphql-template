import jwt, { Secret, SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';
import { promisify } from 'util';

/**
 * 对给定的负载进行签名，并返回一个 Promise，该 Promise 解析为签名字符串。
 * @param payload 要签名的负载，可以是字符串、缓冲区或对象。
 * @param secretOrPrivateKey 用于签名的密钥或私钥。
 * @param options 选项对象，包含签名选项。
 * @returns 一个 Promise，该 Promise 解析为签名字符串。
 */
export const sign: (
  payload: string | Buffer | object, 
  secretOrPrivateKey: Secret, 
  options?: SignOptions
) => Promise<string> = promisify(jwt.sign);

/**
 * 验证JWT令牌
 * @param token - JWT令牌
 * @param secretOrPublicKey - 用于验证签名的密钥或公钥
 * @param options - 验证选项
 * @returns 解码后的JWT负载或错误消息
 */
export const verify: (
  token: string, 
  secretOrPublicKey: Secret, 
  options?: VerifyOptions
) => Promise<string | JwtPayload> = promisify(jwt.verify);

/**
 * 解码 JWT token
 * @param token - JWT token
 * @param options - 可选的解码选项
 * @returns 解码后的 token 数据
 */
export const decode: (
  token: string, 
  options?: jwt.DecodeOptions
) => Promise<null | { [key: string]: any } | string> = promisify(jwt.decode);
