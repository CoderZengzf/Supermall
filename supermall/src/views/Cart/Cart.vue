<template>
 <div id="cart">
   <Navbar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></Navbar>
   <CartList/>
   <CartBottom/>
 </div>
</template>

<script>
  import Navbar from "@/components/common/Navbar/Navbar";
  import CartList from "@/views/Cart/ChildComps/CartList";
  import CartBottom from "@/views/Cart/ChildComps/CartBottom";

  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      Navbar,
      CartList,
      CartBottom

    },
    computed:{
      ...mapGetters(['cartLength','cartList']),
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 500;
  }
</style>
