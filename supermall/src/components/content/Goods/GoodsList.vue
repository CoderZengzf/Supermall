<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goods-item="item" :key="item.image"/>
  </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    /*均等分*/
    justify-content: space-around;
    background-color: var(--color-background);
    padding: 2px;
  }

</style>
