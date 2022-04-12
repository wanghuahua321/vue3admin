import http from "./http"
const portalBasicApi = "/api";

export const LoginInfo={
  Login: (params:object) => http.post(portalBasicApi + "/app/user/market-one-login", params),
  // Login: (params:object) => http.post("/connect/token", params),
  // getUser:()=>http.get(portalBasicApi + "identity/my-profile")
  getUserinfo: () => http.get(portalBasicApi + "/identity/my-profile"),
  getApplication: () => http.get(portalBasicApi + "/abp/application-configuration"),
}

export const Message={
  contacts: () => http.get(portalBasicApi + "/app/facebook-operation/contacts"), // 左侧联系人列表
  contactId:(params)=>http.post(portalBasicApi + "/app/facebook-operation/get-chat-messageby-contact-id",params),
  sentMessage:(params)=>http.post(portalBasicApi + "/app/facebook-operation/send-message",params)
}

export const uploads={
  fileUpload:(params)=>http.postImage(portalBasicApi + "/app/facebook-operation/file-upload",params)
  // https://192.168.0.120/api/app/facebook-operation/file-upload/
}


export const channels={
  getChannel:()=>http.get(portalBasicApi + "/app/channel"), // 获取联系人列表
  addChannel:(params)=>http.post(portalBasicApi + "/app/channel",params), //新增
  getChannelId:()=>http.get(portalBasicApi + "/app/channel"),

}
