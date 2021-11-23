<template>
  <div id="home">
    <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="pTabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>

    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners"
                  @swiperImageLoad="swiperImageLoad"/>
      <HomeRecommendView :recommends="recommends"/>
      <FeatureView/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="pTabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShow"/>

  </div>

</template>

<script>
  import Navbar from "../../components/common/Navbar/Navbar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";

  import FeatureView from "./childComps/FeatureView";
  import TabControl from "../../components/content/TabControl/TabControl";
  import GoodsList from "../../components/content/Goods/GoodsList";
  import BackTop from "@/components/content/Backtop/BackTop";

  import {gethomemultidata} from "../../network/home";
  import {gethomegoods} from "../../network/home";
  import Scroll from "@/components/common/Scroll/Scroll";
  import {debounce} from "@/common/utils";


  export default {
    name: "Home",
    components: {
      Scroll,
      GoodsList,
      Navbar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabControl,
      BackTop
    },
    data() {
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType : 'pop',
        isShow:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        // itemImageListener:null
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },
    },
    destroyed() {
        console.log('Home destroyed');
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      // 保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
    },

    created() {
      // 1.请求多个数据
      this.gethomemultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh,500)

      // 监听item中图片加载完成
      // 对监听的事件进行保存
      // this.itemImageListener = () => {
      //
      // }
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })

      // console.log(this.$refs.tabControl.$el.offsetTop);
    },

    methods:{
      /*
      *事件监听的相关方法
      */
      pTabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        this.isShow = (-position.y) > 1000

        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        // console.log('加载更多')
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop);
        // console.log(this.$refs.tabControl.$el.offsetTop);

      },

      // 网络请求的方法
      gethomemultidata(){
        gethomemultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        gethomegoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

  /*.fixed{*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/

</style>
