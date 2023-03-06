import uniqueId from '../../utils/uniqueId'

export interface Props {
  id: string
  item: string
}
export const classic: Array<Props> = [
  {
    id: uniqueId(),
    item: '100 questions to choose from',
  },
  {
    id: uniqueId(),
    item: 'Include up to 52 stories in your book',
  },
  {
    id: uniqueId(),
    item: 'Choose a different question from your bank of questions',
  },
  {
    id: uniqueId(),
    item: 'Unlimited editing of your stories',
  },
  {
    id: uniqueId(),
    item: 'Full suite of design options for your printed book',
  },
]

export const premium: Array<Props> = [
  {
    id: uniqueId(),
    item: '500+ questions to choose from',
  },
  {
    id: uniqueId(),
    item: 'Move through your questions as quickly or as slowly as you want',
  },
  {
    id: uniqueId(),
    item: 'Change the frequency of your emails',
  },
  {
    id: uniqueId(),
    item: 'Publish from 20 to 550 pages in your book',
  },
  {
    id: uniqueId(),
    item: 'Receive Pro Tips for writing throughout the year',
  },
  {
    id: uniqueId(),
    item: 'Change the order of your stories before printing',
  },
  {
    id: uniqueId(),
    item: 'Write your own questions',
  },
  {
    id: uniqueId(),
    item: 'Rewrite a question to suit your style',
  },
  {
    id: uniqueId(),
    item: 'Publish your book of poetry or other writings',
  },
  {
    id: uniqueId(),
    item: 'Invite someone to have access to your account',
  },
  {
    id: uniqueId(),
    item: 'Have the opportunity to have your story published by us',
  },
  {
    id: uniqueId(),
    item: 'Design your own book cover',
  },
  {
    id: uniqueId(),
    item: 'Unlimited images included in your book',
  },
  {
    id: uniqueId(),
    item: 'Priority technical support',
  },
]

export const all_1: Array<Props> = [
  {
    id: uniqueId(),
    item: 'Emails with your question of the week for the duration of your membership',
  },
  {
    id: uniqueId(),
    item: 'Technical support by email, business hours AEST',
  },
  {
    id: uniqueId(),
    item: 'Member access to offers & upgrades throughout the year',
  },
  {
    id: uniqueId(),
    item: 'Lifetime access to your stories',
  },
]

export const all_2: Array<Props> = [
  {
    id: uniqueId(),
    item: 'Black & white or colour printing',
  },
  {
    id: uniqueId(),
    item: 'Book size is A5 (14.85x21cm)',
  },
  {
    id: uniqueId(),
    item: 'Paper options including matt, semi-gloss, or high-gloss ',
  },
  {
    id: uniqueId(),
    item: 'Paper weight options of 90gsm, 115gsm, 170gsm',
  },
  {
    id: uniqueId(),
    item: 'Design your own book cover',
  },
  {
    id: uniqueId(),
    item: 'Binding options - Perfect Bound soft cover, Hardcover with Dust Jacket or Hardcover Casewrap',
  },
  {
    id: uniqueId(),
    item: 'Print 1 single copy, or as many as you want',
  },
]
