<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { signin } from '../api'

const form = reactive({
  username: '',
  password: '',
})
const formRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  username: [
    { required: true, message: 'Please enter your username', trigger: 'blur' },
    { min: 5, max: 10, message: 'Your username length should be 5 to 10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
  ],

})

const router = useRouter()
const confirm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      signin({ name: form.username, password: form.password }).then((res) => {
        const { status, data, msg } = res

        if (status === 200 && data.code === 1) {
          router.push({ path: '/' })
          window.sessionStorage.setItem('username', form.username)
        } else {
          ElMessage.error(msg)
        }
      }).catch((e) => {
        ElMessage.error('Network error')
      })
    } else {
      console.log('invalid input')
    }
  })
}

</script>
<template>
  <el-row>
    <el-col :md="6" :push="9">
      <el-card class="mt-16">
        <template #header>
          <h3>Sign in</h3>
        </template>

        <el-form ref="formRef" label-width="120px" :model="form" :rules="rules">
          <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" placeholder="Password"></el-input>
          </el-form-item>
        </el-form>
        <div class="ml-4">
          <el-button type="primary" @click="confirm" class="mt-2">Confirm</el-button>
          <el-link type="primary" href="#/signin" :underline="true" class="ml-4 pt-2">sign up</el-link>
          <el-link type="primary" href="#/forget" :underline="true" class="ml-4 pt-2">forget password?</el-link>

        </div>
      </el-card>
    </el-col>
  </el-row>

</template>
<style lang="scss" scoped>

</style>