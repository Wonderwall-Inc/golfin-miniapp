import { navLinks } from '../../constants'
import { Link, useLocation } from 'react-router-dom'
import './Footer.css'
import EarnIcon from '../EarnIcon'
import RankingIcon from '../RankingIcon'
import LinkIcon from '../LinkIcon'
import ProfileIcon from '../ProfileIcon'


const Footer = () => {
    const location = useLocation()
    return (
        <nav className='footer-navs'>
            <div className='links flex:md:flex-cols'>
                {navLinks.map((nav, index) => {
                    return (
                        <div key={index} className='link'>
                            <Link to={nav.url}>
                                {nav.label == 'Demo Home' && <EarnIcon color={`${location.pathname == nav.url ? '#8ADD5D' : 'white'}`} />}
                                {nav.label == 'Demo Ranking' && <RankingIcon color={`${location.pathname == nav.url ? '#8ADD5D' : 'white'}`} />}
                                {nav.label == 'Demo Links' && <LinkIcon color={`${location.pathname == nav.url ? '#8ADD5D' : 'white'}`} />}
                                {nav.label == 'Demo Profile' && <ProfileIcon color={`${location.pathname == nav.url ? '#8ADD5D' : 'white'}`} />}
{/*                                 {nav.label == 'Demo Dev' && <LinkIcon color={`${location.pathname == nav.url ? '#8ADD5D' : 'gray'}`} />}
 */}                            </Link>
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}

export default Footer