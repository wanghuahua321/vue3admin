//将文件转换为base64
export function getBase64 (img, callback) {
  const reader = new FileReader();
  console.log("reader", reader);
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

//将base64转换为文件
export function dataURLtoFile (dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
