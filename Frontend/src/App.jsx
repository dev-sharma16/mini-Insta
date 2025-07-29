import { useEffect } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useNavigate } from 'react-router-dom'
import Nav from './components/Nav'
import { useDispatch } from 'react-redux'
import {login} from "./store/authSlice"
import { useAuthCheck } from './CustomHook/AuthCheck'

function App() {
  useAuthCheck()

  return (
    <>
      <Nav/>
      <AppRoutes/>
    </>
  )
}

export default App
