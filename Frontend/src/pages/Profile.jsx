import React, { useEffect, useState } from 'react'
import { BlogCard, Footer, Header, Loader, LogoutBtn, UserInfo } from '../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Edit from '../components/Svgs/Edit'
import Lock from '../components/Svgs/Lock'
import Avatar from '../components/Svgs/Avatar'
import axios from 'axios'
import { toast } from 'sonner'

function Profile() {

  const loggedInUser = useSelector((state) => state.auth.userData);
  const [loading , setLoading] = useState(true);
  const [userBlogs, setUserBlogs] = useState([]);
  const [user, setUser] = useState({});
  const {userId} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    
    axios.get(`/api/v1/user/getUserById/${userId}`)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        toast.error("Error while fetching userData !!");
        navigate('/');
        console.log(error);
      })

    axios.get(`/api/v1/user/getUserBlogsById/${userId}`)
      .then((response) => {
        setUserBlogs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error while fetching user blogs !!");
        console.log(error);
      })

  }, [userId])

  return (loading) ? <Loader /> : (
    <>
        <Header />

        <div className='w-full p-2 mt-10'>
          <div className='w-full p-2 flex justify-end'>
            
            {
              (loggedInUser._id === userId) ? (
                <>
                  <Link to={`/editUserInfo/${userId}`}>
                    <button className=' flex pt-2 pb-2 pl-4 pr-4 rounded-lg shadow-[0px_0px_10px_5px_rgba(12,12,12,.3)] hover:shadow-[0px_0px_5px_5px_rgba(0,0,0,.01)] transition-all ease-in-out duration-500'>
                      <div className='stroke-1 stroke-white'>
                        <Edit 
                          width={'20px'}
                          height={'20px'}
                        />
                      </div>
                      <span className='tracking-widest text-[.9rem] ml-2'>
                        Edit
                      </span>
                    </button>
                  </Link>

                  <Link to={`/changePassword/${userId}`}>
                    <button className='ml-4 flex pt-2 pb-2 pl-4 pr-4 rounded-lg shadow-[0px_0px_10px_5px_rgba(12,12,12,.3)] hover:shadow-[0px_0px_5px_5px_rgba(0,0,0,.01)] transition-all ease-in-out duration-500'>
                      <div className='stroke-2 stroke-white'>
                        <Lock />
                      </div>
                      <span className='tracking-widest text-[.9rem] ml-2'>
                        Change Password
                      </span>
                    </button>
                  </Link>

                  <div>
                    <LogoutBtn />
                  </div>
                </>
              ) : (<></>)
            }
            
          </div>

          <div className='p-2 mt-5 w-full flex justify-center items-center flex-col'>

            <div className=' max-h-[200px] max-w-[200px] rounded-lg'>
              {
                (user.avatar) ? (
                  <img 
                    src={user.avatar}
                    className='bg-cover bg-center bg-no-repeat rounded-md'
                  />
                ) : (
                  <Avatar 
                    height={'200px'}
                    width={'200px'}
                    fill={'#eedcdc'}
                  />
                )
              }
            </div>

            <div className='mt-5 flex flex-col justify-center items-center'>
              <span className='tracking-widest text-[1.5rem] font-bold'>{user.fullname}</span>
              <span className='text-[1.1rem] font-[Pacifico] tracking-widest text-[#80b3ff] cursor-pointer'> @{user.username}</span>
            </div>


          </div>

          <div className='flex flex-col items-center h-auto w-full mt-20'>
            {
              userBlogs.map((blog) => (
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

        </div>

        <Footer />
        
    </>
  )
}

export default Profile