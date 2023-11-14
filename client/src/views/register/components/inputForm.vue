<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item
      label="用户名"
      prop="username"
    >
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item
      label="邮箱"
      prop="email"
    >
      <el-input v-model="ruleForm.email" />
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
    >
      <el-input
        type="password"
        v-model="ruleForm.password"
        autocomplete="off"
      />
    </el-form-item>
    
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        提交
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { executeGraphQLMutate } from '@/utils/request';
  import router from '@/router/index';
  import { ElMessage } from 'element-plus';
  
  interface RuleForm {
    username: string
    email: string
    password: string
  }
  
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    username: '',
    email: '',
    password: '',
  })
  
  const rules = reactive<FormRules<RuleForm>>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
  })
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
          register()
        } else {
          console.log('error submit!', fields)
        }
    })
  }

  const register = async () => {
    const data = await executeGraphQLMutate(`
        mutation {
          register(user: { username: "${ruleForm.username}", email: "${ruleForm.email}", password: "${ruleForm.password}" }) {
            user {
              username
              token
            }
          }
        }
      `)
    if (!data.message) {
        ElMessage.success('注册成功')
        router.push('/')
    }
  }
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  </script>
  