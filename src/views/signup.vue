<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { FormInstance, FormRules } from "element-plus";

const form = reactive({
  username: '',
  email: '',
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
  username: [
    { required: true, message: 'Please enter your username', trigger: 'blur' },
    { min: 5, max: 10, message: 'Your username length should be 5 to 10', trigger: 'blur' }
  ],
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
const confirm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // TODO: signup
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
          <h3>Sign up</h3>
        </template>

        <el-form ref="formRef" label-width="120px" :model="form" :rules="rules">
          <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item label="Confirm" prop="password_again">
            <el-input v-model="form.password_again" placeholder="Password Again"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="confirm" class="ml-8 mt-2">Confirm</el-button>
      </el-card>
    </el-col>
  </el-row>

</template>
<style lang="scss" scoped>

</style>