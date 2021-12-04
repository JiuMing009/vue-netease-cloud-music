<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone">
            <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "Test",
    created() {},
    data() {
        return {
            ruleForm: {
                phone: "",
                password: "",
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: {},
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const _this = this;
                    this.getRequest(
                        "/login/cellphone?phone=" +
                            this.ruleForm.phone +
                            "&password=" +
                            this.ruleForm.password
                    ).then((resp) => {
                        console.log(resp);
                        _this.$message({
                            message: "登录成功",
                            center: true,
                            type: "success",
                        });
                        //存储用户token
                        const token = resp.obj.token;
                        window.sessionStorage.setItem("token", token);
                        _this.$router.replace("/home");
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>

<style scoped>
.demo-ruleForm {
    width: 400px;
    height: 200px;
    margin: 200px auto;
    border: 1px solid #000;
    text-align: center;
    padding: 20px;
    line-height: 200px;
}
</style>