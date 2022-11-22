<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { forget } from '../api'
import useStore from "../hooks/useStore";

const form = reactive({
  email: '',
})
const formRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  email: [
    { type: 'email', message: 'Wrong email format', trigger: ['blur', 'change'] },
  ],
})

const router = useRouter()
const store = useStore()
const confirm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      forget({ email: form.email }).then((res) => {
        const { status, data } = res

        if (status === 200 && data.code === 1) {
          ElMessage.success('send email successfully')
        } else {
          ElMessage.error(data.msg)
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
          <h3>Forget Password</h3>
        </template>

        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-button type="primary" @click="confirm">Send</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

</template>
<style lang="scss" scoped>

</style>