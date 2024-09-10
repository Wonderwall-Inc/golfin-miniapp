import InstagramImage from '../assets/images/04_links_icon_instagram.png'
import XImage from '../assets/images/04_links_icon_x.png'
import GolfinWebsiteImage from '../assets/images/04_links_icon_golfin.png'


const navLinks = [
    { label: 'Demo Home', url: '/demo-earn' },
    { label: 'Demo Ranking', url: '/demo-ranking' },
    { label: 'Demo Links', url: '/demo-links' },
    { label: 'Home', url: '/' },
    { label: 'Ranking', url: '/ranking' },
    { label: 'Links', url: '/links' },
]

const socialMediaLinks = [
    { label: 'Instagram', url: 'https://www.instagram.com/golfin_official/', icon: <img src={InstagramImage} width='50px' height='50px' />, cto: 'Follow us on Instagram' },
    { label: 'X', url: 'https://x.com/GOLFIN_official', icon: <img src={XImage} width='50px' height='50px' />, cto: 'Follow us on X' },
    { label: 'Golfin Website', url: 'https://golfin.io/', icon: <img src={GolfinWebsiteImage} width='50px' height='50px' />, cto: 'Golfin Website' },

]


const mockPointRankingData = [
    { rank: 1, name: 'player1', point: 10000 },
    { rank: 2, name: 'player2', point: 9500 },
    { rank: 3, name: 'player3', point: 9000 },
    { rank: 4, name: 'player4', point: 8500 },
    { rank: 5, name: 'player5', point: 8000 },
    { rank: 6, name: 'player6', point: 7500 },
    { rank: 7, name: 'player7', point: 7000 },
    { rank: 8, name: 'player8', point: 6500 },
    { rank: 9, name: 'player9', point: 6000 },
    { rank: 10, name: 'player10', point: 5500 },
    { rank: 11, name: 'player11', point: 5000 },
    { rank: 12, name: 'player12', point: 4500 },
    { rank: 13, name: 'player13', point: 4000 },
    { rank: 14, name: 'player14', point: 3500 },
    { rank: 15, name: 'player15', point: 3000 },
    { rank: 16, name: 'player16', point: 2500 },
    { rank: 17, name: 'player17', point: 2000 },
    { rank: 18, name: 'player18', point: 1500 },
    { rank: 19, name: 'player19', point: 1000 },
    { rank: 20, name: 'player20', point: 500 },
    { rank: 21, name: 'player21', point: 450 },
    { rank: 22, name: 'player22', point: 400 },
    { rank: 23, name: 'player23', point: 350 },
    { rank: 24, name: 'player24', point: 300 },
    { rank: 25, name: 'player25', point: 250 }
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