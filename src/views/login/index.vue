<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">元理云IOT</div>
      <el-form :model="form" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="form.email" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="form.password" @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock" />
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { loginApi } from "@/api/login"
import { type ILoginData } from "@/api/login/types/login"
import { setToken, setEmail, setRole } from "@/utils/cache/cookies"

export default {
  name: "LoginIndex",
  setup() {
    const router = useRouter()
    const form: ILoginData = reactive({
      email: "1875091912@qq.com",
      password: "tianxin"
    })

    const rules = {
      email: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
      ]
    }
    const submitForm = () => {
      loginApi(form).then((re: any) => {
        if (re.code === 200) {
          ElMessage.success("登录成功")
          //   localStorage.setItem("ms_email", form.email)
          //   localStorage.setItem("ms_token", re.data.token)
          //   localStorage.setItem("ms_role", re.data.user_info.role)
          setToken(re.data.token)
          setEmail(form.email)
          setRole(re.data.user_info.role)
          router.push("/project")
        } else {
          ElMessage.error("登录失败")
          return false
        }
      })
    }

    return {
      form,
      rules,
      submitForm
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  /*background-image: url(../../assets/img/login-bg.jpg);*/
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
