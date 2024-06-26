import React, { useEffect, useState } from 'react'
import { Footer, Header, Loader, PostForm } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
    
    function EditBlog() {

      const {blogId} = useParams();
      const [blog, setBlog] = useState({});
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();

      useEffect(() => {
        ;(async()=>{

          try {
            const response = await axios.get(`/api/v1/blog/getBlogById/${blogId}`);
            
            console.log(response.data.data);
            setBlog(response.data.data);
            setLoading(false);

          } catch (error) {
            toast.error("Failed to Edit blog !!");
            setLoading(false);
            navigate(`/blog/${blogId}`);
            console.log(error);
          }

        })()
      }, []);

      return (loading) ? (<Loader />) : (
        <>
          <Header />
          <PostForm 
            blog={blog}
          />
          <Footer />
        </>
      )
    }
    
    export default EditBlog