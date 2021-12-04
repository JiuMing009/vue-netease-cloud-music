<template>
    <el-container>
        <el-header>
           <main-header @func="getSearchVal"/>
        </el-header>
        <el-container style="position: relative;">
            <el-aside width="200px">
                <main-aside />
            </el-aside>

            <el-main>
                <router-view :searchVal="searchVal" @getMusic="getMusic"/>
            </el-main>
        </el-container>
        <el-footer>
            <my-footer :muId="musicId"/>
        </el-footer>
    </el-container>
</template>

<script>
import MainHeader from "../components/MainHeader.vue"
import MainAside from "../components/MainAside.vue"
import MyFooter from "../components/MyFooter.vue"
export default {
    name: "Test",
    components:{
        MainHeader,
        MainAside,
        MyFooter,
    },
    created() {},
    data() {
        return {
            searchVal:'',
            musicId:'',
            
        };
    },
    props: {},
    methods: {
        getSearchVal(data){
            this.searchVal = data
            console.log('>>>>>>>>>>>>>>>>>>'+this.searchVal);
        },

        getMusic(val){
            this.musicId = val
        }
    },
};
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}

.el-header{
    line-height: 60px;
    background: #EC4141;
    color: #fff;
}
.el-aside{
    height: calc(100vh - 135px);
    border-right: 1px solid #ccc;
    
}
.el-footer{
    height: 75px !important;
    border-top: 1px solid #ccc;
}
.el-main{
    margin: 0;
    padding: 0;
    height: calc(100vh - 135px);
}
</style>
