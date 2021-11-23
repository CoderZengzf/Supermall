<template>
  <Scroll id="tab-menu">
    <div class="menu">
      <div v-for="(item,index) in childrenCategories"
           class="menu-item"
           :key="index"
           :class="{active:index === currentIndex}"
           @click="selectClick(index)">{{item.title}}
      </div>
    </div>
  </Scroll>
</template>

<script>
  import Scroll from "@/components/common/Scroll/Scroll";

  export default {
    name: "TabMenu",
    components: {
      Scroll
    },
    props:{
      childrenCategories:{
        type:Array,
        default(){
          return[]
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      selectClick(index){
        this.currentIndex = index
        this.$emit('selectClick',index)
      },
    }
  }
</script>

<style scoped>
#tab-menu{
  height: 100%;
  width: 100px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: hidden;
}

.menu-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 17px;

}
.active{
  background-color: #ffff;
  color: #ff8198;
  font-weight: bold;
}

</style>
