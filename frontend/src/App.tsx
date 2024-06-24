import { Routes, Route , BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ChatBox from "./components/ChatBox";
import useCheckAuth from "./hooks/useCheckAuth";
import ChatUI from "./pages/ChatUI";

function App() {
  const { isAuthenticated , loading , error , userData } = useCheckAuth()

  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route index element={<Home/>} />
        <Route path="/register" element={<Register/>}  /> 
        <Route path="/login" element={<Login/>}  /> 
        <Route path="/chat" element={<ChatUI user={userData} />}  /> 
       </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
