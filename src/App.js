
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
//* PAGES
import Home from "./pages/Home";
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';
import {Routes,Route} from "react-router-dom"
import {useState,useEffect} from "react";
import {data} from "./helper/data"


function App() {
  console.log(data);

  const [posts,setPosts] =useState(data)
  const [search,setSearch]=useState("")

  
  return (
    <div>
      <Header title="React blog"/>
      <Nav/>
     

      <Routes>
      <Route path="/" element={<Home/>} data={data}/>
      <Route path="/post" element={ < NewPost/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/post/:id" element={<PostPage/>}/>
      <Route path="*" element={<Missing/>}/>
     </Routes>

     <Footer/>

    </div>
  );
}

export default App;
