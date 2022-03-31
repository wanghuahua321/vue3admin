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
}
