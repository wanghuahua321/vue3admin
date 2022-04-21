/* 常用接口 */

export interface userInfo{  
  extraProperties?: object,
  userName: string,
  email: string,
  name: string,
  surname?: string,
  phoneNumber?: string,
  isExternal?: boolean,
  hasPassword?: boolean
}
// 分页配置对象
export interface storeState{
  token?:string,
  userInfo?:object,
  chatPerson?:object,
  editClick?:object,
  dialogMsg?:object
}
export interface ValidateObj{
  required?:boolean;
  type?:string;
  customs?:storeState[];
  min?:number;
  max?:number;
}
