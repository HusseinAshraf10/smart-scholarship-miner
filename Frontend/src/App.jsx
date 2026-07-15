import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx"
import Offers from "./pages/offers/Offers.jsx"
import Trips from "./pages/trips/Trips.jsx"
import Contact from "./pages/contact/Contact.jsx"
import Layout from "./components/layout/Layout.jsx"

function App() {
  return (
  <Routes> 
    <Route path="/" element={<Layout />}>
    <Route index  element={<Home />} />
    <Route path="trips" element={<Trips />} />
    <Route path="offers" element={<Offers />} />
    <Route path="contact" element={<Contact />} />
    </Route>
  </Routes>
  );
}

export default App;