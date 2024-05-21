import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./component/Login";
import SignUp from "./component/SignUp"
import NavBar from "./component/NavBar";
import Home from "./component/Home"
import Private from "./component/Private"
import Post from './component/Post';
import SellerPost from './component/SellerPost';
import EditPost from './component/EditPost';
import InterestedPost from './component/InterestedPost';


function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes >
          <Route element={<Private />}>
            <Route path="/" element={<Home />}/>
            <Route path="/post" element={<Post />} />
            <Route path="/viewPost" element={<SellerPost />} />
            <Route path="/post/:postId" element={<InterestedPost />} />
            <Route path="/editPost/:postId" element={<EditPost />} />
          </Route>
          <Route path="/login" element={<Login />}/>
          <Route path="/signUp" element={<SignUp />}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


