import Cursor from './components/Cursor.tsx'
import Nav from './components/Nav.tsx'
import Hero from './components/Hero.tsx'
import Marquee from './components/Marquee.tsx'
import Story from './components/Story.tsx'
import Menu from './components/Menu.tsx'
import Experience from './components/Experience.tsx'
import Testimonials from './components/Testimonials.tsx'
import Location from './components/Location.tsx'
import Reserve from './components/Reserve.tsx'
import Newsletter from './components/NewsLetter.tsx'
import Footer from './components/Footer.tsx'

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Story />
      <Menu />
      <Experience />
      <Testimonials />
      <Location />
      <Reserve />
      <Newsletter />
      <Footer />
    </>
  )
}