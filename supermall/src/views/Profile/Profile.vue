<template>
  <div id="profile">
    <Navbar class="nav-bar">
      <div slot="center">商城</div>
    </Navbar>
    <user-info></user-info>
    <div class="ppp">
      <detail-info>
        <div slot="name">0.00  <span style="color:#666666;font-weight: normal;font-size: 15px">元</span></div>
        <div slot="value">我的余额</div>
      </detail-info>
      <detail-info>
        <div slot="name">0 <span style="color:#666666;font-weight: normal;font-size: 15px">个</span> </div>
        <div slot="value">我的优惠</div>
      </detail-info>
      <detail-info>
        <div slot="name">0 <span style="color:#666666;font-weight: normal;font-size: 15px">分</span></div>
        <div slot="value">我的积分</div>
      </detail-info>
    </div>
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
  import Navbar from "@/components/common/Navbar/Navbar";
  import UserInfo from "@/views/Profile/ChildComps/UserInfo";
  import ListView from "@/views/Profile/ChildComps/ListView";
  import detailInfo from "@/views/Profile/ChildComps/detailInfo";

  export default {
    name: "Profile",
    components:{
      Navbar,
      UserInfo,
      ListView,
      detailInfo
    },
    data: function () {
      return {
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped>
.nav-bar {
  background-color: #ff8198;
  color: white;
}
.ppp{
  display: flex;
}

</style>
