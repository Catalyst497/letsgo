import React from 'react'
import { TailSpin } from 'react-loader-spinner'

function LoadingPage() {
  return (
    <div className='flex justify-center items-center h-screen'><TailSpin size={32} /></div>
  )
}

export default LoadingPage