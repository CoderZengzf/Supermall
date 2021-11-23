<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default: 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    // data中保存Scroll
    data(){
      return{
        Scroll:null,
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.Scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      this.Scroll.on('scroll',(position) => {
        // console.log(position)
        this.$emit('scroll',position)
      })

      // 3.监听滚动到底部
      if(this.pullUpLoad){
        this.Scroll.on('pullingUp',() => {
          // console.log('到底部了')
          this.$emit('pullingUp');
        })
      }
    },
    methods:{
      scrollTo(x,y,time = 700){
        this.Scroll && this.Scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.Scroll && this.Scroll.finishPullUp()
      },
      refresh(){
        // console.log('----------');
        this.Scroll && this.Scroll.refresh()
      },
      getScrollY(){
        return this.Scroll ? this.Scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
