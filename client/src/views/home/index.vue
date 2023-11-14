<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { executeGraphQLQuery } from '@/utils/request';

interface IUser {
  username: string
  email: string
}

const list = ref<IUser[]>([])

onMounted(async () => {
  console.log('home mounted');
  const data = await executeGraphQLQuery(`
        query {
          users {
            username
            email
          }
        }
      `)
      console.log(data)
    list.value = data.users
});
</script>

<template>
  用户列表
  <ul>
    <li
      v-for="item in list"
      :key="item.username"
    >
      用户名：{{ item.username }} 邮箱：{{ item.email }}
    </li>
  </ul>
</template>
