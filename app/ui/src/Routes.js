import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Login from './components/Forms/Login'

export const Router = createBrowserRouter([
    { path:'/' , element : <Login />}
])