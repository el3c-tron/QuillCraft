import React, { useEffect, useState } from 'react'
import Like from '../Svgs/Like'
import Comment from '../Svgs/Comment'
import Star from '../Svgs/Star'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast} from 'sonner'
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser'


function BlogCard({heading, content, blogId, coverImage, ownerId}) {

    const [like, setLike] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [username, setUsername] = useState("username");
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    content = content.slice(0,150);
    content += " . . . .";

    useEffect(() => {
        axios.get(`/api/v1/user/getUserById/${ownerId}`)
            .then((response) => {
                setUsername(response.data.data.username);
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get(`/api/v1/blog/blogCommentsCount/${blogId}`)
            .then((response) => {
                setCommentCount(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
        
    }, [])

    useEffect(() => {

        axios.get(`/api/v1/blog/getBlogLikes/${blogId}`)
            .then((response) => {
                setLikeCount(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
        

        if(authStatus) {
            axios.get(`/api/v1/like/checkLike/${blogId}`)
                .then((response) => {
                    setLike(response.data.data.liked);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            setLike(false);
        }

    }, [like, authStatus])

    // if(authStatus) {
    //         axios.get(`/api/v1/like/checkLike/${blogId}`)
    //             .then((response) => {
    //                 console.log(response.data.data.liked);
    //                 setLike(response.data.data.liked);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             })
    //     }
    //     else {
    //         setLike(false);
    //     }

    const handleLike = () => {

        if(!authStatus) {
            toast.error("You need to login first");
            navigate('/login');
            return;
        }

        if(like) {
            axios.post(`/api/v1/like/disliked/${blogId}`)
                .then((response) => {
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
                    setLike(true);
                })
                .catch((error) => {
                    setLike(false);
                    console.log(error);
                })
        }

    }

    const handleBookmark = () => {
        if(!authStatus) {
            toast.error("You need to login first");
            navigate('/login');
            return;
        }

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

    return (
            <div className='w-[55vw] h-[35vh] flex shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)] rounded-lg mb-[10rem]'>
                <div className='w-[60%] h-full flex flex-col p-2'>
                    <div className='h-[16%] mt-2 pl-3'>
                        <p className='text-[1.7rem] max-w-[90%] truncate font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#F1D4D4] via-[#C060A1] to-[#8c14a4] w-fit'>
                            {heading}
                        </p>
                    </div>
                    <div className='w-fit h-fit p-1 pl-3'>
                        <p className='h-fit w-fit text-xs font-[Pacifico] tracking-widest text-[#80b3ff]'>
                            @{username}
                        </p>
                    </div>
                    <div className='mt-4 h-[30%]'>
                        <p className=' pl-3 font-[300] text-sm h-full pr-3 text-[#F1D4D4] text-wrap truncate ...'>
                            {parse(content)}
                        </p>
                    </div>
                    <div className='ml-3 mt-1 h-fit w-fit '>
                        <button className='text-sm h-full w-full text-transparent bg-clip-text bg-gradient-to-r from-[#F1D4D4] via-[#C060A1] to-[#8c14a4]'>
                            read more
                        </button>
                    </div>
                    <div className='mt-2 flex h-[18%] items-center justify-around'>
                        <div onClick={handleLike} className={` stroke-[#ff0000] ${(like) ? 'fill-[#ff0000] stroke-none' : 'fill-none'} stroke-1 h-fit w-fit cursor-pointer flex`}>
                            <Like />
                            <p className='pl-3'>
                                {likeCount}
                            </p>
                        </div>
                        <div onClick={handleBookmark} className={`stroke-[#ffff00] ${(bookmarked) ? 'fill-[#ffff00] stroke-none' : "fill-none"}  stroke-1 h-fit w-fit cursor-pointer`}>
                            <Star />
                        </div>
                        <div className='stroke-[#0099ff] fill-none stroke-1 h-fit w-fit cursor-pointer flex'>
                            <Comment />
                            <p className='pl-3'>
                                {commentCount}
                            </p>
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