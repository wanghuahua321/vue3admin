/**
 *
 * @baseUrl http统一请求地址
 *
 */
 let baseUrl = "..";
 let imgbaseUrl=""

 if (process.env.NODE_ENV == "development") {
 /*   baseUrl = "https://192.168.0.120"; */
   baseUrl = "/i"; 
   imgbaseUrl="https://192.168.0.120:8080"
 }
//  else{
//   // baseUrl = "http://192.168.0.120"
//  }
 
 export { baseUrl,imgbaseUrl };
 