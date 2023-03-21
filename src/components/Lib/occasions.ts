import uniqueId from '../../utils/uniqueId'

export interface Props {
  id: string
  value: string
}
export const occasionOptions: Array<Props> = [
  {
    id: uniqueId(),
    value: 'merry christmas!',
  },
  {
    id: uniqueId(),
    value: 'happy birthday!',
  },
  {
    id: uniqueId(),
    value: "happy mother's Day!",
  },
  {
    id: uniqueId(),
    value: "happy father's day!",
  },
  {
    id: uniqueId(),
    value: 'congratulations!',
  },
  {
    id: uniqueId(),
    value: 'happy new year!',
  },
  {
    id: uniqueId(),
    value: 'other',
  },
]
