import { AxiosRequestConfig,AxiosPromise,AxiosResponse} from "../types";
import { parseHeaders} from "../helpers/headers";
import {createError} from "../helpers/error";
import {isURLSameOrigin} from "../helpers/url";
import {isFormData} from "../helpers/utils";
import cookie from "../helpers/cookies";

export default function xhr(config:AxiosRequestConfig):AxiosPromise{
  return new Promise((resolve ,reject)=> {
    const {
      data = null,
      url,
      method ='get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfHeaderName,
      xsrfCookieName,
      auth,
      onDownloadProgress,
      onUploadProgress,
      validateStatus
    } = config;
    const request = new XMLHttpRequest();

    request.open(method.toLocaleUpperCase(),url!,true);

    configureRequest();
    addEvents();
    processHeaders();
    processCancel();


    request.send(data);

    function configureRequest():void{
      if(responseType){
        request.responseType = responseType;
      }

      if(timeout){
        request.timeout = timeout;
      }

      if(withCredentials){
        request.withCredentials = withCredentials
      }
    }

    function addEvents():void{
      request.onreadystatechange = function handleLoad(){
        if(request.readyState!==4){
          return
        }
        if(request.status === 0){
          // 网络错误或着超时错误
          return
        }
        const responseHeaders = parseHeaders(request.getAllResponseHeaders());
        const responseData = responseType !== 'text'? request.response:request.responseType;
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        handleResponse(response);

      };
      request.onerror = function handleError() {
        reject(createError('Network Error',config,null,request));
      };
      request.ontimeout = function handleTimeout (){
        reject(createError(`Timeout of ${timeout} ms exceeded`,config,'ECONNABORTED',request));
      };

      if(onDownloadProgress){
        request.onprogress = onDownloadProgress;
      }
      if(onUploadProgress){
        request.upload.onprogress = onUploadProgress;
      }
    }

    function processHeaders():void{
      if((withCredentials || isURLSameOrigin(url!))&&xsrfCookieName){
        const xsrfValue = cookie.read(xsrfCookieName);
        if(xsrfValue&&xsrfHeaderName){
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if(isFormData(data)){
        delete headers['Content-Type'];
      }

      if(auth){
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ":" +auth.password)
      }

      Object.keys(headers).forEach((name)=>{
        if(data === null && name.toUpperCase() ==='Content-Type'){
          delete headers[name];
        }else{
          request.setRequestHeader(name,headers[name]);
        }
      });

    }

    function processCancel():void{
      if(cancelToken){
        cancelToken.promise.then(reason=>{
          request.abort();
          reject(reason);
        })
      }
    }

    function handleResponse(response:AxiosResponse):void{
      if(!validateStatus||validateStatus(response.status)){
        resolve(response)
      }else{
        reject(createError(`Request failed with status code ${response.status}`,config,null,request,response));
      }
    }
  });
}
