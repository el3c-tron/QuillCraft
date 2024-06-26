import React, { useEffect, useState } from 'react'
import { BlogCard, Footer, Header, Loader } from '../components'
import axios from 'axios';
import { useSelector } from 'react-redux';

function LikedBlogs() {

  const [likedBlogs, setLikedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const likeChange = useSelector((state) => state.auth.tempLikes );

  useEffect(() => {


    axios.get('/api/v1/user/getUserLikedBlogs')
      .then((response) => {
        setLikedBlogs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })

  }, [likeChange])

  return (loading) ? (<Loader />) : ( (likedBlogs.length > 0) ? (
  
    <>

      <Header />
      <div className='flex flex-col items-center h-auto w-full mt-[5rem] pt-8 pb-8'>
        {
          likedBlogs.map((blog) => (
            <BlogCard 
              key={blog._id}
              heading={blog.title}
              content={blog.content}
              blogId={blog._id}
              coverImage={blog.coverImage}
              ownerId={blog.owner}
            />
          ))
        }
      </div>
      <Footer />

    </>

  ) : (
    <>
      <Header />

      <div className='flex justify-center items-center flex-col mt-20'>
        <img
          src='../../public/documents-dark.png'
          className='bg-cover bg-no-repeat bg-center w-[500px] h-[300px]'
        />
        <span className='mt-10 mb-20 tracking-widest text-[2rem] font-semibold'>try Liking Blog</span>
      </div>

      <Footer />
    </>
  ) )
}

export default LikedBlogs