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
  // fileUpload:(ids,params)=>http.postfile(portalBasicApi + "/app/facebook-operation/file-upload-forward/"+ids+"",params)
  fileUpload:(ids,params)=>http.postfile("https://next.json-generator.com/api/json/get/4ytyBoLK8",params)
}


export const channels={
  getChannel:()=>http.get(portalBasicApi + "/app/channel"), // 获取联系人列表
  addChannel:(params)=>http.post(portalBasicApi + "/app/channel",params), //新增
  updataChannel:(id,params)=>http.put(portalBasicApi + "/app/channel/"+id+"",params), // 修改
  delChannel:(id)=>http.delete(portalBasicApi + "/app/channel/"+id+"/channel",id), // 删除
  // app/channel/2c7d361d-eac5-46e3-948a-548eee9e1508/channel
  getChannelId:(id)=>http.get(portalBasicApi + "/app/channel/"+id+""), // 根据id 查找
  
}


export const certification={
  
  roles:{
    getRoles:()=>http.get(portalBasicApi + "/identity/roles"), // 获取角色列表
    editRoles:(id,params)=>http.put(portalBasicApi + "/identity/roles/"+id+"",params), // 获取角色列表  
  },

  user:{
    getUsers:()=>http.get(portalBasicApi + "/identity/users"), // 获取用户列表
    deleteUser:(id)=>http.delete(portalBasicApi + `/identity/users/${id}`), // 删除

  },
  tenant:{
    getTenant:()=>http.get(portalBasicApi + "/multi-tenancy/tenants"), // 获取用户列表
    delTenant:(id)=>http.delete(portalBasicApi + "/app/tenant/"+id+"/rpa"), // 删除
  },
  Permissions:{
    // 获取get 列表
    getPermissions:(query)=>http.get(portalBasicApi + `/permission-management/permissions?providerKey=${query.providerKey}&providerName=${query.providerName}`),  
    updataPermissions:(query,payload)=>http.put(portalBasicApi + `/permission-management/permissions?providerKey=${query.providerKey}&providerName=${query.providerName}`,payload), // 修改
  }



}