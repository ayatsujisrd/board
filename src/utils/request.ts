import axios, { AxiosRequestConfig } from 'axios'
import router from '../router'


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = {
      'authorization': token
    }
  }
  return config
})
instance.interceptors.response.use((response) => {
  if (response.status === 401) {
    router.push('/signin')
    return response
  }
  return response
}, (error) => {
  console.log(error)
  if(error.response.status === 401) {
    router.push('/signin')
  }
})


export default instance

const service = <T>(config: AxiosRequestConfig): Promise<T> => instance<T>(config).then((result) => result.data)

export const get = <T>(url: string, params?: any) => service<T>({
  method: 'GET',
  url,
  params
})

export const post = <T>(url: string, params?: any) => service<T>({
  method: 'POST',
  url,
  data: params
})

export const put = <T>(url: string, params?: any) => service<T>({
  method: 'PUT',
  url,
  data: params
})

export const patch = <T>(url: string, params?: any) => service<T>({
  method: 'PATCH',
  url,
  data: params
})

export const del = <T>(url: string, params?: any) => service<T>({
  method: 'delete',
  url,
  data: params
})
