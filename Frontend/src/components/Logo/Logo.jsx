import React from 'react'

function Logo({size}) {
  
  const sizeVarient = {
    big: 'text-[40px]',
    small: 'text-[20px]'
  }

  return (
    <>

      <p className={`${sizeVarient[size]} text-[#F1D4D4] font-semibold`}>Quill </p>
      
      <p className={`${sizeVarient[size]} font-['Pacifico'] text-transparent bg-clip-text bg-gradient-to-r from-[#F1D4D4] via-[#C060A1] to-[#8c14a4]`}>
          Craft.
      </p>

    </>
  )
}

export default Logo