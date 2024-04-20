import Image, { StaticImageData } from 'next/image'
import React from 'react'
import userone from '../../../public/img/user/jeffery-erhunse-4XK2oKKvzVU-unsplash.jpg'
import usertwo from '../../../public/img/user/lachlan-dempsey-6VPEOdpFNAs-unsplash.jpg'
import userthree from '../../../public/img/user/toa-heftiba-O3ymvT7Wf9U-unsplash.jpg'
import { cn } from '@/utils/classmerger'


interface IPostCard {
    classnames : string,
    image : StaticImageData,
    post : StaticImageData,
    desc : string,
    username : string
}

const PostCard = ({classnames, image, post, desc, username } : IPostCard) => {
  return (
    <div className={cn('absolute w-[200px] h-auto bg-white/90 backdrop-blur-sm rounded-md overflow-hidden drop-shadow-xl', classnames)}>
        <div className='flex flex-col items-start justify-start p-4 pb-2 gap-2'>
        <div className='flex items-center justify-start gap-2'>
            <Image src={image} alt='user' className='w-[30px] h-[30px] object-cover object-center rounded-full'/>
            <p className='m-0 text-[13px]'>{username}</p>
            <p className='m-0 text-[10px] text-gray-400 font-sans'>3h</p>
        </div>
        <p className='m-0 text-[13px]'>{desc}</p>
        </div>
        <Image src={post} alt='post'  className='w-[200px] h-[150px] object-cover object-center'/>
    </div>
  )
}

export default PostCard