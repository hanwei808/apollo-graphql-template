<template>
  <el-icon
    class="toggle-full-screen"
    @click="toggleFullScreen"
  >
    <FullScreen />
  </el-icon>
</template>

<script setup lang="ts">
import {
  FullScreen
} from '@element-plus/icons-vue'

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
        document.exitFullscreen()
    }
}
</script>

<style lang="scss" scoped>
.toggle-full-screen {
  margin: 0 20px;
}
</style>