import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import MainSection from './components/MainSection/MainSection'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import DetailPage from './pages/DetailPage';




function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={isHome ? "home-background" : "main-background"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        
        <Route path="/main/:category" element={<MainSection />} />
        
         <Route path="/details/:type/:id" element={<DetailPage />} />
        
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;