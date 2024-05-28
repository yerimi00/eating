import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"
import StartScreen from "./routes/startScreen"
import CreateAccount from "./components/createAccountOne"
import LoginSignup from "./routes/loginSignup"
import VerifyEmail from "./components/verifyEmail"
import Login from "./components/login"
import PersonalInfoForm from "./components/personalInfoForm"



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
    path: "verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "personalInfoForm",
    element: <PersonalInfoForm />,
  },
  {
    path: "/loginSignup",
    element: (<LoginSignup />),
  },
  {
    path: "/createAccount",
    element: <CreateAccount />
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

