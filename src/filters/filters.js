const vfilters = {
    busy: items=>{
        switch(Number(items)){
            case 0:
                return '否'
            break;
            case 1:
                return '是'
            break;
        }
    },
    certifyType: (items)=>{
        switch(Number(items)){
            case 0:
                return '普通用户'
            break;
            case 1:
                return '平台运营账号'
            break;
            case 2:
                return '顾问'
            break;
            case 3:
                return '客服'
            break;
            case 4:
                return '业务员'
            break;
        }
    },
    status: function (items) {
        if(items==1){
            return '启用'
        }
        if(items==0){
            return '禁用'
        }
    },
    roletype: function (items) {
        if(items==1){
            return '客户创建'
        }
        if(items==0){
            return '系统创建'
        }
    },
  	filterType: function (items) {
        	if (items==1) {
        		return '图片';
        	}
        	if (items==2) {
        		return '图文';
        	}
        	if (items==3) {
        		return '文字';
        	}
        },
    filterstatus: function (items) {
    	if (items==0) {
    		return '关闭';
    	}
    	if (items==1) {
    		return '启用';
    	}
    },
    filteropenType: function (items) {
      if (items==1) {
        return '本标签';
      }
      if (items==2) {
        return '新标签';
      }
    },
    checked: function(items){
        if (items==0) {
        return false;
        }
        if (items==2) {
        return 'checked';
        }
    },
    serverType: function(items){
        if (items==0) {
            return '待审核';
        }
        if (items==1) {
            return '已接受';
        }
        if (items==2) {
            return '已拒绝';
        }
        if (items==3) {
            return '已取消';
        }
        if (items==4) {
            return '已支付';
        }
        if (items==5) {
            return '办理中';
        }
        if (items==6) {
            return '已完成';
        }
    },
    deliverType: function(items){
        if (items==1) {
            return '快递寄送';
        }
        if (items==2) {
            return '上门取件';
        }
    },
    province: function(items,province){
        var rte;
        province.forEach(function(res){
            if (res.ProID==items) {
                rte = res.ProName
            }
        })
        return rte
    },
    TowLndustry:function(items,OneLndustry){
        var rte;
        OneLndustry.forEach(function(res){
            if (res.id==items) {
                rte = res.title
            }
        })
        return rte
    },
    city: function(items,city){
        var rte;
        city.forEach(function(res){
            if (res.CityID==items) {
                rte = res.CityName
            }
        })
        return rte
    },
    county: function(items,county){
        var rte;
        county.forEach(function(res){
            if (res.Id==items) {
                rte = res.countyName
            }
        })
        return rte
    },
    closed: function(items){
        if (items==0) {
            return '正常';
        }
        if (items==1) {
            return '封停';
        }
    },
    gender: function(items) {
        if (items==1) {
            return '男';
        }
        if (items==2) {
            return '女';
        }
    },
    parseFloat: function(items){
         var f = parseFloat(items);
            if (isNaN(f)) {
                return false;
            }
            var f = Math.round(items*100)/100;
            var s = f.toString();
            var rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + 2) {
                s += '0';
            }
            return s;
    },
    froms: function(items){
        if (items==0) {
            return '自主注册';
        }else{
            return '推广注册';
        }
    },
    payStatus: function(items){
        if (items==0) {
            return '未支付';
        }else if (items==1){
            return '已支付';
        }else if (items==2){
            return '已取消';
        }else if (items==3){
            return '申请退款';
        }else if (items==4){
            return '退款中';
        }else if (items==5){
            return '退款拒绝';
        }else if (items==6){
            return '退款成功';
        }
    },
    payType: function(items){
        if (items==0) {
            return '未支付';
        }else if (items==1){
            return '在线支付（支付宝）';
        }else if (items==2){
            return '在线支付（微信）';
        }else if (items==3){
            return '对公转账';
        }else if (items==4){
            return '后付款';
        }else if (items==5){
            return '线下支付';
        }
    },
    curriculumType: function(items){
        if (items==0) {
            return '线下';
        }else if (items==1){
            return '线上';
        }
    },
    publish: function(items){
        if (items==0) {
            return '未发布';
        }else if (items==1){
            return '未开课';
        }else if (items==2){
            return '开课中';
        }else if (items==3){
            return '已结束';
        }
    },
    trainStatus: function(items){
        if (items==0) {
            return '待支付';
        }else if (items==1){
            return '已支付';
        }else if (items==2){
            return '已取消';
        }else if (items==3){
            return '已退款';
        }
    },
}

export default vfilters