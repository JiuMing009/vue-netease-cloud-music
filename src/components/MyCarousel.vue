<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in imgList" :key="item">
      <img :src="item" alt="" height="200px" class="my-img" width="545px"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
    data(){
        return{
            imgList:[
                require("../assets/images/img (1).jpg"),
                require("../assets/images/img (2).jpg"),
                require("../assets/images/img (3).jpg"),
                require("../assets/images/img (4).jpg"),
                require("../assets/images/img (5).jpg"),
                require("../assets/images/img (6).jpg"),
            ]
        }
    }
}
</script>

<style>
.my-img{
    border-radius: 8px;
}  
</style>