import React from 'react'
import img from '@/commons/asset/images/scenery1.jpeg'
import SlidingUnlock from '@/components/SlidingUnlock'

function Test() {

  const handleClick = () => {
    alert(123)
  }
  return (
    <div>
      <img src={img} width={200} onClick={handleClick} />
      1111
      <SlidingUnlock onSuccess={() => { }} onFail={() => console.log('fail')}
      />
    </div>
  )
}

export default Test
