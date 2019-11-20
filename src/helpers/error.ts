import { AxiosRequestConfig,AxiosReponse} from "../types";

export class AxiosError extends Error{
  isAxiosError:boolean;
  config:AxiosRequestConfig;
  code?:string|null;
  request?:any;
  response?:AxiosReponse;
  constructor(
    message:string,
    config:AxiosRequestConfig,
    code?:string|null,
    request?:any,
    response?:AxiosReponse
  ){
    super(message);
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;
    Object.setPrototypeOf(this,AxiosError.prototype);  //typescript继承Error时，需要调用这个
  }
}

export function createError(
  message:string,
  config:AxiosRequestConfig,
  code?:string|null,
  request?:any,
  response?:AxiosReponse
){
  const error = new AxiosError(message, config, code, request, response);
  return error;
}
