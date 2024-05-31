import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"
import StartScreen from "./routes/startScreen"
import LoginSignup from "./routes/loginSignup"
import Login from "./components/login"
import Menu from "./routes/menu"
import CreateAccountStep from "./routes/createAccount"
import Matching from "./routes/matching"



const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
      path: "",
      element: <Home />,
      },
      {
      path: "profile",
      element: <Profile />
      }
    ]
  },
  {
    path: "start",
    element: <StartScreen />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "Matching",
    element: <Matching />,
  },
  {
    path: "/loginSignup",
    element: (<LoginSignup />),
  },
  {
    path: "/createAccount",
    element: <CreateAccountStep />
  },
  {
    path: "/menu",
    element: <Menu />
  }
])

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const init = async () => {
    await auth.authStateReady()
    setIsLoading(false)
  }
  useEffect(() => {
    init()
  }, [])
  return (
  <div>
    {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
  </div>
  )
}

export default App

