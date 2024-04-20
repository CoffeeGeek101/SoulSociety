import React from 'react'
import MusicCard from '/public/img/muisc-card.jpg'
import Image from 'next/image'
import {Disc3} from 'lucide-react'

const SongCard = () => {
  return (
    <div className='hidden lg:inline-block absolute bottom-[200px] left-[50px] bg-gradient-to-tr from-slate-50/0 to-slate-400 text-white w-[300px] h-auto z-10 rounded-lg backdrop-blur-md shadow-lg'>
        <div className='p-3 border-b-[1px] flex items-center justify-start'>
            <p className='m-0'>Whats you vibing</p>
            <Disc3 size={17} className='ml-2 animate-spin'/>
        </div>
        <div className='flex items-start justify-center p-3 bottom-1'>
            <div className='w-[70%] flex flex-col items-start'>
                <p className='m-0 font-medium truncate'>KU LO SA</p>
                <p className='m-0 text-[10px] truncate'>Oxlade, Camila Cabello</p>
                <p className='font-sans mt-6 text-[10px]'>1,234 people been vibing</p>
            </div>
            <Image src={MusicCard} alt='card' className='w-[80px] rounded-sm'/>
        </div>
    </div>
  )
}

export default SongCard