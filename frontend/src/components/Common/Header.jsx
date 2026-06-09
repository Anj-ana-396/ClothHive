import React from 'react'
import Topbar from '../Layout/Topbar.jsx'
import Navbar from '../Common/Navbar.jsx'

const header = () => {
  return (
    <header className='border-b border-gray-200'>

      {/* Topbar */}
      <Topbar />


      {/* Navbar */}
      <Navbar />


      {/* CartDrawerFromSide */}

    </header>
  )
}

export default header
