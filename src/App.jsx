import './App.css'
import Navbar from './components/navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Coin from './pages/Coin'
import Footer from './components/Footer'

function App() {

  return (
    <div className='min-h-[100vh] bg-gradient-to-b from-[#0D1421] via-[#17171a] to-[#171924]'>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/coin/:coinId' element={<Coin/>} />
        </Routes>
        <Footer />
      </div>
    </div>
  )


}

export default App
