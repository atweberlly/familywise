import uniqueId from '../../utils/uniqueId'

export interface Props {
  id: string
  item: string
  classTitle: string
  showcaseImage: string
}

export const book_templates: Array<Props> = [
  {
    id: uniqueId(),
    showcaseImage: '/images/books/',
    classTitle: '',
    item: 'default',
  },
  {
    id: uniqueId(),
    showcaseImage: '/images/books/01-down-book.png',
    classTitle: '',
    item: '/book/_02.tsx',
  },
  {
    id: uniqueId(),
    showcaseImage: '/images/books/02-up-book.png',
    classTitle: '',
    item: '/book/_03.tsx',
  },
  {
    id: uniqueId(),
    showcaseImage: '/images/books/03-down-book.png',
    classTitle: '',
    item: '/book/_04.tsx',
  },
  {
    id: uniqueId(),
    showcaseImage: '/images/books/04-up-book.png',
    classTitle: '',
    item: '/book/_05.tsx',
  },
  {
    id: uniqueId(),
    showcaseImage: '/images/books/05-down-book.png',
    classTitle: '',
    item: '/book/_06.tsx',
  },
  {
    id: uniqueId(),
    showcaseImage: '/images/books/06-up-book.png',
    classTitle: '',
    item: '/book/_07.tsx',
  },
  {
    id: uniqueId(),
    showcaseImage: '/images/books/07-down-book.png',
    classTitle: '',
    item: '/book/_08.tsx',
  },
  // Add more templates as needed
]
