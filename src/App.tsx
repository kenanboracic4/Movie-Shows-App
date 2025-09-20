import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import MainSection from './components/MainSection/MainSection'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
 

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/main/*" element={<MainSection />} />


      </Routes>
    </Router>
  )
}

export default App
