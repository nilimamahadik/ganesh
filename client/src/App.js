import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import AdminLogin from "./Admin/signin";
import AdminSignUp from "./Admin/signup";
import HomePage from "./Homepage";
import UserLogin from "./User/signin";
import UserSignUp from "./User/signup";
import UserList from "./Admin/alluser";
import FormExample from "./common/form"
import Poster from "./common/poster"
import App from './Homepage';
import FormExampleAdmin from './common/form2';
import Drawer from './common/drawer';
// import { ExportToExcel } from './Admin/csv';
import Sheet from './common/excel';




const router = createBrowserRouter(


  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/userlogin",
      element: < UserLogin />,
    },
    {
      path: "/adminlogin",
      element: <AdminLogin />,
    },
    {
      path: "/adminsignup",
      element: <AdminSignUp />,
    },
    {
      path: "/form/:id",
      element: < FormExample />,
    },
    {
      path: "/userlist",
      element: <UserList />,
    },
    {
      path: "/usersignup",
      element: < UserSignUp />,
    },

    {
      path: "/poster/:id",
      element: < Poster />,
    },
    {
      path: "/form/admin/:id",
      element: < FormExampleAdmin />,
    },
    {
      path: "/csv/:id",
      element: < Sheet />,
    }





  ]

);


export default router;

