<script lang="ts" setup>
import { User, Search } from '@element-plus/icons-vue'
import { reactive, ref } from '@vue/reactivity';
import { MessageItemProps } from '../types';
import useStore from '../hooks/useStore';
import MessageItem from '../components/MessageItem.vue';

const store = useStore()
const searchText = ref('')
const menu = reactive([{
  name: 'Hot',
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
  name: 'Tim',
  content: 'hello world',
  createTime: '2020-10-10 00:00:00',
  replies: [{
    id: '1',
    name: 'Tim',
    content: 'hello world',
    createTime: '2020-10-10 00:00:00',
  }]
}]



</script>
<template>
  <el-container>
    <el-header class="navbar">
      <ul class="menu">
        <li class="item" v-for="item in menu" :class="{ active: item.active }" :key="item.name">{{ item.name }}</li>
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
    </el-main>
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
</style>