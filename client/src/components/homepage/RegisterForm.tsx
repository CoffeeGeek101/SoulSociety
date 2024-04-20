import React from 'react'

const RegisterForm = () => {
  return (
    <div className='flex flex-col items-start w-full'>
        <p className='font-bold text-xl lg:text-3xl'>Get Started with us.</p>
        <p className='font-sans font-thin text-sm lg:text-base'>Enter your Username and Password and start expressing.</p>
        <form className='mt-10 flex flex-col gap-10 items-start w-full'>
            <input className='p-2 border-b-2 bg-slate-50/10 focus:bg-gradient-to-b from-slate-50/0 to-yellow-500/10 w-full md:w-[300px] lg:w-[400px] md:h-10 lg:h-14 outline-none focus:border-yellow-300'/>
            <input className='p-2 border-b-2 bg-slate-50/10 focus:bg-gradient-to-b from-slate-50/0 to-yellow-500/10  w-full md:w-[300px] lg:w-[400px] md:h-10 lg:h-14 outline-none focus:border-yellow-300'/>
            <button>Let's get started</button>
        </form>
    </div>
  )
}

export default RegisterForm