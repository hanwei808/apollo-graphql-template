import crypto from 'crypto';

/**
 * 计算字符串的 MD5 值
 * @param str 要计算的字符串
 * @returns 字符串的 MD5 值
 */
export const md5 = (str: string): string => {
  return crypto.createHash('md5')
    .update(str)
    .digest('hex');
};
