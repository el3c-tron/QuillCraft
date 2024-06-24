import React, { useEffect, useState } from 'react'
import { Footer, Header, Loader } from '../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'sonner';
import parse from 'html-react-parser'
import Like from '../components/Svgs/Like';
import Bookmark from '../components/Svgs/Bookmark';
import Star from '../components/Svgs/Star';

function Blog() {

  const [loading, setLoading] = useState(true);
  const {blogId} = useParams();
  const [blog, setBlog] = useState({});
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("username");
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [like, setLike] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [fullTimeInfo, setFullTimeInfo] = useState("");


  const navigate = useNavigate();


  useEffect(() => {
    ;(async()=>{

      try {
        const response = await axios.get(`/api/v1/blog/getBlogById/${blogId}`);
  
        setBlog(response.data.data);
        setContent(response.data.data.content);
        setFullTimeInfo(response.data.data.updatedAt);
        setLoading(false);

      } catch (error) {
        toast.error("Failed to fetch blog");
        setLoading(false);
        navigate('/');
        console.log(error);
      }

    })()
  }, []);

  useEffect(()=>{
    setLoading(true);

    try {

      const userId = blog.owner;

      if(userId) {
        axios.get(`/api/v1/user/getUserById/${userId}`)
        .then((response) => {

          if(response) {
            setUsername(response.data.data.username);
            setLoading(false);
            
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        })

      }

      
      
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  }, [blog]);

  useEffect(() => {
    
    axios.get(`/api/v1/blog/blogComments/${blogId}`)
      .then((response) => {
        setComments(response.data.data);
        setCommentCount(response.data.data.length);
      })

  }, [commentCount])

  useEffect(() => {
    axios.get(`/api/v1/blog/getBlogLikes/${blogId}`)
      .then((response) => {
        setLikesCount(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`/api/v1/like/checkLike/${blogId}`)
      .then((response) => {
        setLike(response.data.data.liked);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/v1/bookmark/checkBookmark/${blogId}`)
        .then((response) => {
          setBookmarked(response.data.data.bookmarked)
        })
        .catch((error) => {
          console.log(error);
        })
    }, [])


  const updationDate = parseInt(fullTimeInfo.substring(8,10));
  const updationMonth = parseInt(fullTimeInfo.substring(5,7));
  const updationYear = parseInt(fullTimeInfo.substring(0,4));
  const updationHour = parseInt(fullTimeInfo.substring(11,13));
  const updationMinute = parseInt(fullTimeInfo.substring(14,16));
  const updationSecond = parseInt(fullTimeInfo.substring(17,19));

  const date = new Date();
  const currentDate = date.getUTCDate();
  const currentMonth = date.getUTCMonth() + 1;
  const currentYear = date.getUTCFullYear();
  const currentHour = date.getUTCHours();
  const currentMinute = date.getUTCMinutes();
  const currentSecond = date.getUTCSeconds();

  let time;   

  if (currentYear - updationYear !== 0) time = currentYear - updationYear + ' years';
  else if(currentMonth - updationMonth !== 0) time = currentMonth - updationMonth + ' months';
  else if(currentDate - updationDate !== 0) time = currentDate - updationDate + ' days';
  else if(currentHour - updationHour !== 0) time = currentHour - updationHour + ' hours';
  else if(currentMinute - updationMinute !== 0) time = currentMinute - updationMinute + ' minutes';
  else time = currentSecond - updationSecond + ' seconds';

  return (loading) ? (<Loader />) : (
    <>
      <Header />

      <div className='p-4 w-[100%] flex flex-col mt-10'>

        <div className='p-2 w-full flex justify-center mt-10'>
          <p className='w-fit tracking-widest font-[600] p-2 text-[1.5rem] text-[#f5e0e0]'>
            {blog.title}
          </p>
        </div>

        <div className='mt-10 p-2 w-full flex justify-center'>
          <img 
            src={blog.coverImage} 
            alt="coverImage" 
            className='w-[100%] blur-[4px] max-h-[500px] rounded-lg relative opacity-60'
          />
          <img 
            src={blog.coverImage}
            alt='coverImage'
            className='max-h-[500px] rounded-lg absolute left-[50%] translate-x-[-50%] bg-no-repeat bg-center bg-cover'
          />
        </div>

        <div className='mt-10 p-2 w-full flex'>
          <div className='text-[.9rem] text-[#f5e0e0] tracking-wider font-[300]'>
            {parse(content)}
          </div>
        </div>

        <div className='mt-10 p-2 w-full flex justify-between'>
          <div>
            <Link to={`/userProfile/${blog.owner}`}>
              <p className='tracking-widest font-[400]  text-[0.8rem]'>written by 
                <span className='text-[0.8rem] font-[Pacifico] tracking-widest text-[#80b3ff] cursor-pointer'> @{username}</span> 
              </p>
            </Link>
          </div>

          <div>
            <p className='text-[.8rem] opacity-50 tracking-widest font-[200]'>updated {time} ago</p>
          </div>
        </div>

      </div>
      
      <Footer />
    </>
  )
}

export default Blog