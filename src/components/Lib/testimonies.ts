export interface Props {
  id: number
  name: string
  position: string
  message: string
  image?: string
}
const testimonies: Array<Props> = [
  {
    id: 1,
    name: 'Alby H',
    message: `I decided to capture my life story through Family Wise. It was so nice to relive all of my memories & experiences and to know I’ve created a memento my family love, which will last forever.`,
    position: 'Lorem Ipsum',
    image: 'avatar-1.png',
  },
  {
    id: 2,
    name: 'Tash T',
    message: `I bought this for my Gran as a Christmas gift and I’m so so glad I did!  She wrote & I read, then we talked.  What more could I want than quality time with such an inspiring person.  I learned so much about her life which has made her even more special in my eyes!`,
    position: 'Lorem Ipsum',
    image: '',
  },
  {
    id: 3,
    name: 'Lorem Ipsum',
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam sit quis semper cras nunc, purus diam.`,
    position: 'Lorem Ipsum',
    image: '',
  },
]

export default testimonies
