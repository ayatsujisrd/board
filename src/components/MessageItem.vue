<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import Avatar from './Avatar.vue'

interface MessageItemProps {
  id: string,
  name: string,
  createTime: string,
  content: string,
  replies?: MessageItemProps[]
}

defineProps<MessageItemProps>()

const reply = ref('')
const shownReplyInput = ref(false)

const showReplyInput = () => {
  shownReplyInput.value = true
}

const confirm = () => {
  console.log(reply.value)
  if (reply.value) {

    shownReplyInput.value = false
  }
}

</script>
<template>
  <div class="message-item">
    <div class="user">
      <Avatar :name="name" />
    </div>
    <div class="content-wrapper">
      <div class="content">{{ content }}</div>
      <ul class="reply" v-if="replies && replies.length">
        <li class="item" v-for="(reply) in replies" :key="reply.id">
          <div class="user">
            <Avatar :name="name" />
          </div>
          <div class="content-wrapper ml-4">
            <div class="content">{{ reply.content }}</div>
            <el-button link type="info">{{ reply.createTime }}</el-button>
          </div>
        </li>
      </ul>
      <div class="bottom-bar">
        <el-button type="info" link>{{ createTime }}</el-button>
        <el-button type="primary" link @click="showReplyInput">Reply</el-button>
      </div>
      <div class="reply-input mt-4" v-if="shownReplyInput">
        <el-input type="textarea" :rows="4" v-model="reply"></el-input>
        <el-button type="primary" class="mt-2" @click="confirm">confirm</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.message-item {
  display: flex;
  font-size: 1em;
  padding: 0.5em 1em;
  border: 1px solid #eee;

  .content-wrapper {
    flex: 1;
    padding: 1em 2em;

    .content {
      min-height: 10em;
    }

    .reply {
      font-size: 0.8em;
      margin-bottom: 1em;

      .item {
        display: flex;
        padding: 1.5em 1em;
        list-style: none;
        background-color: #eee;

        .content-wrapper {
          padding: 0;
        }

        .content {
          min-height: 5em;
        }

        border-top: 1px solid #ddd;

        &+.item {
          border-top: 1px solid #ddd;
        }

      }
    }

    .bottom-bar {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
    }

    .reply-input {
      padding: 0.5em 1em;
      background-color: #eee;
    }
  }
}
</style>