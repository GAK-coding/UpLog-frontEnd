import CryptoJS from 'crypto-js';

/* Salt 비밀 키 */
const salt = import.meta.env.VITE_SALT;

/* 암호화 */
export const encrypt = (text: string) => {
  // 값이 없을 경우 빈 문자열 반환
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, salt).toString();
};

/* 복호화 */
export const decrypt = (text: string) => {
  // 값이 없을 경우 빈 문자열 반환
  if (!text) return '';

  try {
    const bytes = CryptoJS.AES.decrypt(text, salt); // 복호화 시도
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return ''; // 에러 발생 시 빈 문자열 반환
  }
};
