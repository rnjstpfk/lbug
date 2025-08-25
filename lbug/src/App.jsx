import './App.css'
import Header from './components/Header'
import About from './components/About'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <About />
        <Gallery />
        <Contact />
      </main>
      <footer className="footer">
        <p>© 2025 Ladybug World. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
