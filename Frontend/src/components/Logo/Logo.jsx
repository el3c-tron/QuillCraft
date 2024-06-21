import React from 'react'

function Logo({size}) {
  return (
    <>

      <p className={` text-[${size}px] text-[#F1D4D4] font-semibold `}>Quill </p>
      
    <p className={`text-[${size}px] font-['Pacifico'] text-transparent bg-clip-text bg-gradient-to-r from-[#F1D4D4] via-[#C060A1] to-[#8c14a4]`}>
          Craft.
      </p>

    </>
  )
}

export default Logo