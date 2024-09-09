import React from 'react'
import { TailSpin } from 'react-loader-spinner'

function LoadingPage() {
  return (
    <div className='flex justify-center items-center'><TailSpin size={32} /></div>
  )
}

export default LoadingPage