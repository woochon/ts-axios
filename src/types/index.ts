export type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'post' | 'POST'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'put' | 'PUT'
| 'patch' | 'PATCH'
export interface  AxiosRequestConfig {
  url:string
  method?:Method
  data?:any
  params?:any
  headers?:any
}

export interface AxiosReponse {
  data:any
  status:number
  statusText:string
  headers:any
  config:AxiosRequestConfig
  request:any
}
