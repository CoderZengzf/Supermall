<template>
  <div id="detail">
    <detail-navbar class="detail-nav"
                   ref="nav"
                   @titleClick="titleClick"/>
    <Scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <DetailSwiper :top-images="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop-info="shopInfo"/>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <DetailParamsInfo :param-info="paramInfo" ref="params"/>
      <DetailcommentInfo :comment-info="commentInfo" ref="comment"/>
      <GoodsList :goods="recommends" ref="recommends"/>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShow"/>
    <DetailBottomBar @addCart="addCart" />
  </div>
</template>

<script>
  import DetailNavbar from "@/views/Detail/childComps/DetailNavbar";
  import DetailSwiper from "@/views/Detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/Detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/Detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/Detail/childComps/DetailGoodsInfo";
  import DetailParamsInfo from "@/views/Detail/childComps/DetailParamsInfo";
  import DetailcommentInfo from "@/views/Detail/childComps/DetailcommentInfo";
  import DetailBottomBar from "@/views/Detail/childComps/DetailBottomBar";


  import Scroll from '@/components/common/Scroll/Scroll';
  import GoodsList from "@/components/content/Goods/GoodsList";

  import {getDetail,Goods,GoodsParams,getRecommend} from "@/network/detail";
  import {debounce} from "@/common/utils";
  import {backTopMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    components:{
      DetailGoodsInfo,
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamsInfo,
      DetailcommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
    },
    mixins:[backTopMixin],
    data(){
      return{
        iid:null,
        res:null,
        topImages:[],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        titleTopY:[],
        getThemeTopY:null,
        currentIndex:0
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      //  2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result
        // 取出轮播图数据
        this.topImages = data.itemInfo.topImages

        //  2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        // 3.获取商家信息
        const {shopLogo:logo , name ,cFans:fans,cSells:sells,score, cGoods:goods} = data.shopInfo
        this.shopInfo = {
          logo, name, fans, sells, score, goods
        }

        // this.shopInfo = new ShopInfos(data.shopInfo)

        // 4.保存商品的详细数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)

        // 6.获取评论信息
       if(data.rate.cRate !== 0){
         this.commentInfo = data.rate.list[0]
       }
      })

    //  3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
      // 4.给getThememTopY赋值(对给this.titleTopY赋值的操作进行防抖)
      this.getThemeTopY = debounce(()=>{
        this.$nextTick(() => {
          //获取不同组件的offsetTop
          this.titleTopY = [];
          this.titleTopY.push(0);
          this.titleTopY.push(this.$refs.params.$el.offsetTop );
          this.titleTopY.push(this.$refs.comment.$el.offsetTop );
          this.titleTopY.push(this.$refs.recommends.$el.offsetTop );
          this.titleTopY.push(Number.MAX_VALUE);
          // console.log(this.titleTopY);
        });
      },100)
    },
    methods:{
      showToast(){
        this.$toast.show('添加成功')
      },
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      // 点击导航栏跳转页面
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.titleTopY[index], 100)
      },
      contentScroll(position) {
        // 1.获取Y值
        const positionY = -position.y
        // 2.positionY和主题中的值进行对比
        // [0,7938,9120,9452,Number.MAX_VALUE]
        // positionY在0~7938之间,index = 0
        // positionY在7938~9120之间,index = 1
        // positionY在9120~9452之间,index = 2
        // positionY超过9452值时,index=3
        let length = this.titleTopY.length
        for(let i = 0; i < length - 1; i++){
          if(this.currentIndex !== i && (positionY >= this.titleTopY[i] && positionY < this.titleTopY[i + 1]))
          // if(this.currentIndex !== i && ((i < length -1 && positionY >= this.titleTopY[i] && positionY < this.titleTopY[i+1])||
          //   (i === length - 1 && positionY >= this.titleTopY[i])))
          {
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.listenShowBackTop(position)
      },
      // backClick(){
      //   this.$refs.scroll.scrollTo(0,0)
      // },
      addCart(){
        const product = {}
        product.img = this.topImages[0],
        product.title = this.goods.title,
        product.desc = this.goods.desc,
        product.price = this.goods.realPrice,
        product.iid = this.iid
        product.count = 1
        // console.log('添加到购物车');

        // 2.将商品添加到购物车中
        // this.$store.cartList.push(product)
        // this.$store.commit('addCart',product)
        const res =  this.$store.dispatch('addCart',product)
        console.log(res.then(res=>{
          this.$toast.show(res)
        }))

      }
    },
    mounted() {
      let refresh = debounce(this.$refs.scroll.refresh, 100)
      this.$bus.$on('detailItemLoad',() => {
        refresh()
      })
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    position: absolute;
    top: 44px;
    bottom: 60px;
    left: 0;
    right: 0;
    overflow: hidden;
    /*height: calc(100% - 44px);*/
  }
</style>
