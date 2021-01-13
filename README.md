# wxapp-mpForm
一个小程序的表单(数据)验证组件
# 表单验证组件 使用说明

# 1 快速上手
## 1）引入组件并在wxml中使用
```javascript
<mp-form id="form" rules="{{rules}}" models="{{formData}}" bind:msg="bindMsg">
  各类表单元素...       
</mp-form>
```
## 2）定义规则及需校验数据
```javascript
data:{
	formData:{
      companyName:'',
      age:'',
    },
    rules:[
      {
        name: 'companyName',
        rules: [{ required: true, message: '请输入企业名称' }],
      },
      {
        name: 'age',
        rules: [{ required: true, message: '请输入年龄' }],
      },
    ],
}
```
## 3）开始校验
```javascript
//校验整个表单
this.selectComponent("#form").validateForm().then(res=>{
      console.log(res)
})

//校验单个字段
this.selectComponent("#form").validateFormField('companyName').then(res=>{
      console.log(res)
})

//校验多个字段 （传1个也是校验单个字段）
this.selectComponent("#form").validateFormFields(['companyName','age']).then(res=>{
      console.log(res)
})
```
# 2 校验规则
## 1） 内置校验规则
```javascript
//message 不填则使用组件内部自定义的
rules: [
   { required: true, message: 'xxxxxxx' },//必填字段
   { minlength: 15 }, 										//长度最小15位
   { maxlength: 15 }, 										//长度最大15位
   { rangelength:[1,4] }, 								//长度在1到4位之间
   { min:4 }, 														//最小是4
   { max:4 }, 														//最大是4
   {range:[1,4]}, 											  //值在1到4之间
   {mobile:true},													//验证手机号
   {email:true},													//校验邮箱
   {url:true},														//校验url
   { equalTo:'age' }											//校验和另一个字段等值
   { bytelength:3 }												//最多输入3个字符 一个中文算两个字符
 ],
```
## 2） 自定义规则
```javascript
 {
        name: 'agree',
        rules: [{ required: true, validator: mustTrue, message: '请先同意相关条款' }],
 },
```
```javascript
export default {
    //参数（当前规则，当前校验字段的值，当前规则中的param字段(拓展用)，校验的对象）
    //校验tax
    taxNo:(rule, value, param, models)=>{
        let reg1 =  /^[A-Za-z0-9]{15}$/;
        let reg2 =  /^[A-Za-z0-9]{18}$/;
        let reg3 =  /^[A-Za-z0-9]{20}$/;
        if(reg1.test(value) || reg2.test(value) || reg3.test(value)){

        }else{
            return rule.message 
        }
    },
    //校验银行卡号
    bankAccount:(rule, value, param, models)=>{
        if(!value) return
        let reg=/^[0-9]{13,19}$/
        console.log(rule)
        console.log(reg.test(value)) 
        if(reg.test(value)){
             
        }else{
            return rule.message 
        }
    },
    mustTrue:(rule, value, param, models)=>{
        console.log(value)
        if(!value)
        return rule.message 
    }
}
```


