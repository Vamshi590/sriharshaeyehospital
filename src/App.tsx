import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  Navbar  from "./components/navigation"
import { Footer } from "./components/footer"
import Home from "./pages/home"
import Services from "./pages/services"
import Doctors from "./pages/doctors"
import Appointment from "./pages/appointment"
import Testimonials from "./pages/testimonials"
import Gallery from "./pages/gallery"
import Contact from "./pages/contact"

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/gallery" element={<Gallery />} /> 
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}
