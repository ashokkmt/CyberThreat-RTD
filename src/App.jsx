import './styles/App.css'
import Home from './components/Home.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Navebar from './components/Navebar.jsx';
import Footer from './components/Footer.jsx'
import Searchbar from './components/SearchBar.jsx';
import Projectpage from './components/ProjectPage.jsx';
import Commentpage from './components/Comment.jsx';
import FormPage from './components/FormPage.jsx';


function Homepage() {
  return (
    <>
      <Navebar />
      <Home />
      <Footer/>
    </>
  )
}

function Project() {
  return (
    <>
      <Navebar />
      <Projectpage/>
      <Footer/>
    </>
  )
}

function TestPage1() {
  return (
    <>
      <Navebar />
      <Searchbar/>
      <Footer/>
    </>
  )
}

function TestPage2() {
  return (
    <>
      <Navebar />
      <Commentpage/>
      <Footer/>
    </>
  )
}

function TestPage3() {
  return (
    <>
      <Navebar />
      <FormPage/>
      <Footer/>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Projects" element={<Project />} />
        <Route path="/Projects/Test1" element={<TestPage1 />} />
        <Route path="/Projects/Test2" element={<TestPage2 />} />
        <Route path="/Projects/Test3" element={<TestPage3 />} />
      </Routes>
    </BrowserRouter>
  )
}
