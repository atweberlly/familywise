import uniqueId from '../../utils/uniqueId'

export interface Props {
  id: string
  value: string
}
export const occasionOptions: Array<Props> = [
  {
    id: uniqueId(),
    value: 'Merry Christmas!',
  },
  {
    id: uniqueId(),
    value: 'Happy Birthday!',
  },
  {
    id: uniqueId(),
    value: "Happy Mother's Day!",
  },
  {
    id: uniqueId(),
    value: "Happy Father's Day!",
  },
  {
    id: uniqueId(),
    value: 'Congratulations!',
  },
  {
    id: uniqueId(),
    value: 'Happy New Year!',
  },
  {
    id: uniqueId(),
    value: 'other',
  },
]
