import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {Toaster} from 'sonner'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {
  Blog, 
  BookmarkedBlogs, 
  ChangePassword, 
  EditBlog, 
  EditUserInfo, 
  Home, 
  LikedBlogs, 
  Login, 
  Post, 
  Profile, 
  Registration
} from './pages/index.js'
import AuthLayout from './authentication/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path:'/login',
        element: <Login />
      },
      {
        path: '/registration',
        element: <Registration />
      },
      {
        path: '/post',
        element:(
          <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>
        )
      },
      {
        path: '/likedBlogs',
        element:  (
          <AuthLayout authentication = {true}>
            <LikedBlogs />
          </AuthLayout>
        )
      },
      {
        path: '/bookmarkedBlogs',
        element: (
          <AuthLayout authentication = {true}>
            <BookmarkedBlogs />
          </AuthLayout>
        )
      },
      {
        path: '/blog/:blogId',
        element: (
          <AuthLayout authentication = {true}>
            <Blog />
          </AuthLayout>
        )
      },
      {
        path: '/editBlog/:blogId',
        element: (
          <AuthLayout authentication = {true}>
            <EditBlog />
          </AuthLayout>
        )
      },
      {
        path: '/userProfile/:userId',
        element: (
          <AuthLayout authentication = {true}>
            <Profile />
          </AuthLayout>
        )
      },
      {
        path: '/editUserInfo/:userId',
        element: (
          <AuthLayout authentication = {true}>
            <EditUserInfo />
          </AuthLayout>
        )
      },
      {
        path: '/changePassword/:userId',
        element: (
          <AuthLayout authentication = {true}>
            <ChangePassword />
          </AuthLayout>
        )
      }
    ]
  }
]) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position='bottom-center' closeButton/>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>,
)
