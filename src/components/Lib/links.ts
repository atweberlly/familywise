import uniqueId from '../../utils/uniqueId'

export interface Props {
  id: string
  label: string
  href: string
}

const links: Array<Props> = [
  {
    id: uniqueId(),
    href: '#how-it-works',
    label: 'How it works',
  },
  {
    id: uniqueId(),
    href: '#founder',
    label: 'The Founder',
  },
  {
    id: uniqueId(),
    href: 'frequently-asked-questions',
    label: 'FAQs',
  },
  {
    id: uniqueId(),
    href: 'pricing',
    label: 'Pricing',
  },
  {
    id: uniqueId(),
    href: 'sign-in',
    label: 'Sign In',
  },
]

export default links
