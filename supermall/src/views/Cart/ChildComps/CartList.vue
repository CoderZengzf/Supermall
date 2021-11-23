<template>
  <div id="cart-list">
    <Scroll class="content">
      <CartListItem v-for="(item,index) in $store.state.cartList" :product="item" :key="index"></CartListItem>
    </Scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from "@/components/common/Scroll/Scroll";
  import CartListItem from "@/views/Cart/ChildComps/CartListItem";

  export default {
    name: "CartList",
    components:{
      CartListItem,
      Scroll
    },
    computed:{
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>
  #cart-list {
    height: calc(100vh - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
