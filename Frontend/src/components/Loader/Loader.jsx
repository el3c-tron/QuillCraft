import React from 'react'

function Loader() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>

      <div className="gap-x-2 flex ">
        <div className="w-3 bg-[#F1D4D4] animate-pulse h-3 rounded-lg"></div>
        <div className="w-3 animate-pulse h-3 bg-[#C060A1] rounded-lg"></div>
        <div className="w-3 h-3 animate-pulse bg-[#8c14a4] rounded-lg"></div>
      </div>

    </div>
  )
}

export default Loader