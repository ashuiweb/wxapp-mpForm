// subPackages/lqs/components/lqs/mpForm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    models: {
        type: Object,
        value: {}, 
    },
    rules: {
        type: Array,
        value: [],
    },
    extClass: {
        type: String,
        value: ''
    }
},
  /**
   * 组件的初始数据
   */
  data: {

  },
  attached(){
    this.comp = this.selectComponent("#__form")
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //验证多个字段
    validateFormFields(_fields) {
      let fields = [].concat(_fields)
      let ps = fields.map(item => {
        return this.validateFormField(item)
      })
      return Promise.all(ps)

    },
    //验证单个字段
    validateFormField(field) {
      return new Promise((resolve, reject) => {
        this.comp.validateField(field, (valid, error) => {
          console.log('valid', valid, error)
          if (!valid) {
            this.setData({
              error: error.message
            })
            this.triggerEvent('msg',this.data.error)
            reject(error)
          } else {
            resolve({ [field]: valid })
          }
        })

      })
    },
    //验证整个表单
    validateForm() {
      return new Promise((resolve, reject) => {
        this.comp.validate((valid, errors) => {
          console.log('valid', valid, errors)
          if (!valid) {
            const errorKeys = Object.keys(errors)
            if (errorKeys.length) {
              this.setData({
                error: errors[errorKeys[0]].message
              })
              this.triggerEvent('msg',this.data.error)
              this.triggerEvent('msgs',errors)
            }
            reject(errors)
          } else {
            resolve(true)
          }
        })

      })

    },
  }
})
