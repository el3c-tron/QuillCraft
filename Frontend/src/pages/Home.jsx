import React, { useEffect, useState } from 'react'
import { BlogCard, Footer, Header, Loader } from '../components'
import axios from 'axios'
import { toast } from 'sonner'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{

    axios.get('/api/v1/blog/getAllBlogs')
    .then((response) => {
      setBlogs(response.data.data);
    })
    .catch((error) => {
      toast.error("Failed To Fetch Blogs");
      console.log(error);
    })

  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 500)

  return loading ? (<Loader />) : (
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
              ownerId={blog.owner}
            />
          ))
        }

      </div>

      <Footer />
    </>
  )
}

export default Home