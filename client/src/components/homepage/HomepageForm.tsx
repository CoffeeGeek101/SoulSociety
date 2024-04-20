import React from 'react'
import RegisterForm from './RegisterForm'

const HomepageForm = () => {
  return (
    <div className='flex-1 text-slate-50 flex flex-col items-start p-10 gap-16'>
      <div className='flex flex-col items-end gap-2'>
        <p className='font-extrabold text-[35px] md:text-[40px] lg:text-[60px] text-end'>Welcome to <span>Soul Society.</span></p>
        <p className='font-thin text-sm md:text-base lg:text-lg font-sans'>A creative space for you, made by you.</p>
      </div>
      <RegisterForm/>
    </div>
  )
}

export default HomepageForm