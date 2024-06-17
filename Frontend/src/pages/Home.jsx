import React, { useEffect, useState } from 'react'
import { BlogCard, Header } from '../components'
import axios from 'axios'
import { toast } from 'sonner'

function Home() {

  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const likedBlogsIds = [];


  // axios.get('/api/v1/blog/getAllBlogs')
  //   .then((response) => {
  //     console.log(response);
  //     setBlogs(response.data.data);
  //   })
  //   .catch((error) => {
  //     toast.error("Failed To Fetch Blogs");
  //     console.log(error);
  //   });

  useEffect(() =>{

    axios.get('/api/v1/blog/getAllBlogs')
    .then((response) => {
      console.log(response);
      setBlogs(response.data.data);
    })
    .catch((error) => {
      toast.error("Failed To Fetch Blogs");
      console.log(error);
    });

  }, []);

  return (
    <>
      <Header />
      <div className='flex flex-col items-center h-auto w-full mt-[5rem] pt-8 pb-8'>
        
        {
          blogs?.map((blog) => (
            <BlogCard 
              key={blog._id}
              heading={blog.title}
              content={blog.content}
              blogId={blog._id}
              coverImage={blog.coverImage}
            />
          ))
        }
        

      </div>
    </>
  )
}

export default Home