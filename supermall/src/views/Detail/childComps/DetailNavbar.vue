<template>
  <div class="detail-nav">
    <Navbar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(title,index) in titles"
             :key="index"
             class="title-item"
             :class="{active: currentIndex === index}"
             @click="titleClick(index)">
          {{title}}
        </div>
      </div>
    </Navbar>
  </div>
</template>

<script>
  import Navbar from "@/components/common/Navbar/Navbar";

  export default {
    name: "DetailNavbar",
    components: {
      Navbar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick', index);
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .back img{
    margin-top: 12px;
  }

  .title{
    display: flex;
    font-size: 13px;
  }

  .title-item{
    flex: 1;
  }

  .active{
    color: var(--color-high-text);
  }

</style>
