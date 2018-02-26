/**
 * Created by shaolei on 2017/7/21.
 */
import axios from 'axios'
import qs from 'qs'

function toQueryString( params ){
  return qs.stringify(params)
}

async function _ajax( { config={}, url, method, params, query, data=null, payload="json", responseType="json", onUploadProgress } ) {

  //编辑restful parametars
  let restParameterString = ''

  if( params ) {
    if( !(typeof params == "object") ) {
      await Promise.reject( new Error("rest 参数不正确"))
    }
    //params sort
    let keys = Object.keys( params ).sort()
    let values = keys.map( key => {
      let value = params[key]
      if( value instanceof Array ) {
        value = value.join(';')
      }
      return value
    })

    var segments = []
    for( let i=0; i<keys.length; i++ ) {
      if( config.nameInPath ) {
        //使用 user/sl/age/30 带名形式路径
        segments.push(keys[i])
      }
      segments.push(values[i])
    }

    restParameterString = segments.join("/")
  }

  let respObj, resp;
  let body = null
  if( ['post','put'].indexOf(method)>=0 && data !== null ) {
    if( payload == "json" ) {
      body = JSON.stringify( data )
    }else if( payload == "form" ){
      body = toQueryString(data)
    }else if( payload == "multiform"){
      if( !data instanceof FormData ){
        await Promise.reject( new Error("payload类型与data不匹配"))
      }else{
        body = data
      }
    }else{
      await Promise.reject( new Error("payload类型不正确"))
    }
  }
  const options = {
    url: url + '/' + restParameterString,
    method,
    params: query,
    paramsSerializer: toQueryString,
    data: body,
    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType,// default: 'json'
    // timeout: 2500,
  }

  if( payload == 'multiform' ) {
    options.headers = {
      'Content-Type': 'multipart/form-data'
    }
    if( onUploadProgress ) {
      options.onUploadProgress = onUploadProgress
    }
  }

  try{
    resp = await axios.request(options);
    resp = resp.data
    if( responseType == "json" ) {
      if( typeof resp != "object" ) {
        await Promise.reject( new Error("响应结果格式不正确 "))
      }
    }
    return resp
  } catch(e) {
    if (e.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('server', e.response)
      await Promise.reject(new Error('响应内容错误：'+e.message))
    } else if (e.request) {
      // The request was made but no response was received
      // `Error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //一种可能是未能连接上服务器
      console.log('req', e);
      await Promise.reject( new Error('请求时发生错误:'+e.message))
    } else {
      // Something happened in setting up the request that triggered an e
      console.log('other', e.message)
      await Promise.reject( new Error('其他错误:'+e.message))
    }
  }

}


export default {
  init(){
    axios.defaults.baseURL = 'http://learn.zszzjs.cn';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.withCredentials = false;
  },

  get( options ) {
    if( typeof options == "string" ) {
      return _ajax( {config: options.config, url:options, method:'get', responseType:"text", } )
    } else {
      let {url,params,query,responseType} = options
      return _ajax( {config: options.config, url, method:'get', params, query, responseType })
    }
  },

  post({config, url,params,query,data,responseType}) {
    return _ajax( {config, url, method:'post', params, payload:'form',query, data, responseType} )
  },

  put({config, url,params,query,data,responseType}) {
    return _ajax( {config, url, method:'put', params, query, data, responseType} )
  },

  delete({config, url,params,query,data,responseType}) {
    return _ajax( {config, url, method:'delete', params, query, data, responseType} )
  },

  upload({config, url, params, query, data, onUploadProgress}) {
    return _ajax( {config, url, method:'post', data, payload:'multiform', onUploadProgress})
  }
}

