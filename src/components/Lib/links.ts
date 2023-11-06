import uniqueId from '../../utils/uniqueId'

export interface Props {
  id: string
  label: string
  href: string
}

const links: Array<Props> = [
  {
    id: uniqueId(),
    href: 'how-it-works',
    label: 'How it works',
  },
  {
    id: uniqueId(),
    href: 'books',
    label: 'Books',
  },
  {
    id: uniqueId(),
    href: 'shop',
    label: 'Shop',
  },
  {
    id: uniqueId(),
    href: 'frequently-asked-questions',
    label: 'FAQs',
  },
  {
    id: uniqueId(),
    href: 'inspirations/',
    label: 'Inspirations',
  },
  {
    id: uniqueId(),
    href: 'sign-in',
    label: 'Sign In',
  },
]

export default links
