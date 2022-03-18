/**
 *
 * @baseUrl http统一请求地址
 *
 */
 let baseUrl = "..";

 if (process.env.NODE_ENV == "development") {
   baseUrl = "https://dev.ebistrategy.com";
 }
 
 export { baseUrl };
 