import uniqueId from '../../utils/uniqueId'

export interface Props {
  id: string
  value: string
}
export const relationOptions: Array<Props> = [
  {
    id: uniqueId(),
    value: 'mom',
  },
  {
    id: uniqueId(),
    value: 'dad',
  },
  {
    id: uniqueId(),
    value: 'sister',
  },
  {
    id: uniqueId(),
    value: 'brother',
  },
  {
    id: uniqueId(),
    value: 'grandmother',
  },
  {
    id: uniqueId(),
    value: 'grandfather',
  },
  {
    id: uniqueId(),
    value: 'aunt',
  },
  {
    id: uniqueId(),
    value: 'uncle',
  },
  {
    id: uniqueId(),
    value: 'son',
  },
  {
    id: uniqueId(),
    value: 'daughter',
  },
  {
    id: uniqueId(),
    value: 'cousin',
  },
  {
    id: uniqueId(),
    value: 'friend',
  },
]
