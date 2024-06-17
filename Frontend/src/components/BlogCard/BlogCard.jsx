import React from 'react'
import Like from '../Svgs/Like'
import Comment from '../Svgs/Comment'
import Star from '../Svgs/Star'

function BlogCard() {
  return (
        <div className='w-[55vw] h-[35vh] flex shadow-[0px_0px_10px_5px_rgba(0,0,0,0.4)] rounded-lg'>
            <div className='w-[60%] h-full flex flex-col p-2'>
                <div className='h-[20%]'>
                    <p className='text-[2rem] pl-2 max-w-[90%] truncate font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#F1D4D4] via-[#C060A1] to-[#8c14a4] w-fit'>
                        Heading
                    </p>
                </div>
                <div className='mt-2 h-auto min-h-[60%] max-h-[60%]'>
                    <p className=' pl-2 font-[300] h-full text-[#F1D4D4] text-wrap truncate ...'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi iste eaque mollitia perferendis repellat, quia dignissimos veritatis esse ratione officiis natus! Laudantium rerum magnam placeat maiores! Mollitia dicta iure hic? Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolorem nam doloremque quae exercitationem quibusdam dicta quaerat animi? Incidunt nam quisquam quo exercitationem nesciunt nisi aut fugiat sapiente eveniet minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid esse enim, beatae tempora similique iusto aliquam maxime ab totam dolores, obcaecati maiores ratione? Temporibus perferendis non, expedita eius quos quod!
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
            <div className='w-[40%] h-full'>
                <img 
                  src="http://res.cloudinary.com/dzfs29rwu/image/upload/v1717610282/nszramjdhoeklkztpuql.jpg" 
                  alt="Pic" 
                  className='w-full h-full bg-no-repeat bg-center bg-cover p-2'
                />
            </div>
        </div>
  )
}

export default BlogCard