import uniqueId from '../../utils/uniqueId'

/* 
The 'item' prop will be utilized to generate a PDF, leveraging the existing design. 
Other properties will be employed for preview purposes.

Family:
pages/member/cover.tsx
pages/books/[number]
*/

export interface Props {
  id: string
  item: string
  backgroundOverlay: string
  divContainer: string
  title: string
  authorContainer: string
  author: string
  showcaseImage: string
  imageStyle: string
  coverStyle: string
  // Small Version for Title
  sTitle: string
  // Duplicated properties for PDF design
  backgroundOverlayPdf: string
  divContainerPdf: string
  titlePdf: string
  authorContainerPdf: string
  authorPdf: string
  imageStylePdf: string
  coverStylePdf: string
  sTitlePdf: string
}

export const book_templates: Array<Props> = [
  //Default Template
  {
    id: uniqueId(),
    showcaseImage: '/images/books/',
    backgroundOverlay: 'top-0 left-0  flex flex-col justify-between p-8 font-serif bg-white',
    divContainer: 'top-5 z-20 my-auto absolute bottom-5 left-0 w-full text-center',
    title: 'text-4xl uppercase tracking-widest w-full bg-white text-black',
    sTitle: 'text-2xl uppercase tracking-widest w-full bg-white text-black',
    authorContainer: 'absolute bottom-5 left-0 w-full text-center',
    author: 'text-lg uppercase tracking-widest text-white',
    item: 'default',
    imageStyle: 'w-[100%] h-[100%] object-cover',
    coverStyle: 'cover',
    // PDF design properties
    backgroundOverlayPdf: 'top-0 left-0 flex flex-col font-serif ',
    divContainerPdf: 'relative z-20 my-auto flex flex-col text-center  text-4xl',
    titlePdf: ' -mt-[720px]  text-7xl text-center text-black w-full bg-white',
    sTitlePdf: '-mt-[720px]  text-6xl text-center text-black w-full bg-white',
    authorContainerPdf: 'absolute bottom-5 left-0 w-full text-center ',
    authorPdf: 'text-2xl uppercase tracking-widest -mb-[90px] text-white ',
    imageStylePdf: 'w-[5.5in] h-full  object-cover',
    coverStylePdf: ' cover w-[5.5in]   h-auto',
  },
  //Template 1
  {
    id: uniqueId(),
    showcaseImage: '/images/books/02-up-book.png',
    backgroundOverlay:
      'absolute top-0 left-0 w-full h-full flex flex-col justify-between p-8 font-serif',
    divContainer: 'relative z-20 my-auto flex flex-col text-center text-4xl text-white',
    title: 'title',
    sTitle: 'title',
    authorContainer: 'absolute bottom-5 left-0 w-full text-center',
    author: 'text-lg uppercase tracking-widest text-white',
    item: '/book/_02.tsx',
    imageStyle: 'w-[100%] h-[100%] object-cover',
    coverStyle: 'cover',
    // PDF design properties
    backgroundOverlayPdf: 'top-0 left-0 flex flex-col font-serif ',
    divContainerPdf: 'relative z-20 my-auto flex flex-col text-center text-4xl text-yellow-500 ',
    titlePdf: ' -mt-[420px]  text-6xl text-center text-white ',
    sTitlePdf: '-mt-[420px]  text-6xl text-center text-white ',
    authorContainerPdf: 'absolute bottom-5 left-0 w-full text-center ',
    authorPdf: 'text-2xl uppercase tracking-widest -mb-[90px] text-white ',
    imageStylePdf: 'w-[5.5in] h-full  object-cover',
    coverStylePdf: ' cover w-[5.5in]   h-auto',
  },
  //Template 2
  {
    id: uniqueId(),
    showcaseImage: '/images/books/03-down-book.png',
    backgroundOverlay: 'absolute top-0 left-0 w-full h-full flex flex-col p-8 font-serif',
    divContainer: 'relative z-20 flex flex-col text-white items-center justify-center',
    title: 'mb-4 font-serif text-5xl italic text-center',
    sTitle: 'mb-4 font-serif text-4xl italic text-center ',
    authorContainer: 'absolute bottom-0 left-0 w-full text-center pb-8 mt-8',
    author: 'text-lg uppercase tracking-widest',
    item: '/book/_03.tsx',
    imageStyle: 'relative my-[30%] h-[50%] w-full border-y-8 border-yellow-600 object-cover',
    coverStyle: 'cover bg-primary-600',
    // PDF design properties
    backgroundOverlayPdf: 'top-0 left-0 flex flex-col p-8 font-serif',
    divContainerPdf: 'relative z-20 my-auto flex flex-col item-center justify-center',
    titlePdf: ' -mb-[90px] text-7xl italic  text-center text-white',
    sTitlePdf: '-mb-[90px] text-6xl italic text-center text-white',
    authorContainerPdf: 'absolute bottom-0 left-0 w-full text-center -mb-[750px] text-yellow-500',
    authorPdf: 'text-2xl uppercase tracking-widest text-black',
    imageStylePdf:
      'border-t-8 border-b-8 border-l-0 border-r-0 border-solid border-yellow-600 absolute mt-[130px] mb-4xl w-[5.5in] h-[50%] object-cover',
    coverStylePdf: 'cover w-[5.5in] h-auto bg-[#9e7558]',
  },

  //Template 3
  {
    id: uniqueId(),
    showcaseImage: '/images/books/04-up-book.png',
    backgroundOverlay: 'absolute top-0 left-0 w-full h-full flex flex-col p-8 font-serif',
    divContainer: 'relative z-20 my-auto flex flex-col text-center text-4xl',
    title: 'mt-20 -mb-20 text-5xl  uppercase text-center',
    sTitle: 'mt-20 -mb-20 pt-10 text-5xl  uppercase text-center',
    authorContainer: 'absolute bottom-0 left-0 w-full text-center pb-8',
    author: 'text-lg uppercase tracking-widest',
    item: '/book/_04.tsx',
    imageStyle:
      'relative my-auto w-[80%] mx-auto mt-10 h-[50%] object-cover border-8 border-yellow-600',
    coverStyle: 'cover bg-primary-400',
    // PDF design properties
    backgroundOverlayPdf: 'top-0 left-0 flex flex-col p-8 font-serif',
    divContainerPdf: 'relative z-20 my-auto flex flex-col text-center text-4xl text-yellow-500',
    titlePdf: ' mb-20 text-7xl uppercase  text-center text-black',
    sTitlePdf: 'mb-20 text-6xl uppercase text-center text-black',
    authorContainerPdf: 'absolute bottom-0 left-0 w-full text-center -mb-[200px] text-yellow-500',
    authorPdf: 'text-2xl uppercase tracking-widest  text-black',
    imageStylePdf:
      'ml-[0.7in] my-auto w-[74%] mt-20 mb-4xl h-[40%]  object-cover border-8 border-solid border-yellow-600',
    coverStylePdf: ' cover w-[5.5in] h-auto bg-[#b99d7e]',
  },

  // Template 4
  {
    id: uniqueId(),
    showcaseImage: '/images/books/05-down-book.png',
    backgroundOverlay: 'absolute top-0 left-0 w-full h-full flex flex-col p-8 font-serif',
    divContainer: 'relative z-20 my-auto flex flex-col text-center text-4xl text-yellow-500',
    title: 'mt-40 pt-10 -mb-20 text-5xl uppercase  text-center',
    sTitle: 'mt-40 pt-10 -mb-20 text-4xl uppercase text-center',
    authorContainer: 'absolute bottom-0 left-0 w-full text-center pb-8 text-yellow-500',
    author: 'text-lg uppercase tracking-widest ',
    item: '/book/_05.tsx',
    imageStyle:
      'relative my-auto w-[70%] mx-auto mt-10 mb-4xl h-[60%] object-cover border-4 border-yellow-600',
    coverStyle: 'cover bg-sky-900 border-4 border-yellow-500',
    // PDF design properties
    backgroundOverlayPdf: 'top-0 left-0 flex flex-col p-8 font-serif',
    divContainerPdf: 'relative z-20 my-auto flex flex-col text-center text-4xl text-yellow-500',
    titlePdf: ' mb-20 text-7xl uppercase  text-center',
    sTitlePdf: 'mb-20 text-6xl uppercase text-center',
    authorContainerPdf: 'absolute bottom-0 left-0 w-full text-center -mb-[90px] text-yellow-500',
    authorPdf: 'text-2xl uppercase tracking-widest ',
    imageStylePdf:
      'ml-[0.7in] my-auto w-[74%] mt-10 mb-4xl h-[60%]  object-cover border-8 border-solid border-yellow-600',
    coverStylePdf: ' cover w-[5.5in] h-auto bg-sky-900 border-8 border-solid border-yellow-600',
  },
  //Template 5
  {
    id: uniqueId(),
    showcaseImage: '/images/books/06-up-book.png',
    backgroundOverlay: 'absolute top-0 left-0 w-full h-full flex flex-col p-8 font-serif',
    divContainer: 'relative z-20 flex flex-col text-white items-center justify-center',
    title: 'mb-2 font-serif text-5xl uppercase text-center',
    sTitle: 'mb-2 font-serif text-5xl uppercase text-center',
    authorContainer: 'absolute bottom-0 left-0 w-full text-center pb-8 text-white',
    author: 'text-lg uppercase tracking-widest',
    item: '/book/_06.tsx',
    imageStyle: 'relative  my-[40%] h-[64] w-[80%] mx-auto border border-white object-cover',
    coverStyle: 'cover bg-green-800',
    // PDF design properties
    backgroundOverlayPdf: 'top-0 left-0 flex flex-col p-8 font-serif',
    divContainerPdf: 'relative z-20 my-auto flex flex-col item-center justify-center',
    titlePdf: ' -mb-[130px] text-7x uppercasel text-center text-white',
    sTitlePdf: '-mb-[130px] text-6xl uppercase text-center text-white',
    authorContainerPdf: 'absolute bottom-0 left-0 w-full text-center -mb-[750px] text-yellow-500',
    authorPdf: 'text-2xl uppercase tracking-widest text-white',
    imageStylePdf:
      'border-solid border-white absolute ml-[0.3in] mt-[190px] mb-4xl w-[40%] h-[40%] object-cover',
    coverStylePdf: 'cover w-[5.5in] h-auto bg-green-800',
  },
  //Template 6
  {
    id: uniqueId(),
    showcaseImage: '/images/books/07-down-book.png',
    backgroundOverlay: 'absolute top-0 left-0 w-full h-full flex flex-col p-8 font-serif',
    divContainer: 'relative z-20 flex flex-col text-white items-center justify-center',
    title: 'mb-2 font-serif text-5xl uppercase text-center',
    sTitle: 'mb-2 font-serif text-5xl uppercase text-center',
    authorContainer: 'absolute bottom-10 left-0 w-full text-center pb-8 text-yellow-500',
    author: 'text-lg uppercase tracking-widest',
    item: '/book/_07.tsx',
    imageStyle:
      'relative  my-[40%] h-[55%] w-[80%] mx-auto border-4 border-yellow-500 object-cover',
    coverStyle: 'cover bg-sky-900 border-4 border-yellow-500',
    // PDF design properties
    backgroundOverlayPdf: 'top-0 left-0 flex flex-col p-8 font-serif',
    divContainerPdf: 'relative z-20 my-auto flex flex-col item-center justify-center',
    titlePdf: ' -mb-[130px] text-7x uppercasel text-center text-white',
    sTitlePdf: '-mb-[130px] text-6xl uppercase text-center text-white',
    authorContainerPdf: 'absolute bottom-0 left-0 w-full text-center -mb-[690px] text-yellow-500',
    authorPdf: 'text-2xl uppercase tracking-widest text-yellow-500',
    imageStylePdf:
      'border-solid border-white absolute ml-[0.3in] mt-[160px] mb-4xl w-[40%] h-[60%] object-cover border-8 border-yellow-500',
    coverStylePdf: ' cover w-[5.5in] h-auto bg-sky-900 border-8 border-solid border-yellow-600',
  },
  // Add more templates as needed
]
