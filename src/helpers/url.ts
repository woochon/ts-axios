import {isDate,isPlainObject} from "./utils";


function encode(val:string):string {
  return encodeURIComponent(val)
    .replace(/%40/g,'@')
    .replace(/%3A/ig,':')
    .replace(/%24/g,'$')
    .replace(/%2C/ig,',')
    .replace(/%20/g,'+')
    .replace(/%5B/ig,'[')
    .replace(/%5D/ig,']')
}

export function buildURL(url:string,params?:any):string{
  if(!params){
    retrun
    url;
  }
  const parts:string[] = [];
  Object.keys(params).forEach((key)=>{
    const val = params[key];
    if(val === null || typeof val === 'undefined'){
      return ; //这里的return只会结束当前的一个循环，不会跳出forEach
    }
    let values = [];
    if(Array.isArray(val)){
      values = val;
      key += '[]';
    }else{
      values = [val]
    }
    values.forEach((val)=>{
      if(isDate(val)){
        val.toString();
      }else if(isPlainObject(val)){
        val = JSON.stringify(val);
      }
      parts.push(`${encode(key)}=${encode(val)}`);
    })
  });
  let serializeParams = parts.join('&');
  if(serializeParams){
    const marIndex = url.indexOf('#');
    if(marIndex !== -1){
      url = url.slice(0,marIndex)
    }
    url += (url.indexOf('?')===-1?'?':'&') + serializeParams;
  }
  return url;
}
