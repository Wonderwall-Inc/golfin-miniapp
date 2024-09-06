import { navLinks } from '../../constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CurrentSelectionImage from '../../assets/images/02_earn_menu_icon_selection.png'
import './Footer.css'

const Footer = () => {
    const location = useLocation()
    const nav = useNavigate()

    return (
        <nav className='footer-navs'>
            <div className='links flex:md:flex-row px-10 bg-[#8cc73e] pb-1'>
                {navLinks.map((nav, index) => {
                    return (
                        <div key={index} className='scale-150 bg-[#8cc73e]'>
                            <Link to={nav.url}>{nav.icon}</Link>
                            {location.pathname == nav.url && <img src={CurrentSelectionImage} width='40px' height='1px' className='' />}
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}

export default Footer