<template>
  <GridView :cols="3" :line-space="15" :v-margin="20" v-if="subcategories.list">
    <div class="item" v-for="(item,index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </GridView>
</template>

<script>
import GridView from "@/components/common/GridView/GridView";
export default {
  name: "TabContentCategory",
  components: {
    GridView
  },
  data(){
    return{
      isLoad:false
    }
  },
  props:{
    subcategories:{
      type:Object,
      default(){
        return{}
      }
    }
  },
  // methods:{
  //   imageLoad(){
  //     if(!this.isLoad) {this.$emit('imageLoad');}
  //     this.isLoad = true
  //   }
  // }
}
</script>

<style scoped>
  .panel img {
    width: 100%;
  }
  .item{
    text-align: center;
    font-size: 12px;
  }
  .item img {
    width: 80%;
  }
  .item text {
    margin-top: 15px;
  }
</style>
