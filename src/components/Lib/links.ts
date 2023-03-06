export interface Props {
  id: number
  text: string
  href: string
  isActive?: boolean
}

const links: Array<Props> = [
  {
    id: 1,
    text: 'Home',
    href: '/',
    isActive: true,
  },
  {
    id: 2,
    text: 'FAQ',
    href: '/',
    isActive: false,
  },
  {
    id: 3,
    text: 'Inspiration',
    href: '/',
    isActive: false,
  },
  {
    id: 4,
    text: 'Journals',
    href: '/',
    isActive: false,
  },
  {
    id: 5,
    text: 'Contact',
    href: '/',
    isActive: false,
  },
]

export default links
