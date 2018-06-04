/**
 * Created by Administrator on 2018/3/8.
 */
import Axios from 'axios'
import {Message, Loading} from 'element-ui'
import qs from 'qs'
let needLoginindex = 1
let loadingInstance
// Axios.defaults.baseURL = '/zq-admin/manager'
Axios.defaults.baseURL = '/api'
const httpServer = (opts, data) => {
    loadingInstance = Loading.service({ fullscreen: true })
    // let Public = { //公共参数  
    //   'srAppid': ""  
    // }
    let httpDefaultOpts = { //http默认配置 
          method:opts.method,
          // baseURL: 'http://192.168.0.184:8080/zq-admin/',  // 测试
          // baseURL: 'http://192.168.0.45:8080/zq-admin/',  // 春林电脑
          // baseURL: 'http://www.zhiqi17.com/admin/',  // 线上正式
          // baseURL: 'http://test.zhiqi17.com/admin/', // 线上测试
          url: opts.url,
          timeout: 100000,
          // params:Object.assign(Public, data),  
          // data:qs.stringify(Object.assign(Public, data)),  
          params:data,
          data:data,  
          headers: opts.method=='get'?{
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",  
            "Content-Type": "application/json; charset=UTF-8"  
          }:{  
            // 'X-Requested-With': 'XMLHttpRequest',  
            'Content-Type': 'application/json;charset=UTF-8' 
          }  
    } 
    if(opts.method=='get'){  
      delete httpDefaultOpts.data  
    }else{  
      delete httpDefaultOpts.params  
    }  
      
    let promise = new Promise(function(resolve, reject) {  
      Axios(httpDefaultOpts).then(
        (res) => {  
          if (res.data==2) {
            if (needLoginindex==1) {
              ++needLoginindex
              alert('您暂未登录')
              window.location.href="http://www.zhiqi17.com/admin/index.html#/login"
            }
          }else{
            resolve(res)  
          }
           loadingInstance.close()
        }  
      ).catch(  
        (response) => {  
          reject(response)  
           loadingInstance.close()
        }  
      )  
  
    })  
  return promise  
}  
  
export default httpServer 