import http from "./http"
const portalBasicApi = "/portalbasicapi";

export const LoginInfo={
  Login: (params:object) => http.post(portalBasicApi + "/Access/Login", params),
}