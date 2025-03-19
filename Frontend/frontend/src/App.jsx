import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, Router, RouterProvider  } from 'react-router-dom'
import Home from './Pages/HomePage'
import Login from './Pages/LoginPage'
import Protected from './Features/auths/Protected'
import FutureContest from './Features/FContest/FutureContest'
import PastContests from './Features/PastContest/CodeforcesPastContest'
import Detail from './Features/ContestDetail/Detail'
import AddContest from './Features/admin/AdminAdd'
import AddedContests from './Features/AllContests/displayContest'

const router = createBrowserRouter([
  { 
    path:"/",
    element:<Protected><Home></Home></Protected>
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/futureContest/:id",
    element: <FutureContest></FutureContest>
  },
  {
    path:"/pastContest/:id",
    element: <Detail></Detail>
  }
  ,
  {
    path:"/admin",
    element: <AddContest></AddContest>
  }
  ,
  {
    path:"/contestsAndLink",
    element: <AddedContests></AddedContests>
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
