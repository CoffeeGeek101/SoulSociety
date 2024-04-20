import React from 'react'
import spotify from '../../../public/img/logos/Spotify-Icon-Black-Logo.wine.svg'
import pintrest from '../../../public/img/logos/Pinterest-Icon-Black-Logo.wine.svg'
import youtube from '../../../public/img/logos/YouTube-Icon-Almost-Black-Logo.wine.svg'

const Integrators = () => {
  return (
    <div className='hidden lg:inline-block absolute bottom-[80px] right-[50px] bg-gradient-to-br from-slate-50/0 to-slate-200 text-white w-[230px] h-auto z-10 rounded-lg backdrop-blur-md shadow-lg'>
        <div className='p-2 text-end border-b-[1px] text-[13px]'>Connect apps to one place</div>
        <div className='flex items-center justify-end gap-4 p-2'>
            <div className='flex flex-col items-center'>
                <img src={spotify.src} alt='spotify' className='w-[30px] h-[30px]'/>
                <p className='m-0 text-[10px] text-gray-900'>Spotify</p>
            </div>
            <div className='flex flex-col items-center'>
                <img src={pintrest.src} alt='spotify' className='w-[30px] h-[30px]'/>
                <p className='m-0 text-[10px] text-gray-900'>Pintrest</p>
            </div>
            <div className='flex flex-col items-center'>
                <img src={youtube.src} alt='spotify' className='w-[30px] h-[30px]'/>
                <p className='m-0 text-[10px] text-gray-900'>Youtube</p>
            </div>
        </div>
    </div>
  )
}

export default Integrators