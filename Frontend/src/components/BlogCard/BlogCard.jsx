import React, { useEffect, useState } from 'react'
import Like from '../Svgs/Like'
import Comment from '../Svgs/Comment'
import Star from '../Svgs/Star'
import axios from 'axios';

function BlogCard({heading, content, blogId, coverImage}) {

  return (
        <div className='w-[55vw] h-[35vh] flex shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)] rounded-lg mb-[10rem]'>
            <div className='w-[60%] h-full flex flex-col p-2'>
                <div className='h-[20%] mt-2 pl-3'>
                    <p className='text-[1.7rem] max-w-[90%] truncate font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#F1D4D4] via-[#C060A1] to-[#8c14a4] w-fit'>
                        {heading}
                    </p>
                </div>
                <div className='mt-2 h-auto min-h-[60%] max-h-[60%]'>
                    <p className=' pl-3 font-[300] h-[80%] pr-3 text-[#F1D4D4] text-wrap truncate ...'>
                        {content}
                    </p>
                </div>
                <div className='mt-2 flex h-[20%] items-center justify-around'>
                    <div className='stroke-[#ff0000] fill-none stroke-1 h-fit w-fit cursor-pointer'>
                        <Like />
                    </div>
                    <div className='stroke-[#ffff00] fill-none stroke-1 h-fit w-fit cursor-pointer'>
                        <Star />
                    </div>
                    <div className='stroke-[#0099ff] fill-none stroke-1 h-fit w-fit cursor-pointer'>
                        <Comment />
                    </div>
                    
                </div>
            </div>
            <div className='w-[40%] h-full flex'>
                <img 
                  src={coverImage} 
                  alt="Pic" 
                  className='box opacity-50 blur-[2px] w-full h-full bg-no-repeat bg-center bg-cover rounded-lg'
                />
                <img 
                  src={coverImage} 
                  alt="Pic" 
                  className='scale-75 translate-x-[-21.1rem] bg-center bg-cover rounded-md bg-no-repeat'
                />
            </div>
        </div>
  )
}

export default BlogCard