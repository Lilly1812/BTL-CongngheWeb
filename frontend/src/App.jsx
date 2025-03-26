import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './components/sidebar'
import SanPham from './pages/sanpham'

function App() {

  return (
    <div className='flex'>
      <SideBar/>
      <SanPham/>
    </div>
  )
}

export default App
