import { useState, ChangeEvent, useRef, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import Slider from 'react-slick'
import { ClipLoader } from 'react-spinners'
import Image from 'next/image'
import Heading from '../../components/Heading'
import Input from '../../components/Input'
import Title from '../../components/Title'
import MemberLayout from '../../layouts/MemberLayout'
import axios from 'axios'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { render } from 'react-dom';

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  title: string
  id: string
}

const BUCKET_URL = 'https://familyfortunate.s3.ap-southeast-2.amazonaws.com/'

const Cover = ({ id }: Props) => {
  const [saving, setSaving] = useState(false)
  const [isDisabled, setDisabled] = useState(true)
  const [content, setContent] = useState({ heading: '', story: '', caption: '' })
  const [image, setImage] = useState(null)
  const [defaultContent, setDefaultContent] = useState({ heading: '', story: '', caption: '' })
  const [uploadedFile, setUploadedFile] = useState<any>()
  

  function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
   
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile(reader.result as string);
      setImage(null);
    };
    reader.readAsDataURL(file);
  }
  

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const images = [
    // This is Sample Image Array Change it to become Dynamic
    '/images/cover/book-c1.svg',
    '/images/cover/book-c2.svg',
    '/images/cover/book-c3.svg',
    '/images/cover/book-c4.svg',
  ]

  return (
    <MemberLayout>
      <Title>Membership</Title>
      <div className="w-full ">
        <span className="font-normal">Select a cover template</span>
      </div>

      <div></div>
      <div className="h-[30%] w-[60%] py-[25px] px-[20px]">
        <Slider
          infinite={true}
          speed={500}
          slidesToShow={4}
          slidesToScroll={1}
          beforeChange={(oldIndex, newIndex) => setCurrentImageIndex(newIndex)}
        >
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index}`} onClick={() => handleImageClick(index)} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="h-[40%] w-[60%] py-[5px] px-[20px]">
        <form className="mt-8 md:mt-12">
          <div className="mb-4 w-[60%]">
            <Input //Title Input
              label={'Title'}
              type={'text'}
              name={'title'}
              placeholder={'eg: Happy life book'}
              autoComplete={'title'}
              className="dark:bg-[#323337] dark:text-white"
            ></Input>
          </div>
          <div className="mb-4 w-[60%]">
            <Input //Author Input
              label={'Author’s name'}
              type={'text'}
              name={'authpr'}
              placeholder={'eg: Alex Green'}
              autoComplete={'title'}
              className="dark:bg-[#323337] dark:text-white"
            ></Input>
          </div>
        </form>

        <div className="flex">
          <div className="w-[60%]">
            <div className="py-[25px]">
              <span>Cover photo</span>
              <div className="flex min-h-[159px] w-full items-center justify-center rounded-[12px] border-[1px] border-dashed border-secondary-500 ">
                <div className="text-center ">
                  {uploadedFile ? (
                    <img
                      src={uploadedFile}
                      alt=""
                      className="mx-auto max-h-32 w-auto object-cover"
                    />
                  ) : image ? (
                    <img
                      src={image}
                      alt={defaultContent.heading}
                      className="mx-auto max-h-32 w-auto object-cover"
                    />
                  ) : (
                    <CloudArrowUpIcon className="mx-auto h-8 w-8 text-[#9E7558]" />
                  )}
                  <label
                    htmlFor="avatar"
                    className="mt-[8px] cursor-pointer whitespace-nowrap text-secondary-300"
                  >
                    {'Upload a picture'}
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    // onChange={(e) => setValue('heading',(e.target as HTMLInputElement).value)}

                    onChange={uploadFile}
                    hidden
                  />
                  <p className="mb-8 text-xs text-[#9E7558]">
                    Only JPEG and PNG files with max size of 8MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2 px-[25px]">
          <div className="flex items-center justify-center gap-3">
            {saving ? (
              <>
                <ClipLoader color="#9E7558" loading={true} size={20} />
                <span className="text-[20px] text-[#9E7558]">saving</span>
              </>
            ) : (
              <>
                <FaCheck color="#9E7558" />
                <span className="text-[20px] text-[#9E7558]">saved</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-0 mx-auto h-auto w-auto bg-gray-200 py-4 px-5 dark:bg-dark-200">
        <span></span>
        <Heading size={2} className="top-0 pb-10">
          Preview
        </Heading>
        <Image //Preview Image
          className="z-50"
          src={uploadedFile ? uploadedFile : images[selectedImageIndex]}
          alt="previewImage"
          width="356"
          height="756"
          
        />
      </div>
    </MemberLayout>
  )
}

export default Cover
