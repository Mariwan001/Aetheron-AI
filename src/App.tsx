import About from "./sections/About"
import Blog from "./sections/Blog"
import Explanation from "./sections/Explanation"
import Faqs from "./sections/Faqs"
import Footer from "./sections/Footer"
import HeaderSection from "./sections/Header"


function App() {


  return (
    <>
      <div className=" h-[500vh] ">
        <HeaderSection />
        <About />
        <Explanation />
        <Blog />
        <Faqs />
        <Footer/>
      </div>
    </>
  )
}

export default App
