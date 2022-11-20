import { reactive } from "vue";
import { MessageItemProps } from "../types";

const store = reactive<{username: string, messages: MessageItemProps[], category: string}>({
  username: 'Tom',
  messages: [],
  category: ''
})

const useStore = () => {
  return store
}

export default useStore