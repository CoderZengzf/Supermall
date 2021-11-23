import Toast from "@/components/common/Toast/Toast";

const obj = {}

obj.install = (Vue) => {
  // console.log(Vue);
  var toastcontroduest= Vue.extend(Toast)
  var toast = new toastcontroduest()
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj;
