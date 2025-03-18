import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, Router, RouterProvider  } from 'react-router-dom'
import Home from './Pages/HomePage'
import Login from './Pages/LoginPage'
import Protected from './Features/auths/Protected'

const router = createBrowserRouter([
  { 
    path:"/",
    element:<Protected><Home></Home></Protected>
  },
  {
    path:"/login",
    element:<Login></Login>
  }
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      { <RouterProvider router={router}/>}
    </div>
  )
}

export default App
