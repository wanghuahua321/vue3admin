import CryptoJS from "crypto-js";
export function encrypt(word, keyStr) {
  keyStr = keyStr ? keyStr : "z2QkCU%&3lec8F2m";
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
// export function decrypt(word, keyStr) {
//   keyStr = keyStr ? keyStr : "z2QkCU%&3lec8F2m";
//   var key = CryptoJS.enc.Utf8.parse(keyStr);
//   var decrypt = CryptoJS.AES.decrypt(word, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// }
export function decrypt(word, keyStr) {
  //解密方法
  keyStr = keyStr ? keyStr : "z2QkCU%&3lec8F2m";
  let key = CryptoJS.enc.Utf8.parse(keyStr);

  try {
    let decrypted = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    
    if (decrypted == "" || !decrypted) {
      return word;
    }
    return decrypted
  } catch (error) {
    return word;
  }
}
