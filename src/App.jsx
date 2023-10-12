import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Login from './components/Login'
import Home from "./components/Home"
import { useEffect } from "react";
import { getArticles } from "./store/Slices/articleSlice";
import { getuserData } from "./store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
//import Header from "./components/Header"
function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getArticles());
    dispatch(getuserData());  
      if(user){
     navigate("/home");
   }
 },[])
  return (
    <>
      <div className="App">

        
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      </Routes>
      </div>

    </>
  )
}

export default App
