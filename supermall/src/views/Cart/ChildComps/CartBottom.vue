<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去结算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/CheckButton/CheckButton";
import {mapGetters} from 'vuex'

export default {
  name: "CartBottom",
  components:{
    CheckButton
  },
  methods:{
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品')
      }
    },
    checkClick() {
      if(this.isSelectAll){
        return this.$store.state.cartList.forEach(item => item.isChecked = false)
      }else {
        return this.$store.state.cartList.forEach(item => item.isChecked = true)
      }
    }
  },
  computed:{
    ...mapGetters(['cartLength']),
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item => item.isChecked
      ).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.isChecked).length
    },
    isSelectAll(){
      if(this.$store.state.cartList.length === 0){
        return false
      }else {
        return !(this.$store.state.cartList.filter(item => !item.isChecked).length)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  display: flex;
  position: relative;
  line-height: 40px;
  font-size: 14px;
}

.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button{
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}

.price{
  margin-left: 20px;
  flex: 1;
}

.calculate{
  width: 90px;
  background-color: orange;
  color: #fff;
  text-align: center;
}
</style>
