import { baseUrl } from "./baseurl";
import axios from "axios";
import qs from 'qs'
import store from "@/store";
import { message } from 'ant-design-vue'

const httpTimeout = 1000000;
// const https=axios.create({
//   baseURL:baseUrl,
//   timeout:100000
// })

/* 请求拦截器 */
axios.interceptors.request.use((config:any)=>{
  /* 这里的config 包含每次请求的内容 */
  config.headers.token = store.getters.token;
  if (config.url.indexOf("?") < 0)
  config.url = config.url + "?r=" + Math.random();
  else config.url = config.url + "&r=" + Math.random(); //IE对API有缓存，要加随机参数
  return config;
},(error)=>{
  return Promise.reject(error);
})

/* 响应拦截器 */
axios.interceptors.response.use((response)=>{

  
  return response;
},(error)=>{
  if (error.response) {
    switch (error.response.status) {
      case 401:
        store.commit("Logout");
    }
  }
  return Promise.reject(error.response);
})

/* 
 使用es6的export default  导出了一个函数，
 导出的函数代替axios 去帮助我们请求数据
*/
function checkStatus(response:any) {
  /**如果状态码正常 */
  const { config } = response;
  if (config &&
    (config.url.includes("AzureAdUsers") || config.url.includes("CheckLicenseState"))
  ) {
    //AzureAdUsers的返回数据结构只是一个布尔值，故也要跳过isSuccess的校验
    // CheckLicenseState 返回false也要进行数据请求，所以要在这儿直接返回数据不进行isSuccess的校验
    return response.data;
  } else if (
    response &&
    response.status === 200
  ) {
    /**如果当前操作是成功的，判断isSuccess
     * 为true时则直接返回response
     */
    return response.data;
  } else {
    // let alertMessage = ""; let msgType = "info";
    if (response && (response.data.message || response.data.messages)) {
      message.warning(response.data.message || response.data.messages[0]);
    } else {
      // console.log(response);

    }
  }
  return false;
}

function checkCode(res:any) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)
  console.error(res, "HTTP请求的错误信息");

  return false;
}

export default {
  post(url:string, params?:any) {
    // if (
    //   url.indexOf("InitQMC") > 0 ||
    //   url.indexOf("AuthorizationSoftware") > 0
    // ) {
    //   httpTimeout = 360000;
    // } else {
    //   httpTimeout = 100000;
    // }

    return axios({
      method: "post",
      url: baseUrl + url,
      data: params,
      timeout: httpTimeout,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => {
        return checkStatus(response);
      })
      .catch((res) => {
        return checkCode(res);
      });
  },

  postfile(url:string, params?:any) {
    return axios({
      method: "post",
      url: baseUrl + url,
      data: params,
      timeout: httpTimeout,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        return checkStatus(response);
      })
      .catch((res) => {
        return checkCode(res);
      });
  },
  get(url:string, params?:any) {
    // if (
    //   url.indexOf("InitQMC") > 0 ||
    //   url.indexOf("AuthorizationSoftware") > 0 || url.indexOf("Teams/AzureAdUsers") > 0
    // ) {
    //   httpTimeout = 360000;
    // } else {
    //   httpTimeout = 100000;
    // }
const headersString:any = {
  "X-Requested-With": "XMLHttpRequest",
}
// if(url.includes('facebook-operation/contacts')) {
//   headersString = {...headersString, "accept": "*/*", RequestVerificationToken: "CfDJ8Dx0E8ZfzwBPsKhurp3byFR61YJJ4x2EUgA0JZG8wVROhQ-6b5ORZLGD38GJvLzewVJSPXmRbTL1tbWa7rEUzAnmPPsgI4a_nbFVxGqRxejJWER2BC1aItXcPQuLZd3xHw7ye-IVRpu6yqCEZaRD_rY"}
// }
// curl -X GET "https://192.168.0.113:5800/api/app/facebook-operation/contacts" -H  "accept: */*" -H  
    return axios({
      method: "get",
      url: baseUrl + url,
      params, // get 请求时带的参数
      timeout: httpTimeout,
      headers: headersString,
    })
      .then((response) => {
        return checkStatus(response);
      })
      .catch((res) => {
        return checkCode(res);
      });
  },
  // responseType: 'blob'
  /**二进制流的文件下载 */
  getBlobFile(url:string, params?:any) {
    return axios({
      method: "get",
      url: baseUrl + url,
      params, // get 请求时带的参数
      timeout: httpTimeout,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      responseType: "blob",
    })
      .then((response) => {
        const disposition = response.headers["content-disposition"];

        const fileName = disposition
          ? window.decodeURI(
            disposition
              .split(";")[2]
              .split("=")[1]
              .split("''")[1]
          )
          : null;

        if (fileName) {
          const blob = new Blob([response.data]);
          // download(blob, fileName);
        } else {
          return {
            fileName,
            isDownloadFailed: true,
          };
        }
      })
      .catch((res) => {
        return checkCode(res);
      });
  },

  postImage(url:string, params?:any){
    return axios({
      method:"post",
      url: baseUrl + url,
      data: params, // get 请求时带的参数
      timeout: httpTimeout,
      // headers: {
      //   "token": "",
      // },
    }).then((response)=>{
      return checkStatus(response);
    }) .catch((res) => {
      return checkCode(res);
    });
  }
};

