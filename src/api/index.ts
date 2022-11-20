import { ResponseWithData, User, UserWithEmail, MessageParams, MessageItemProps, ResponseId, ReplyParams, IId, ResponseStatus, DeleteReplyParams } from '../types'
import { del, get, post, put } from '../utils/request'

export const signin = (params: User) => post<ResponseWithData<{ code: 0 | 1, msg: string }>>('/signin', params)

export const signup = (params: UserWithEmail) => put<ResponseWithData<{ code: 0 | 1, msg: string }>>('/signup', params)

export const getMessages = (params: { category: string, pageSize: number, pageNo: number, search?: string }) => get<ResponseWithData<{ pageSize: number, pageNo: number, total: number, data: MessageItemProps[] }>>('/messages/' + params.category, { pageSize: params.pageSize, pageNo: params.pageNo, search: params.search })

export const addMessage = (params: MessageParams) => put<ResponseWithData<ResponseId>>('/addMessage', params)

export const addReply = (params: ReplyParams) => put<ResponseWithData<ResponseId>>('/addReply', params)

export const deleteMessage = (params: IId) => del<ResponseWithData<ResponseStatus>>('/deleteMessage', params)

export const deleteReply = (params: DeleteReplyParams) => del<ResponseWithData<ResponseStatus>>('/deleteReply', params)
