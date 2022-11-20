<script lang="ts" setup>
import { User, Search, Plus } from '@element-plus/icons-vue'
import { reactive, ref } from '@vue/reactivity';
import { MessageItemProps } from '../types';
import useStore from '../hooks/useStore';
import MessageItem from '../components/MessageItem.vue';
import { addMessage } from '../api';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
interface MenuItem {
  name: string,
  active: boolean
}

const store = useStore()
const searchText = ref('')
const menu = reactive<MenuItem[]>([{
  name: 'Toys',
  active: true
}, {
  name: 'Technology',
  active: false
}, {
  name: 'Study',
  active: false
}])

const search = () => {
  if (searchText.value) {
    console.log(searchText.value)
  }
}

const messages: MessageItemProps[] = [{
  id: '1',
  user: 'Tim',
  content: 'hello world',
  createTime: '2020-10-10 00:00:00',
  replies: [{
    id: '1',
    user: 'Tim',
    content: 'hello world',
    createTime: '2020-10-10 00:00:00',
  }]
}]

const shownMessageInput = ref(false)
const messageText = ref('')

const showMessageInput = () => {
  shownMessageInput.value = true
}

const confirmAdd = async () => {
  if (messageText.value) {
    const username = window.sessionStorage.getItem('username') as string
    try {
      const result = await addMessage({ user: username, content: messageText.value })
      if (result.status === 200 && result.data) {

      }
    } catch (e) {
      ElMessage.error('Network error')
    }
  }
}

const cancel = () => {
  shownMessageInput.value = false
  messageText.value = ''
}

const router = useRouter()

const pickCategory = (item: MenuItem) => {
  let category = item.name
  category = category.toLowerCase()
  router.push({ path: '/home/' + category })
  menu.forEach((item) => {
    item.active = false
  })
  item.active = true
}

</script>
<template>
  <el-container>
    <el-header class="navbar">
      <ul class="menu">
        <li class="item" v-for="item in menu" :class="{ active: item.active }" :key="item.name"
          @click="pickCategory(item)">{{ item.name }}</li>
      </ul>
      <div class="right">
        <div class="search">
          <el-input v-model="searchText">
            <template #append>
              <el-button :icon="Search" @click="search"></el-button>
            </template>
          </el-input>
        </div>

        <div class="avatar">
          <el-icon>
            <User />
          </el-icon>
          <span class="text">{{ store.username }}</span>
        </div>
      </div>

    </el-header>
    <el-main>
      <div class="container">
        <message-item v-for="item in messages" :key="item.id" v-bind="item" />
      </div>
      <div class="input" v-if="shownMessageInput">
        <el-input type="textarea" :rows="4" v-model="messageText"></el-input>
        <el-button type="primary" class="mt-2" @click="confirmAdd">confirm</el-button>
        <el-button class="mt-2 ml-2" @click="cancel">cancel</el-button>
      </div>
    </el-main>
    <el-button :icon="Plus" class="fixed" @click="showMessageInput"></el-button>
  </el-container>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 0 4em;
  background: steelblue;
  color: #fff;

  .right {
    display: flex;
    margin: 0 auto;
    margin-right: 0;
  }

  .search {
    margin-right: 24px;
  }

  .avatar {
    display: flex;
    align-items: center;

    .text {
      display: inline-block;
      margin-left: 8px;
    }
  }

  .menu {
    display: flex;

    .item {
      margin-left: 2em;
      cursor: pointer;

      &.active {
        color: var(--el-color-primary-light-5);
      }
    }
  }
}

.container {
  max-width: 920px;
  padding: 1em 2em;
  margin: 0 auto;
  margin-top: 2em;
}

.fixed {
  position: fixed;
  bottom: 20px;
  left: 10px;
}
</style>