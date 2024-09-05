import React from 'react'
import { navLinks } from '../../constants'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <nav className='footer-navs gap-[67px] w-[393px] border-t-2 h-[84px]'>
            <div className='links flex flex:md:flex-row justify-between bottom-0 right-0 sticky h-[49px] px-10 py-[7px] pt-[90px]'>

                {navLinks.map((nav, index) => {
                    return (
                        <div key={index} className='scale-125'>
                            <Link to={nav.url}>{nav.icon}</Link>
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}

export default Footer