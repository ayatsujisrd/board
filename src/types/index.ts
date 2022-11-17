export interface MessageItemProps {
  id: string,
  name: string,
  createTime: string,
  content: string,
  replies?: MessageItemProps[]
}