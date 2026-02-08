import React from 'react'

const loading = () => {
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-background flex items-center justify-center'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
    </div>
  )
}

export default loading