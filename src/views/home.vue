<script lang="ts" setup>
import { User, Search, Plus, SwitchButton } from '@element-plus/icons-vue'
import { reactive, ref } from '@vue/reactivity';
import { MessageItemProps } from '../types';
import useStore from '../hooks/useStore';
import MessageItem from '../components/MessageItem.vue';
import { addMessage, getMessages } from '../api';
import { ElMessage } from 'element-plus';
import { watch } from '@vue/runtime-core';
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

const pagination = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 0
})

const search = () => {
  getMessageList()
}

const shownMessageInput = ref(false)
const messageText = ref('')

const showMessageInput = () => {
  shownMessageInput.value = true
}

const confirmAdd = async () => {
  if (messageText.value) {
    const username = window.sessionStorage.getItem('username') as string
    try {
      const result = await addMessage({ user: username, content: messageText.value, category: store.category })
      if (result.status === 200 && result.data) {
        const { id, createTime } = result.data
        store.messages.unshift({
          _id: id,
          id,
          createTime,
          content: messageText.value,
          user: username,
          category: store.category,
          replies: []
        })

        messageText.value = ''
      }
    } catch (e) {
      ElMessage.error('Network error')
    }
    shownMessageInput.value = false
  }
}

const cancel = () => {
  shownMessageInput.value = false
  messageText.value = ''
}

const getMessageList = async () => {
  const { data } = await getMessages({ category: store.category, pageSize: pagination.pageSize, pageNo: pagination.pageNo, search: searchText.value })
  store.messages = reactive(data.data)
  pagination.total = data.total
}

const pickCategory = (item: MenuItem) => {
  let category = item.name
  store.category = category.toLowerCase()

  menu.forEach((item) => {
    item.active = false
  })
  item.active = true
}

const replied = (data: { id: string, reply: MessageItemProps }) => {
  const item = store.messages.find((m) => m.id === data.id)
  if (item) {
    if (!item.replies) {
      item.replies = []
    }
    item.replies.push(data.reply)
  }
}

watch(() => store.category, () => {
  getMessageList()
})

store.category = 'toys'

getMessageList()

const router = useRouter()

const logout = () => {
  window.sessionStorage.removeItem('username')
  window.localStorage.removeItem('token')
  router.push({ path: '/signin' })
}


const currentChange = (current: number) => {
  pagination.pageNo = current
  getMessageList()
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

          <el-button :icon="SwitchButton" size="small" link class="logout" @click="logout"></el-button>
        </div>
      </div>

    </el-header>
    <el-main>
      <div class="container">
        <div v-if="store.messages && store.messages.length">
          <message-item v-for="item in store.messages" :key="item.id" v-bind="item" @add-reply="replied" />
          <el-pagination layout="prev,pager,next" :total="pagination.total" :page-size="pagination.pageSize" @current-change="currentChange" class="mt-2" background></el-pagination>
        </div>
        <div v-else>
          <el-empty description="no data"></el-empty>
        </div>
        <div class="input mt-4" v-if="shownMessageInput">
          <el-input type="textarea" :rows="4" v-model="messageText"></el-input>
          <el-button type="primary" class="mt-2" @click="confirmAdd">confirm</el-button>
          <el-button class="mt-2 ml-2" @click="cancel">cancel</el-button>
        </div>
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
  position: sticky;
  top: 0;
  z-index: 1;

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
      margin: 0 8px;
    }

    .logout {
      color: #fff;
      font-size: 1em;
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