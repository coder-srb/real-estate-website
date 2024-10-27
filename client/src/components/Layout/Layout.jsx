import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from "react-router-dom"
import { BiPackage } from 'react-icons/bi'

const Layout = () => {
    return (
        <>
            <div style={{ background: "var(--black)", overflow: "hidden" }}>
                <Header />
                <Outlet />  {/*acts as children prop*/}
            </div>
            <Footer />
        </>
    )
}

export default Layout