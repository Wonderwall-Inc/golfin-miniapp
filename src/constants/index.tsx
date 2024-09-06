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
    { rank: 1, name: 'Player 1', point: 10000 },
    { rank: 2, name: 'Player 2', point: 9500 },
    { rank: 3, name: 'Player 3', point: 9000 },
    { rank: 4, name: 'Player 4', point: 8500 },
    { rank: 5, name: 'Player 5', point: 8000 },
    { rank: 6, name: 'Player 6', point: 7500 },
    { rank: 7, name: 'Player 7', point: 7000 },
    { rank: 8, name: 'Player 8', point: 6500 },
    { rank: 9, name: 'Player 9', point: 6000 },
    { rank: 10, name: 'Player 10', point: 5500 },
    { rank: 11, name: 'Player 11', point: 5000 },
    { rank: 12, name: 'Player 12', point: 4500 },
    { rank: 13, name: 'Player 13', point: 4000 },
    { rank: 14, name: 'Player 14', point: 3500 },
    { rank: 15, name: 'Player 15', point: 3000 },
    { rank: 16, name: 'Player 16', point: 2500 },
    { rank: 17, name: 'Player 17', point: 2000 },
    { rank: 18, name: 'Player 18', point: 1500 },
    { rank: 19, name: 'Player 19', point: 1000 },
    { rank: 20, name: 'Player 20', point: 500 },
    { rank: 21, name: 'Player 21', point: 450 },
    { rank: 22, name: 'Player 22', point: 400 },
    { rank: 23, name: 'Player 23', point: 350 },
    { rank: 24, name: 'Player 24', point: 300 },
    { rank: 25, name: 'Player 25', point: 250 }
]
const mockReferralRankingData = [
    { rank: 1, name: 'player25', referral: 25 },
    { rank: 2, name: 'player24', referral: 24 },
    { rank: 3, name: 'player23', referral: 23 },
    { rank: 4, name: 'player22', referral: 22 },
    { rank: 5, name: 'player21', referral: 21 },
    { rank: 6, name: 'player20', referral: 20 },
    { rank: 7, name: 'player19', referral: 19 },
    { rank: 8, name: 'player18', referral: 18 },
    { rank: 9, name: 'player17', referral: 17 },
    { rank: 10, name: 'player16', referral: 16 },
    { rank: 11, name: 'player15', referral: 15 },
    { rank: 12, name: 'player14', referral: 14 },
    { rank: 13, name: 'player13', referral: 13 },
    { rank: 14, name: 'player12', referral: 12 },
    { rank: 15, name: 'player11', referral: 11 },
    { rank: 16, name: 'player10', referral: 10 },
    { rank: 17, name: 'player9', referral: 9 },
    { rank: 18, name: 'player8', referral: 8 },
    { rank: 19, name: 'player7', referral: 7 },
    { rank: 20, name: 'player6', referral: 6 },
    { rank: 21, name: 'player5', referral: 5 },
    { rank: 22, name: 'player4', referral: 4 },
    { rank: 23, name: 'player3', referral: 3 },
    { rank: 24, name: 'player2', referral: 2 },
    { rank: 25, name: 'player1', referral: 1 },

]

const mockUserAccount = {
    name: 'player25', point: 999999999999, referral: 25
}


const earnButtonList = [
    { label: 'daily' }
]

export {
    navLinks,
    socialMediaLinks,
    mockPointRankingData,
    mockReferralRankingData,
    mockUserAccount
}