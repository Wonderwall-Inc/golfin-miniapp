import HomeNavIcon from '../assets/icons/Home.svg'
import LinksNavIcon from '../assets/icons/Links.svg'
import RankingNavIcon from '../assets/icons/Ranking.svg'
import InstagramImage from '../assets/images/04_links_icon_instagram.png'
import XImage from '../assets/images/04_links_icon_x.png'
import GolfinWebsiteImage from '../assets/images/04_links_icon_golfin.png'

import CoinImage from '../assets/images/02_earn_menu_icon_earn.png'
import RankingImage from '../assets/images/02_earn_menu_icon_ranking.png'
import LinkImage from '../assets/images/02_earn_menu_icon_links.png'

const navLinks = [
    { label: 'Home', url: '/', icon: <img src={CoinImage} width='40px' height='40px' /> },
    { label: 'Ranking', url: '/ranking', icon: <img src={RankingImage} width='40px' height='40px' /> },
    { label: 'Links', url: '/links', icon: <img src={LinkImage} width='40px' height='40px' /> },
]

const socialMediaLinks = [
    { label: 'Instagram', url: 'https://www.instagram.com/golfin_official/', icon: <img src={InstagramImage} width='50px' height='50px' />, cto: 'Follow us on Instagram' },
    { label: 'X', url: 'https://x.com/GOLFIN_official', icon: <img src={XImage} width='50px' height='50px' />, cto: 'Follow us on X' },
    { label: 'Golfin Website', url: 'https://golfin.io/', icon: <img src={GolfinWebsiteImage} width='50px' height='50px' />, cto: 'Golfin Website' },

]


const mockPointRankingData = [
    { rank: 1, name: 'player1', point: 99999999999 },
    { rank: 2, name: 'player2', point: 9999999999, },
    { rank: 3, name: 'player3', point: 999999999, },
    { rank: 4, name: 'player4', point: 99999999, },
    { rank: 5, name: 'player5', point: 9999999, },
    { rank: 6, name: 'player6', point: 999999 },
    { rank: 7, name: 'player7', point: 99999 },
    { rank: 8, name: 'player8', point: 9999 },
    { rank: 9, name: 'player9', point: 999 },
    { rank: 10, name: 'player10', point: 99 },
    { rank: 25, name: 'player25', point: 9 },
]
const mockReferralRankingData = [
    { rank: 1, name: 'player25', referral: 25 },
    { rank: 2, name: 'player10', referral: 10 },
    { rank: 3, name: 'player9', referral: 9 },
    { rank: 4, name: 'player8', referral: 8 },
    { rank: 5, name: 'player7', referral: 7 },
    { rank: 6, name: 'player6', referral: 6 },
    { rank: 7, name: 'player5', referral: 5 },
    { rank: 8, name: 'player4', referral: 4 },
    { rank: 9, name: 'player3', referral: 3 },
    { rank: 10, name: 'player2', referral: 2 },
    { rank: 25, name: 'player1', referral: 1 },

]

const mockUserAccount = {
    name: 'player25', point: 9, referral: 25
}
export {
    navLinks,
    socialMediaLinks,
    mockPointRankingData,
    mockReferralRankingData
}