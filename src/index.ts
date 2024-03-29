import {AxiosRequestConfig} from "./types";
import { buildURL} from "./helpers/url";
import {transformRequest} from "./helpers/data";
import {processHeaders} from "./helpers/headers";
import xhr from './xhr';

function axios(config:AxiosRequestConfig){
  processConfig(config);
  config.headers = transformHeaders(config);
  xhr(config);
}

function processConfig(config:AxiosRequestConfig):void{
  config.url = transformURL(config);
  config.data = transRequestData(config);
}

function transformURL(config:AxiosRequestConfig):string{
  const { url,params } = config;
  return buildURL(url,params);
}

function transRequestData(config:AxiosRequestConfig):any{
  return transformRequest(config.data)
}

function transformHeaders(config:AxiosRequestConfig):any{
  const {headers = {} ,data} = config;
  return processHeaders(headers,data);
}

export default axios;
