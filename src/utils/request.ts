import axios, { AxiosRequestConfig } from 'axios'


const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
})

export default instance

const service = <T>(config: AxiosRequestConfig) => instance<T>(config).then((result) => result.data)

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
