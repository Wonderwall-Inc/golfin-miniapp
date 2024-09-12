import { navLinks } from '../../constants'
import { Link, useLocation } from 'react-router-dom'
import './Footer.css'
import EarnIcon from '../EarnIcon'
import RankingIcon from '../RankingIcon'
import LinkIcon from '../LinkIcon'


const Footer = () => {
    const location = useLocation()
    return (
        <nav className='footer-navs'>
            <div className='links flex:md:flex-cols'>
                {navLinks.map((nav, index) => {
                    return (
                        <div key={index} className='link'>
                            <Link to={nav.url}>
                                {/* {nav.label == 'Home' && <EarnIcon color={`${location.pathname == nav.url ? '#8cc73e' : 'white'}`} />} */}
                                {nav.label == 'Demo Home' && <EarnIcon color={`${location.pathname == nav.url ? '#8cc73e' : 'white'}`} />}
                                {/* {nav.label == 'Ranking' && <RankingIcon color={`${location.pathname == nav.url ? '#8cc73e' : 'white'}`} />} */}
                                {nav.label == 'Demo Ranking' && <RankingIcon color={`${location.pathname == nav.url ? '#8cc73e' : 'white'}`} />}
                                {/* {nav.label == 'Links' && <LinkIcon color={`${location.pathname == nav.url ? '#8cc73e' : 'white'}`} />} */}
                                {nav.label == 'Demo Links' && <LinkIcon color={`${location.pathname == nav.url ? '#8cc73e' : 'white'}`} />}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}

export default Footer