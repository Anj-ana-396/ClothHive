import React from 'react'
import Header from "../Common/Header.jsx"
import Footer from "../Common/Footer.jsx"
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
    return (
        <>
            {/* Header */}
            <Header />


            {/* MainContent */}
            <main>
                <Outlet />
            </main>



            {/* Footer */}
            <Footer />
        </>
    )
}

export default UserLayout
