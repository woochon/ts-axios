import {AxiosRequestConfig, AxiosPromise, AxiosReponse} from "../types";
import { buildURL} from "../helpers/url";
import {transformRequest,transfromResponse} from "../helpers/data";
import {processHeaders} from "../helpers/headers";
import xhr from './xhr';

export default function dispatchRequest(config:AxiosRequestConfig):AxiosPromise {
  processConfig(config);
  config.headers = transformHeaders(config);
  return xhr(config).then((res)=>{
    return transformResponseData(res);
  });
}

function processConfig(config:AxiosRequestConfig):void{
  config.url = transformURL(config);
  config.data = transRequestData(config);
}

function transformURL(config:AxiosRequestConfig):string{
  const { url,params } = config;
  return buildURL(url!,params);
}

function transRequestData(config:AxiosRequestConfig):any{
  return transformRequest(config.data)
}

function transformHeaders(config:AxiosRequestConfig):any{
  const {headers = {} ,data} = config;
  return processHeaders(headers,data);
}

function transformResponseData(data:AxiosReponse):AxiosReponse{
  data.data = transfromResponse(data.data);
  return data;
}
