import { useEffect } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

import AnimatedBackground from './components/AnimatedBackground'

function App() {
  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      
      {/* Hero Section with its unique background */}
      <section className="min-h-screen bg-background-light dark:bg-background-dark">
        <Hero />
      </section>

      {/* Content wrapper for all sections after Hero */}
      <div className="relative">
        {/* Optimized background for mobile - simpler gradient, no fixed positioning on small screens */}
        <div 
          className="absolute inset-0 bg-white dark:bg-gray-900 md:fixed"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            zIndex: -1
          }}
        />
        
        {/* Semi-transparent overlay - reduced opacity for better performance */}
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 md:bg-white/80 md:dark:bg-gray-900/80 md:fixed" style={{ zIndex: -1 }} />
        
        {/* Content container */}
        <div className="relative">
          <main>
            <section className="py-10">
              <About />
            </section>

            <section className="py-10">
              <Skills />
            </section>

            <section className="py-10">
              <Projects />
            </section>

            <section className="py-10">
              <Certifications />
            </section>

            <section className="py-10">
              <Education />
            </section>

            <section className="py-10">
              <Experience />
            </section>

            <section className="py-10 pb-20">
              <Contact />
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App