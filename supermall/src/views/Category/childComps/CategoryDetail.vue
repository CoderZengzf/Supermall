<template>
  <GridView>
    <GoodListItem v-for="(item,index) in categoryData" :key="index" :goods-item="item"></GoodListItem>
  </GridView>
</template>

<script>
import GoodListItem from "@/components/content/Goods/GoodListItem";
import GridView from "@/components/common/GridView/GridView";

export default {
  name: "CategoryDetail",
  components: {
    GoodListItem,
    GridView
  },
  props:{
    categoryData:{
      type:Array
    }
  },
  // methods:{
  //   imgLoad(){
  //     if(++this.counter === this.imagesLength){
  //         this.$emit('imageLoad')
  //     }
  //   }
  // }
}
</script>

<style scoped>

</style>
