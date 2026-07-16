import { Routes, Route } from "react-router-dom";
import Home from "./pages/public/home/Home";
import About from "./pages/public/about/About";
import Features from "./pages/public/features/Features";
import Layout from "./components/layout/Layout";
import HowItWorks from "./pages/public/howItWorks/HowItWorks";
function App() {
  return (
    <div >
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="features" element={<Features />} />
      <Route path="about" element={<About />} />
      <Route path="howItWorks" element={<HowItWorks />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;