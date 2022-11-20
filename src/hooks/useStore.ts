import { reactive } from "vue";
import { MessageItemProps } from "../types";

const store = reactive<{ username: string, messages: MessageItemProps[], category: string }>({
  username: window.sessionStorage.getItem('username') || 'Tom',
  messages: [],
  category: 'toys'
})

const useStore = () => {
  return store
}

export default useStore