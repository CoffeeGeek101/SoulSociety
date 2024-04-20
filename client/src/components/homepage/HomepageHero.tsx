"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import loginhero from '/public/img/alex-shuper-jBAcX9rZF4s-unsplash.jpg'
import loginmore from '/public/img/alex-shuper-yZMMg6oPkWc-unsplash.jpg'
import loginhero2 from '/public/img/andrew-kliatskyi-P46Fz8onsbs-unsplash.jpg'
import useMeasure from 'react-use-measure'
import { animate, useMotionValue, motion } from 'framer-motion'
import SongCard from './SongCard'
import ImageHanger from './ImageHanger'
import Integrators from './Integrators'

const HomepageHero = () => {

  const heroImgs = [
    loginhero,
    loginmore,
    loginhero2
  ]

  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let final = - width / 2 - 8;

    controls = animate(xTranslation, [0, final], {
      ease: "linear",
      duration: 75,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    })
    
    return controls?.stop;

  },[width, xTranslation])


  return (
    <div className='hidden md:inline-block flex-1 h-full pl-10 pr-3 pt-3 pb-3 overflow-hidden relative'>
      <SongCard/>
      <ImageHanger/>
      <Integrators/>
        <motion.div className='hidden md:flex h-full gap-4 p-5' ref={ref} style={{x : xTranslation}}>
          {[...heroImgs, ...heroImgs].map((img, index) => (
            <Image src={img} alt='loginhero' className='h-full object-cover object-center w-52 rounded-md' key={index}/>
          ))}
        </motion.div>
    </div>
  )
}

export default HomepageHero