<template>
    <el-container>
        <el-header>
            <el-menu default-active="/home" class="el-menu-demo" mode="horizontal">
                <el-menu-item :index="item.path" v-for="item in headerMenu" :key="item.name">
                    <i class=""></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <div class="content">
                <div style="height: 235px">
                    <my-carousel />
                </div>
                <h3>推荐歌单 ></h3>
                <br />
                <div>
                    <image-list />
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import MyCarousel from "../components/MyCarousel.vue";
import ImageList from "../components/ImageList.vue";
export default {
    name: "Test",
    components: {
        MyCarousel,
        ImageList,
    },
    created() {},
    data() {
        return {
            headerMenu: [
                {
                    path: "/home",
                    name: "个性推荐",
                },
                {
                    path: "/boke1",
                    name: "专属定制",
                },
                {
                    path: "/video1",
                    name: "歌单",
                },
                {
                    path: "/friend1",
                    name: "排行榜",
                },
                {
                    path: "/zhibo1",
                    name: "歌手",
                },
                {
                    path: "/srfm1",
                    name: "最新音乐",
                },
            ],
        };
    },
    props: {},
    methods: {},
};
</script>

<style  scoped>
* {
    margin: 0;
    padding: 0;
}
.el-menu-item {
    font-size: 16px;
    padding: 0;
}
.el-menu-demo /deep/ .el-menu-item{
     margin-right: 20px;
}
.el-menu-item.is-active {
    color: black;
    font-size: 18px;
    font-weight: bold;
}
 .el-menu-demo /deep/.el-menu-item.is-active{
    border-bottom: 2px solid #EC4141;
}
.el-main {
    overflow-y: scroll;
    height: 734px;
    margin: 0;
    padding: 0;
}
.el-main .content {
    margin: 10px auto;
    width: 1100px;
    height: 2000px;
}

::-webkit-scrollbar-track {
    background: transparent;
}
</style>
