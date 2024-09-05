import HomeNavIcon from '../assets/icons/Home.svg'
import LinksNavIcon from '../assets/icons/Links.svg'
import RankingNavIcon from '../assets/icons/Ranking.svg'
import InstagramIcon from '../assets/icons/Instagram.svg'
import XIcon from '../assets/icons/X.svg'
import GolfinWebsiteIcon from '../assets/icons/GolfinWebsite.svg'

const navLinks = [
    { label: 'Home', url: '/', icon: <HomeNavIcon /> },
    { label: 'Ranking', url: '/ranking', icon: <RankingNavIcon /> },
    { label: 'Links', url: '/links', icon: <LinksNavIcon /> },
]

const socialMediaLinks = [
    { label: 'Instagram', url: 'https://www.instagram.com/golfin_official/', icon: <InstagramIcon />, cto: 'Follow us on Instagram' },
    { label: 'X', url: 'https://x.com/GOLFIN_official', icon: <XIcon />, cto: 'Follow us on X' },
    { label: 'Golfin Website', url: 'https://golfin.io/', icon: <GolfinWebsiteIcon />, cto: 'Golfin Website' },

]

export {
    navLinks,
    socialMediaLinks
}