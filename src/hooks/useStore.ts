import { reactive } from "vue";

const store = reactive({
  username: 'Tom'
})

const useStore = () => {
  return store
}

export default useStore