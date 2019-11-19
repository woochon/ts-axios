import {AxiosRequestConfig} from "./types";
import { buildURL} from "./helpers/url";
import {transformRequest} from "./helpers/data";
import xhr from './xhr';

function axios(config:AxiosRequestConfig){
  processConfig(config);
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

export default axios;
