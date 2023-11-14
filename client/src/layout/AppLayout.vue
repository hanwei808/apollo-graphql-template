<template>
  <el-container class="container">
    <AppMenu />
    <el-container>
      <AppHeader />
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppHeader from '@/layout/components/AppHeader/index.vue'
import AppMenu from '@/layout/components/AppMenu/index.vue'
</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  line-height: 160px;
}
</style>