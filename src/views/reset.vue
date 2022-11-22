<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { reset } from '../api'

const route = useRoute()

const form = reactive({
  email: route.query.email as string,
  password: '',
  password_again: ''
})
const formRef = ref<FormInstance>()
const checkPassword = (rule: any, value: any, callback: any) => {
  if (value == '') {
    callback(new Error('Please type your password again'))
  } else if (value !== form.password) {
    callback(new Error('Please type the same password'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Wrong email format', trigger: ['blur', 'change'] },
  ],

  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password length not less than 6', trigger: 'blur' }
  ],
  password_again: [
    { required: true, message: 'Please enter your password again', trigger: 'blur' },
    {
      validator: checkPassword,
      trigger: 'blur'
    }]
})

const router = useRouter()


const confirm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      reset({ password: form.password, email: form.email, token: route.query.token as string }).then((res) => {
        const { status, data, msg } = res
        if (status === 200 && data.code === 1) {
          ElMessage.success(data.msg)
          router.push('/signin')
        } else {
          ElMessage.error(data.msg)
        }
      }).catch(() => {
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
          <h3>Reset Password</h3>
        </template>

        <el-form ref="formRef" label-width="120px" :model="form" :rules="rules">
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Email" readonly disabled></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="form.password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item label="Confirm" prop="password_again">
            <el-input type="password" v-model="form.password_again" placeholder="Password Again"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="confirm" class="ml-8 mt-2">Confirm</el-button>
      </el-card>
    </el-col>
  </el-row>

</template>
<style lang="scss" scoped>

</style>