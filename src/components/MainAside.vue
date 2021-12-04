<template>
    <el-menu default-active="/home" class="el-menu-vertical-demo" router="router">
        <el-menu-item :index="item.path" v-for="item in menuData" :key="item.name">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    components: {},
    name: "Test",
    created() {},
    data() {
        return {
            menuData: [
                {
                    path: "/home",
                    name: "发现音乐",
                    icon: "",
                },
                {
                    path: "/boke",
                    name: "播客",
                    icon: "",
                },
                {
                    path: "/video",
                    name: "视频",
                    icon: "",
                },
                {
                    path: "/friend",
                    name: "朋友",
                    icon: "",
                },
                {
                    path: "/zhibo",
                    name: "直播",
                    icon: "",
                },
                {
                    path: "/srfm",
                    name: "私人FM",
                    icon: "",
                },
            ],
        };
    },
    props: {},
    methods: {},
};
</script>

<style scoped>

.el-menu-item{
    margin: 3px 10px;
    height: 36px;
    line-height: 36px;
    border-radius: 10px;

}
.el-menu-vertical-demo {
    margin-top: 9px;
    border: none;
}
.el-menu-item:focus, .el-menu-item:hover{
    background-color: #f6f6f6;
}
.el-menu-item.is-active{
    color: black;
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    background-color: #f6f6f6;
    
}
</style>
