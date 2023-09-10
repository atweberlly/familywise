import uniqueId from '../../utils/uniqueId'

export interface Props {
  id: string
  item: string
  icon?: string | null
}

//Extra of qbb label= 1 copy of your own professionally printed premium book
export const questionbasedbook_extra: Array<Props> = [
  {
    id: uniqueId(),
    item: 'Paperback, perfect-bound book with a gloss finish',
  },
  {
    id: uniqueId(),
    item: 'Choose your own photo for the book cover',
  },
  {
    id: uniqueId(),
    item: 'One 100-page A5 book ',
  },
  {
    id: uniqueId(),
    item: 'Longer books & additional copies are available',
  },
  {
    id: uniqueId(),
    item: 'Premium satin stock - this paper is beautiful for photo & print quality',
  },
  {
    id: uniqueId(),
    item: 'You can print as many copies of your book as you want',
  },
]

export const photobasedbook_extra: Array<Props> = [
  {
    id: uniqueId(),
    item: 'Paperback, perfect-bound book with a gloss finish',
  },
  {
    id: uniqueId(),
    item: 'One 100-page A5 book ',
  },
  {
    id: uniqueId(),
    item: 'Longer books & additional copies available ',
  },
  {
    id: uniqueId(),
    item: 'Premium satin stock - this paper is beautiful for photo & print quality',
  },
  {
    id: uniqueId(),
    item: 'You can print as many copies of your book as you want',
  },
]
