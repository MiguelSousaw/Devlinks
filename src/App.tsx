import { createBrowserRouter } from "react-router-dom";
import {Home} from './pages/Home'
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { Networks } from "./pages/Admin/Acesso";
import { Private } from "./routes/Private";
import { Error } from "./pages/NotFound"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
     path: '/Login',
     element: <Login/>
  }, 
  {
    path: '/Admin',
    element: <Private><Admin/></Private>
  },
  {
     path: '/Admin/Acesso',
    element: <Private><Networks/></Private>
  }, 
  {
    path: '*',
    element: <Error/>
  }
])

export {router}