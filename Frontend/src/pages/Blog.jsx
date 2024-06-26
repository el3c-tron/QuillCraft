import React, { useEffect, useState } from 'react'
import { Comments, Footer, Header, Loader } from '../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'sonner';
import parse from 'html-react-parser'
import Like from '../components/Svgs/Like';
import Bookmark from '../components/Svgs/Bookmark';
import Star from '../components/Svgs/Star';
import { useSelector } from 'react-redux';
import Delete from '../components/Svgs/Delete';
import Edit from '../components/Svgs/Edit';

function Blog() {

  const [loading, setLoading] = useState(true);
  const {blogId} = useParams();
  const [blog, setBlog] = useState({});
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("username");
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [like, setLike] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [fullTimeInfo, setFullTimeInfo] = useState("");

  const userData = useSelector((state) => state.auth.userData);


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
  }, [like])

  useEffect(() => {
    axios.get(`/api/v1/bookmark/checkBookmark/${blogId}`)
        .then((response) => {
          setBookmarked(response.data.data.bookmarked)
        })
        .catch((error) => {
          console.log(error);
        })
  }, [bookmarked])

  const handleLike = () => {
    if(like) {
        axios.post(`/api/v1/like/disliked/${blogId}`)
            .then((response) => {
                setLikesCount((prev) => (prev-1));
                setLike(false);
            })
            .catch((error) => {
                setLike(true);
                console.log(error);
            })
    }
    else {
        axios.post(`/api/v1/like/liked/${blogId}`)
            .then((response) => {
                setLikesCount((prev) => (prev+1));
                setLike(true);
            })
            .catch((error) => {
                setLike(false);
                console.log(error);
            })
    }

  }

  const handleBookmark = () => {
    if(bookmarked) {
        axios.post(`/api/v1/bookmark/bookmarkDisable/${blogId}`)
            .then((response) => {
                setBookmarked(false);
            })
            .catch((error) => {
                setBookmarked(true);
                console.log(error);
            })
    }
    else {
        axios.post(`/api/v1/bookmark/bookmarkEnable/${blogId}`)
            .then((response) => {
                setBookmarked(true)
            })
            .catch((error) => {
                setBookmarked(false)
                console.log(error);
            })
    }
  }

  const handlePostComment = (e) => {

    e.preventDefault()

    if(commentContent === "") {
      toast.error("Comment Content Required !!");
      return;
    }

    const data = {
      'content' : commentContent
    }

    axios.post(`/api/v1/comment/postComment/${blogId}`, data)
      .then((response) => {
        toast.success('Comment Posted Successfully');
        setCommentCount((prev) => (prev+1));
        setCommentContent("");
      })
      .catch((error) => {
        toast.error("Cannot Post Comment !!")
        console.log(error);
      })
  }

  const handleDeleteComment = (e) => {
    e.preventDefault()
    axios.post(`/api/v1/comment/deleteComment/${blogId}`)
      .then((response) => {
        toast.success('Comment Deleted Successfully');
        setCommentCount((prev) => (prev-1));
      })
      .catch((error) => {
        toast.error("Cannot Delete Comment !!")
        console.log(error);
      })
  }

  const handleBlogDelete = (e) => {

    e.preventDefault();

    axios.post(`/api/v1/blog/deleteBlog/${blogId}`)
      .then((response) => {
        toast.success("Blog Deleted Successfully");
        navigate('/');
      })
      .catch((error) => {
        toast.error("Blog Deletion Failed !!");
        console.log(error);
      })

      return ;
  }


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

        <div className='mt-10 p-2 w-full flex justify-between'>

          <div className='flex w-fit'>
          
            <div className='pt-2 pb-2 w-fit'>
              <button onClick={handleLike} className='flex pt-2 pb-2 pl-4 pr-4 rounded-lg shadow-[0px_0px_10px_5px_rgba(12,12,12,.3)] hover:shadow-[0px_0px_5px_5px_rgba(0,0,0,.01)] transition-all ease-in-out duration-500'>
                <div className={`stroke-[#ff0000] stroke-2 ${like ? 'fill-[#ff0000] ' : 'fill-none'}`}>
                  <Like />
                </div>
                <span className='tracking-widest text-[0.94rem] ml-2 '>
                  {likesCount}
                </span>
              </button>
            </div>

            <div className='p-2 w-fit'>
              <button onClick={handleBookmark} className='flex p-2 rounded-lg shadow-[0px_0px_10px_5px_rgba(12,12,12,.3)] hover:shadow-[0px_0px_5px_5px_rgba(0,0,0,.01)] transition-all ease-in-out duration-500'>
                <div className={`stroke-[#ffff00] stroke-2 ${bookmarked ? 'fill-[#ffff00] ' : 'fill-none'}`}>
                  <Star />
                </div>
              </button>
            </div>

          </div>

          {
            (userData._id === blog.owner) ? (
              <div className='flex'>

                <div className='pt-2 pb-2 w-fit mr-2'>
                  <Link to={`/editBlog/${blogId}`}>
                    <button className='flex pt-2 pb-2 pl-4 pr-4 rounded-lg shadow-[0px_0px_10px_5px_rgba(12,12,12,.3)] hover:shadow-[0px_0px_5px_5px_rgba(0,0,0,.01)] transition-all ease-in-out duration-500'>
                      <div className='stroke-1 stroke-white'>
                        <Edit />
                      </div>
                      <span className='tracking-widest text-[.9rem] ml-2'>
                        Edit
                      </span>
                    </button>
                  </Link>
                </div>

                <div className='pt-2 pb-2 w-fit ml-4'>
                  <button onClick={handleBlogDelete} className='bg-[#ff0000] hover:bg-[#ff0000d9] flex pt-2 pb-2 pl-4 pr-4 rounded-lg shadow-[0px_0px_10px_5px_rgba(12,12,12,.3)] hover:shadow-[0px_0px_5px_5px_rgba(0,0,0,.01)] transition-all ease-in-out duration-500'>
                    <div className='stroke-[1.5] stroke-white'>
                      <Delete />
                    </div>
                    <span className='tracking-widest text-[.9rem] ml-2 font-semibold'>
                      Delete
                    </span>
                  </button>
                </div>

              </div>
            ) : (
              <></>
            )
          }

        </div>

        <div className='flex-col w-full p-2 mt-10'>

          <div className='w-full flex pt-2 pb-2 justify-center'>
            <input
              type='text'
              placeholder='COMMENT'
              className='p-3 pl-4 w-[85%] outline-none rounded-md shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] bg-[#1a1a1a] placeholder:opacity-30 placeholder:font-[400] placeholder:tracking-widest'
              value={commentContent}
              onChange={(e) => (setCommentContent(e.target.value))}
            />

            <button
              onClick={handlePostComment}
              className='shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] w-[15%] ml-10 p-2 rounded-md bg-gradient-to-r from-[#f3d8d8] via-[#c56da9] to-[#9b16b6]'
            >
              POST
            </button>
          </div>

        </div>

        <div className='w-full mt-8 p-2'>

          {
            comments?.map((comment) => (
              <div 
                key={comment._id}
                className='mt-2 flex justify-between p-3 shadow-[0px_0px_10px_5px_rgba(0,0,0,.01)]'
              >
                <Comments 
                  content={comment.content}
                  blogId={comment.blog}
                  owner={comment.owner}
                  createdAt = {comment.createdAt}
                  blogOwner = {blog.owner}
                />

                {
                  (comment.owner === userData._id) ? (
                    <>
                      <div className='flex items-center justify-center w-[10%]'>
                        <button
                          onClick={handleDeleteComment} 
                          className='stroke-[1] stroke-[#404040] hover:stroke-[1.5] hover:stroke-[#ff0000] hover:drop-shadow-[0_0px_0.5px_rgba(255,0,0,.5)] transition-all ease-in-out duration-300'
                        >
                          <Delete />
                        </button>
                      </div>
                    </>
                  ) : (<></>)
                }
              </div>
            ))
          }

        </div>

      </div>
      
      <Footer />
    </>
  )
}

export default Blog