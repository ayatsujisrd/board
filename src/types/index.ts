export interface MessageParams {
  user: string,
  content: string,
  category: string
}
export interface MessageItemProps extends MessageParams {
  id: string,
  createTime: string,
  replies?: MessageItemProps[]
}
export interface User {
  name: string,
  password: string
}

export interface UserWithEmail extends User {
  email: string
}

export interface ResponseData<T = any> {
  status: number,
  msg: string,
  data?: T
}

export type ResponseWithData<T> = Required<ResponseData<T>>

export interface ResponseId {
  id: string,
  createTime: string
}

export interface ReplyParams {
  id: string,
  content: string,
  user: string
}

export interface IId {
  id: string
}

export interface DeleteReplyParams extends IId {
  replyId: string
}

export interface ResponseStatus {
  code: 0 | 1,
  msg: string
}
