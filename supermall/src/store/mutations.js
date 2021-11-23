import {
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutation-types";

export default {
  // mutations 唯一的目的就是修改state中的状态
  // mutations 中的每个方法尽可能完成的事件比较单一一点
  // payload:新添加的商品
  // *数组常用的方法有哪些?  push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
  [ADD_COUNTER](state,payload){
  payload.count++
},
  [ADD_TO_CART](state,payload){
    payload.isChecked = true
    state.cartList.push(payload)
}
}
