<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 10px;
    bottom: 50px;
    /*z-index: 9;*/
  }

  .back-top img{
    width: 43px;
  }
</style>
