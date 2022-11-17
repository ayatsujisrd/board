<script lang="ts" setup>
defineProps<{ name: string }>()
</script>
<template>
  <div class="avatar">
    <img src="../assets/vue.svg" alt="" class="avatar-img">
    <span>{{ name }}</span>
  </div>
</template>
<style lang="scss" scoped>
.avatar {
  display: flex;
  flex-direction: column;
  text-align: center;

  .avatar-img {
    width: 4em;
    height: 4em;
    margin-bottom: 1em;
    border-radius: 50%;
    object-fit: contain;
  }
}
</style>