<template>
    <el-row :gutter="20">
        <el-col :span="3" style="padding-left: 0px">
            <img src="../assets/images/logo.png" />
        </el-col>
        <el-col :span="2" style="float: left">
            <div class="search" style="float: left">
                <el-button icon="el-icon-arrow-left" type="danger" circle size="mini" @click="left"></el-button>
                <el-button icon="el-icon-arrow-right" type="danger" circle size="mini" @click="right"></el-button>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="my-input" style="margin-left: -80px">
                <el-input v-model="keywords" @keyup.enter.native="search">
                    <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
                </el-input>
            </div>
        </el-col>
        <el-col :span="12">
            <div style="height: 60px"></div>
        </el-col>
        <el-col :span="2">
            <div class="user" style="display: flex">
                <img src="../assets/images/avatar.jpg" alt="" class="userImg" />
                <span class="username">祈祈小野猫<i class="el-icon-caret-bottom"></i></span>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="myBtn">
                <i class="el-icon-set-up"></i>
                <i class="el-icon-setting"></i>
                <i class="el-icon-message"></i>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "Test",
    created() {},
    data() {
        return {
            keywords: "",
        };
    },
    props: {},
    methods: {
        search() {
            if (this.keywords != "") {
                this.$router.push({
                    path: "/search",
                    query: { keywords: this.keywords },
                });
                this.$emit("func", this.keywords);
            } else {
                this.$message({
                    message: "请输入内容",
                    center: true,
                    type: 'error'
                });
            }
        },
        left(){
            this.$router.back()
        }
    },
};
</script>

<style scoped>
.my-input /deep/.el-input__inner {
    border-radius: 20px;
    background: #f78989;
    height: 30px;
    width: 170px;
    border: none;
    color: #ffffff;
}
.my-input .el-input__icon {
    color: #ffffff;
}
.m {
    width: 500px;
}
.user {
    height: 60px;
    line-height: 60px;
}
.userImg {
    margin-top: 15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.myBtn i {
    margin-right: 20px;
    font-size: 20px;
    color: #ffdddb;
}
.myBtn i:hover {
    color: #ffffff;
}
.username {
    margin-left: 10px;
    font-size: 13px;
    color: #ffdddb;
}
.username:hover {
    color: #fff;
}
</style>
