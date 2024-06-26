import React, { useState } from 'react'
import {Editor} from '@tinymce/tinymce-react'
import parse from 'html-react-parser';
import FileInput from '../Svgs/FileInput';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Svgs/Spinner.jsx'

function PostForm({blog}) {

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState((blog) ? blog.content : "");
    const [imageFile, setImageFile] = useState((blog) ? blog.coverImage : "");
    const [title, setTitle] = useState((blog) ? blog.title : "");
    const defaultValue = (blog) ? blog.content : "";
    const navigate = useNavigate();

    const postBlog = () => {

        setLoading((prev) => !prev);
        if(!title) {
            toast.error("Title is required");
            setLoading(false);
            return;
        }

        else if(!content) {
            toast.error("Content is required");
            setLoading(false);
            return;
        }

        else if(!imageFile) {
            toast.error("Cover Image is required");
            setLoading(false);
            return;
        }

        const formData = new FormData();

        formData.append('coverImage', imageFile);
        formData.append('title', title);
        formData.append('content', content);

        if(blog) {
            toast.info("Updating Blog Please Wait");


            axios.post(`/api/v1/blog/editBlog/${blog._id}`, formData)
                .then((response) => {
                    const updatedBlogData = response.data.data;
                    console.log(updatedBlogData);
                    toast.success("Blog Edited Successfully");
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Error while Updating Blog !!")
                })
                // .finally(setLoading(false))

            return;

        }
        else {
            toast.info("Posting Blog Please Wait");

            axios.post('/api/v1/blog/createNewBlog', formData)
                .then((response) => {
                    const BlogData = response.data.data;
                    console.log(BlogData);
                    toast.success("Blog Created Successfully");
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Error while Creating Blog !!")
                })
                // .finally(setLoading(false))
        }
    }

    return (
        <>
            
            <div className=' border-white flex flex-col items-center h-auto w-[100%] mt-10 pt-4 pb-4 justify-center'>

                <div className='border-2 mt-[2rem] h-[60px] w-[75%] rounded-lg text-[#121212]'>
                    <input 
                        type='text'
                        className='h-full w-full outline-none rounded-lg pl-4 font-semibold placeholder:tracking-widest'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>


                <div className='mt-[4rem]'>

                    <label htmlFor='file' className='flex flex-col justify-center w-[250px] h-[190px]  border-dashed border-2 border-[#fff] items-center text-center p-[5px] color-[#1a1a1a] cursor-pointer'>
                        <FileInput />
                        <p className='pt-6 w-full truncate ...'>{(imageFile === "") ? 'drag and drop your file here or click to select a file!' : (imageFile.name) ? (imageFile.name) : (imageFile)}</p>
                        
                    </label>

                    <input 
                        type = 'file'
                        id='file'
                        className='max-w-[190px] hidden'
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    
                </div>

                <div className='mt-[4rem]'>
                    <Editor
                        apiKey='yem7l552lk4l7pi3uu2w6o1m4wzqqehxkmwwciho7uqt2gzg'
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Poppins,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={
                            (newValue , editor) => {
                                setContent(newValue);
                            }
                        }
                    />
                </div>

                <div className='rounded-md tracking-widest font-[400] w-[75%] h-[50px] flex mt-[4rem] mb-[4rem] justify-center shadow-[0px_0px_10px_5px_rgba(0,0,0,0.2)]'>
                    {
                        (loading) ? (
                        <div className='w-full h-full flex justify-center items-center bg-gradient-to-r from-[#f3d8d8] via-[#c56da9] to-[#9b16b6] rounded-md'>
                            <Spinner />
                        </div>
                    
                    ) : (

                            <button 
                                className='rounded-md w-full h-full bg-gradient-to-r from-[#f3d8d8] via-[#c56da9] to-[#9b16b6]'
                                onClick={postBlog}
                                disabled = {loading}
                            >
                                {(blog) ? "UPDATE" : "POST"}
                            </button>
                        )
                    }
                    
                    
                    
                </div>

                
            </div>

            
        </>
    )
}

export default PostForm