import crypto from 'crypto';

export const md5 = (str: string): string => {
  return crypto.createHash('md5')
    .update(str)
    .digest('hex');
};
