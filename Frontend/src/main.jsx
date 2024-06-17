import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {Toaster} from 'sonner'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {Blog, BookmarkedBlogs, EditBlog, Home, LikedBlogs, Login, Post, Registration} from './pages/index.js'


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
        element: <Post />
      },
      {
        path: '/likedBlogs',
        element: <LikedBlogs />
      },
      {
        path: '/bookmarkedBlogs',
        element: <BookmarkedBlogs />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/editBlog',
        element: <EditBlog />
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
