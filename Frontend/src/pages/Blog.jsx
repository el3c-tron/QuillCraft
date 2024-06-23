import React, { useEffect, useState } from 'react'
import { Footer, Header, Loader } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'sonner';
import parse from 'html-react-parser'

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


  const navigate = useNavigate();


  useEffect(() => {
    ;(async()=>{

      try {
        const response = await axios.get(`/api/v1/blog/getBlogById/${blogId}`);
  
        setBlog(response.data.data);
        setContent(response.data.data.content);
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

      axios.get(`/api/v1/user/getUserById/${blog.owner}`)
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

  return (loading) ? (<Loader />) : (
    <>
      <Header />
      <div>
        {blog.title}
        <br />
        {parse(content)}
        <br />
        {username}
        <br />
        {commentCount}
        <br />
        {
          comments?.map((comment) => (
            <div key={comment._id}>{comment.content}</div>
          ))
        }
        {likesCount}
        <br />
        {like === true ? "liked" : "notLiked"}
        {/* ::TODO : Handle Like Dislike, Handle post/delete comment, Bookmarked enable/disable*/}
      </div>
      <Footer />
    </>
  )
}

export default Blog