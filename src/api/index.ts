import { ResponseWithData, User, UserWithEmail, MessageParams, MessageItemProps, ResponseId, ReplyParams, IId, ResponseStatus, DeleteReplyParams } from '../types'
import { del, get, post, put } from '../utils/request'

export const signin = (params: User) => post<ResponseWithData<{ code: 0 | 1, msg: string }>>('/signin', params)

export const signup = (params: UserWithEmail) => post<ResponseWithData<{ code: 0 | 1, msg: string }>>('/signup', params)

export const getMessages = () => get<ResponseWithData<MessageItemProps>>('/messages')

export const addMessage = (params: MessageParams) => put<ResponseWithData<ResponseId>>('/addMessage', params)

export const addReply = (params: ReplyParams) => put<ResponseWithData<ResponseId>>('/addReply', params)

export const deleteMessage = (params: IId) => del<ResponseWithData<ResponseStatus>>('/deleteMessage', params)

export const deleteReply = (params: DeleteReplyParams) => del<ResponseWithData<ResponseStatus>>('/deleteReply', params)
