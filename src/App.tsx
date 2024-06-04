import { createBrowserRouter, RouterProvider } from "react-router-dom"
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
import MatchMate from "./routes/matchMate"




const router = createBrowserRouter([
  {
    path: "/",
    element: <StartScreen />,
  },
  {
    path: "loginSignup",
    element: (<LoginSignup />),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "createAccount",
    element: <CreateAccountStep />
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "profile",
    element: <Profile />
    },
  {
    path: "matchMate",
    element: <MatchMate />,
  },
  
  {
    path: "menu",
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

