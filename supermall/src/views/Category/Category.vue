<template>
  <div id="category">
    <Navbar class="nav">
      <div slot="center">商品分类</div>
    </Navbar>
    <div class="content">
      <TabMenu :children-categories="categories" @selectClick="selectClick"></TabMenu>
      <Scroll id="tab-content"
              ref="scroll">
        <div>
          <TabContentCategory :subcategories="showSubcategory"/>
          <TabControl :titles="['流行','新款','热门']" @tabClick="tabClick" ref="tabControl" />
          <CategoryDetail :category-data="showCategoryDetail"/>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/common/Navbar/Navbar';
  import Scroll from "@/components/common/Scroll/Scroll";
  import TabMenu from "@/views/Category/childComps/TabMenu";
  import TabContentCategory from "@/views/Category/childComps/TabContentCategory";
  import CategoryDetail from "@/views/Category/childComps/CategoryDetail";
  import TabControl from "@/components/content/TabControl/TabControl";

  import {getCategory,getSubCategory,getCategoryDetail} from "@/network/category";

  export default {
  name: "Category",
  components:{
    TabContentCategory,
    TabMenu,
    Navbar,
    Scroll,
    TabControl,
    CategoryDetail
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: 'pop',
      saveY:0,
      tabOffsetTop:0,
      isFixed:false
    }
  },
  created() {
    // 1.请求分类数据
    this._getCategory()
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    loadMore(){
      this.$refs.scroll.finishPullUp()
    },
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubCategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        // console.log(this.categoryData);
        this.categoryData = Object.assign({},this.categoryData)
        // console.log(this.categoryData);
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        // console.log(this.categoryData);
        this.categoryData = Object.assign({},this.categoryData)
        // console.log(this.categoryData);
      })
    },
    /**
     * 事件响应相关的方法
     */
    selectClick(index) {
      this._getSubcategories(index)
    },
    tabClick(index) {
      switch (index) {
        case 0 :
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    },
  },
  // activated(){
  //   this.$refs.scroll.scrollTo(0,this.saveY,0)
  //   this.$refs.scroll.refresh()
  // },
  // deactivated(){
  //   // 保存Y值
  //   this.saveY = this.$refs.scroll.getScrollY()
  // },
}

</script>

<style scoped>
#category {
  height: 100vh;
  /*height: 100px;*/
}

.nav {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  box-sizing: border-box;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  /*overflow: hidden;*/
}

#tab-content {
  height: 100%;
  flex: 1;
  overflow: hidden;
}
</style>
