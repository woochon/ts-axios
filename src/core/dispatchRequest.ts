import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from "../types";
import { buildURL} from "../helpers/url";
import {transformRequest} from "../helpers/data";
import {flattenHeaders, processHeaders} from "../helpers/headers";
import xhr from './xhr';
import transform from "./transform";
import {combineURL, isAbsoluteURL} from "../helpers/utils";

export default function dispatchRequest(config:AxiosRequestConfig):AxiosPromise {
  throwIfCancellationRequested(config);
  processConfig(config);
  config.headers = transformHeaders(config);
  return xhr(config).then((res)=>{
    return transformResponseData(res);
  });
}

function processConfig(config:AxiosRequestConfig):void{
  config.url = transformURL(config);
  config.data = transform(config.data,config.headers,config.transformRequest);
  config.headers = flattenHeaders(config.headers,config.method!)
}

export function transformURL(config:AxiosRequestConfig):string{
  let { url,params,paramsSerializer,baseURL } = config;
  if(baseURL&& isAbsoluteURL(url!)){
    url = combineURL(baseURL,url!);
  }
  return buildURL(url!,params,paramsSerializer);
}

function transRequestData(config:AxiosRequestConfig):any{
  return transformRequest(config.data)
}

function transformHeaders(config:AxiosRequestConfig):any{
  const {headers = {} ,data} = config;
  return processHeaders(headers,data);
}

function transformResponseData(data:AxiosResponse):AxiosResponse{
  data.data = transform(data.data,data.headers,data.config.transformResponse);
  return data;
}

function throwIfCancellationRequested(config:AxiosRequestConfig):void{
  if(config.cancelToken){
    config.cancelToken.throwIfRequested();
  }
}
