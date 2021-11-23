<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  name:'Toast',
  props:{
    message:{
      type:String,
      default: ''
    },
    isShow:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    show(message = '默认',duration = 2000) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  padding: 8px 10px;
  background-color: rgba(0,0,0,.75);
}
</style>
