import {AxiosRequestConfig} from "./types";
import xhr from './xhr';

function axios(config:AxiosRequestConfig){
  xhr(config);
}
exprot default axios;
