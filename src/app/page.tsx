import Hero from './sections/Hero'
import Services from './sections/Services'
import About from './sections/About'
import Portfolio from './sections/Portfolio'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-navy text-white">
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}
