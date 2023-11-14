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
        登录
      </el-button>
      <el-button
        @click="router.push('/register')"
        type="primary"
        link
      >
        注册
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
    password: string
  }
  
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    username: '',
    password: ''
  })
  
  const rules = reactive<FormRules<RuleForm>>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
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
            login()
        } else {
            console.log('error submit!', fields)
        }
    })
  }

  const login = async () => {
    const data = await executeGraphQLMutate(`
        mutation {
          login(user: { username: "${ruleForm.username}", password: "${ruleForm.password}" }) {
            user {
              username
              token
            }
          }
        }
      `)
    if (!data.message) {
        ElMessage.success('登录成功')
        router.push('/')
    }
  }
</script>
  