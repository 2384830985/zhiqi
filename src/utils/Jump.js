export default{ 
	Jump: (url,params,ret)=>{ // 获取页面跳转url    url:url  params:当前url上的数据 res:循环的值
		// console.log(url)
		let u = url.split(':')[0].split('"')[1]  // 获取基础url
		var repeat1 = (variable,params) => {
        	let index = 1
        	for(let req  in ret){
        		if (req == variable) {
        			index++
        			u += ret[req]+'/'
        		}
        	}
        	if (index==1) {
        		u += params[variable]+'/'
        	}
        }
		for(let variable  in params){   //variable 为属性名
			repeat1(variable,params)
        }
      	let basic = u.substr(0, u.length - 1);
      	return basic
	} 
}