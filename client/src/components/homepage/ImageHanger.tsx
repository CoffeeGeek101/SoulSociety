import React from 'react'
import PostCard from './PostCard'
import userone from '../../../public/img/user/jeffery-erhunse-4XK2oKKvzVU-unsplash.jpg'
import usertwo from '../../../public/img/user/lachlan-dempsey-6VPEOdpFNAs-unsplash.jpg'
import userthree from '../../../public/img/user/toa-heftiba-O3ymvT7Wf9U-unsplash.jpg'

import waifu from '../../../public/img/postcard/d048d7c96f8c8e5599d4dadfac8306a1.jpg'
import cooking from '../../../public/img/postcard/jonathan-borba-uB7q7aipU2o-unsplash.jpg'
import batminton from '../../../public/img/postcard/vinh-thang-81JBliP14u4-unsplash.jpg'

const ImageHanger = () => {
  return (
    <div className='hidden lg:inline-block absolute r-[-100px] z-10 w-[400px] h-auto bg-white'>
        <div className='relative'>
            <PostCard classnames='top-[100px] left-[320px] z-20 shadow-xl' image={userone} post={waifu} desc='Anime and chill, thats it! 😍' username='jim_here'/>
            <PostCard classnames='top-[200px] left-[420px] z-20' image={usertwo} post={cooking} desc='Been looking into cooking videos! 🥦' username='mako_marin'/>
            <PostCard classnames='top-[50px] left-[240px] z-10' image={userthree} post={batminton} desc='Favorite cardio of all time.' username='jack_'/>
        </div>
    </div>
  )
}

export default ImageHanger