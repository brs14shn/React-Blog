
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
import {useNavigate} from "react-router-dom"
import {format} from "date-fns"


function App() {
  console.log(data);

  const [posts,setPosts] =useState(data)
  const [search,setSearch]=useState("")
  const [searchResult,setSearchResult] =useState([])
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate=useNavigate()

 const handleDelete=(id)=>{
  const postsList=posts.filter((post)=>post.id!==id)
  setPosts(postsList)
  navigate("/", { replace: true });
 }

const handleSubmit=(e)=>{
  e.preventDefault()
  const id=posts.length ? posts[posts.length-1].id+1 :1 ;
  const datetime=format(new Date(),"MMMM dd,yyyy pp");
  const newPost={id,title:postTitle,datetime,body:postBody}
  const allPost={...posts,newPost};
  setPosts(allPost)
  setPostTitle("")
  setPostBody("")
  navigate("/", { replace: true });
}

useEffect(()=>{
const filteredResults=posts.filter(post=>
((post.body).toLowerCase()).includes(search.toLowerCase()) ||
((post.title).toLowerCase()).includes(search.toLowerCase()));
setSearchResult(filteredResults.reverse())

},[posts,search])
  
  return (
    <div>
      <Header title="React blog"/>
      <Nav search={search} setSearch={setSearch} posts={searchResult}/ >
     

      <Routes>
      <Route path="/" element={<Home posts={searchResult}/>}/>
      <Route path="/post" element={ < NewPost
      handleSubmit={handleSubmit}
       postTitle={postTitle}
       setPostTitle={setPostTitle}
       postBody ={postBody}
       setPostBody={setPostBody}

       
       />}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
      <Route path="*" element={<Missing/>}/>
     </Routes>

     <Footer/>

    </div>
  );
}

export default App;
