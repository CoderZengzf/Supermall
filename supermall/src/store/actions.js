import {
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutation-types";

export default {
  async addCart({commit,state},payload){

       // 1.查找之前数组中是否有该商品
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if(oldProduct){
        commit(ADD_COUNTER,oldProduct)
        return ('当前的商品数量+1')
      }else {
        payload.count = 1
        commit(ADD_TO_CART,payload)
        return ('添加该商品')
      }
  }
}
