<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
import useStore from '../hooks/useStore';
import { addReply, deleteMessage, deleteReply } from '../api'
import { ReplyParams, ResponseId } from '../types';
import Avatar from './Avatar.vue'
import { computed } from '@vue/runtime-core';

interface MessageItemProps {
  _id: string,
  id: string,
  user: string,
  createTime: string,
  content: string,
  replies?: MessageItemProps[]
}


const props = defineProps<MessageItemProps>()
const emit = defineEmits<{
  (e: 'addReply', data: { id: string, reply: MessageItemProps }): void
  (e: 'removeMessage', id: string): void
  (e: 'removeReply', id: string, replyId: string): void
}>()

const replies = computed(() =>props.replies?.map((r) => ({ ...r, id: r._id })))

const reply = ref('')
const shownReplyInput = ref(false)

const showReplyInput = () => {
  shownReplyInput.value = true
}

const store = useStore()

const showDelete = (username: string) => store.username === username

const confirm = async () => {
  if (reply.value) {
    shownReplyInput.value = false
    const content = reply.value
    try {
      const { data } = await addReply({ id: props.id, user: store.username, content })
      emit('addReply', {
        id: props.id,
        reply: { _id: data.id, id: data.id, createTime: data.createTime, user: store.username, content }
      })
      ElMessage.success('reply successfully')
    } catch (e) {
      ElMessage.error('Network error')
    }

  }
}

const removeMessage = async (id: string) => {
  try {
    const result = await deleteMessage({ id })
    if (result.status === 200 && result.data.code) {
      ElMessage.success('delete successfully')
      const index = store.messages.findIndex(m => m.id === id)
      if (index > -1) {
        store.messages.splice(index, 1)
      }
    } else {
      ElMessage.success('failed to delete')
    }

  } catch (e) {
    ElMessage.error('Network error')
  }

}

const removeReply = async (id: string, replyId: string) => {
  console.log(id, replyId)

  try {
    const result = await deleteReply({ id, replyId })
    if (result.status === 200 && result.data.code) {
      ElMessage.success('delete successfully')
      const item = store.messages.find(m => m.id === id)

      if (item) {
        const index = item.replies!.findIndex(r => r._id === replyId)
        index > -1 && item.replies!.splice(index, 1)
      }
    } else {
      ElMessage.success('failed to delete')
    }
  } catch (e) {
    ElMessage.error('Network error')
  }

}

const cancel = () => {
  shownReplyInput.value = false
  reply.value = ''
}

</script>
<template>
  <div class="message-item">
    <div class="user">
      <Avatar :name="user" />
    </div>
    <div class="content-wrapper">
      <div class="delete" v-if="showDelete(user)">
        <el-button type="primary" link @click="removeMessage(id)">delete</el-button>
      </div>
      <div class="content">{{ content }}</div>
      <ul class="reply" v-if="replies && replies.length">
        <li class="item" v-for="(reply) in replies" :key="reply.id">
          <div class="delete" v-if="showDelete(reply.user)">
            <el-button link type="primary" @click="removeReply(id, reply.id)">delete</el-button>
          </div>
          <div class="user">
            <Avatar :name="user" />
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
        <el-button class="ml-2 mt-2" @click="cancel">cancel</el-button>
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

  &+.message-item {
    margin-top: 1em;
  }

  .delete {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
  }

  .content-wrapper {
    position: relative;
    flex: 1;
    padding: 1em 2em;

    .content {
      min-height: 10em;
    }

    .reply {
      font-size: 0.8em;
      margin-bottom: 1em;

      .item {
        position: relative;
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