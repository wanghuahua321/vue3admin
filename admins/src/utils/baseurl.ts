/**
 *
 * @baseUrl http统一请求地址
 *
 */
 let baseUrl = "..";

 if (process.env.NODE_ENV == "development") {
 /*   baseUrl = "https://192.168.0.120"; */
   baseUrl = "/i"; 
 }else{
  baseUrl = "http://192.168.0.120"
 }
 
 export { baseUrl };
 