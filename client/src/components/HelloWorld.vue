<script setup lang="tsx">
import { ref, defineComponent } from 'vue'
import { Bar } from './bar.jsx'

defineProps<{ msg: string }>()

const count = ref(0)
const Abc = defineComponent({
  setup() {
    return () => <h1>TSX ABC</h1>
  }
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button
      type="button"
      @click="count++"
    >
      count is {{ count }}
    </button>
    <Bar />
    <Abc />
  </div>
</template>

<style scoped lang="scss">
.card {
  color: $color;
}
</style>