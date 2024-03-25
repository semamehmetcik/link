import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserLayout from '../layouts/user-layout';
import ContactPage from '../pages/contact-page';
import LoginPage from '../pages/login-page';
import EventsPage from '../pages/events-page';

import CoursesPage from '../pages/courses-page';
import AboutPage from '../pages/about-page';





const router = createBrowserRouter([
    {
        path:"/",
        element: <UserLayout/>,
        children:[
            {
                index: true, 
                element: <>HomePage</>,
            },

            {   
                path:"contact",
                element:<ContactPage/>
            },
            {   
                path:"about",
                element:<AboutPage/>
            },
            {   
                path:"courses",
                element:<CoursesPage/>
            },
            {   
                path:"events",
                element:<EventsPage/>
            },



            {   
                path:"login",
                element:<LoginPage/>
            }
        ]
    }
]);

const AppRouter = () => {
  return <RouterProvider router={router}/>;
      
    
  
};

export default AppRouter;