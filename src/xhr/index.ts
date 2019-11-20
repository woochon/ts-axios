import { AxiosRequestConfig,AxiosPromise,AxiosReponse} from "../types";
import { parseHeaders} from "../helpers/headers";

export default function xhr(config:AxiosRequestConfig):AxiosPromise{
  return new Promise((resolve => {
    const {data = null,url,method ='get',headers,responseType} = config;
    const request = new XMLHttpRequest();
    if(responseType){
      request.responseType = responseType;
    }
    request.open(method.toLocaleUpperCase(),url,true);
    request.onreadystatechange = function handleLoad(){
      if(request.readyState!==4){
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType !== 'text'? request.response:request.responseType;
      const response: AxiosReponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      resolve(response);

    };
    Object.keys(headers).forEach((name)=>{
      if(data === null && name.toUpperCase() ==='Content-Type'){
        delete headers[name];
      }else{
        request.setRequestHeader(name,headers[name]);
      }
    });
    request.send(data);
  }));

}
