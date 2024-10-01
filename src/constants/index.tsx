import InstagramImage from '../assets/images/04_links_icon_instagram.png'
import XImage from '../assets/images/04_links_icon_x.png'
import GolfinWebsiteImage from '../assets/images/04_links_icon_golfin.png'

const testInitDataRaw = [
    ['user', JSON.stringify({
        id: 99281932,
        first_name: 'Andrew',
        last_name: 'Rogue',
        username: 'rogue',
        language_code: 'en',
        premium: true,
        allows_write_to_pm: true,
    })],
    ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
    ['auth_date', '1716922846'],
    ['start_param', 'debug'],
    ['chat_type', 'sender'],
    ['chat_instance', '8428209589180549439'],
]

const navLinks = [
    { label: 'Demo Home', url: '/' },
    { label: 'Demo Ranking', url: '/ranking' },
    { label: 'Demo Links', url: '/links' },
    { label: 'Demo Profile', url: '/profile' }
]

const socialMediaLinks = [
    { label: 'Instagram', url: 'https://www.instagram.com/golfin_official/', icon: <img src={InstagramImage} width='50px' height='50px' />, cto: 'Follow us on Instagram' },
    { label: 'X', url: 'https://x.com/GOLFIN_official', icon: <img src={XImage} width='50px' height='50px' />, cto: 'Follow us on X' },
    { label: 'Golfin Website', url: 'https://golfin.io/', icon: <img src={GolfinWebsiteImage} width='50px' height='50px' />, cto: 'Golfin Website' },
]

const mockPointRankingData = [
    { rank: 1, name: 'nextInnovationDev1', point: 10000 },
    { rank: 2, name: 'nextInnovationDev2', point: 9500 },
    { rank: 3, name: 'nextInnovationDev3', point: 9000 },
    { rank: 4, name: 'nextInnovationDev4', point: 8500 },
    { rank: 5, name: 'nextInnovationDev5', point: 8000 },
    { rank: 6, name: 'nextInnovationDev6', point: 7500 },
    { rank: 7, name: 'nextInnovationDev7', point: 7000 },
    { rank: 8, name: 'nextInnovationDev8', point: 6500 },
    { rank: 9, name: 'nextInnovationDev9', point: 6000 },
    { rank: 10, name: 'nextInnovationDev10', point: 5500 },
    { rank: 11, name: 'nextInnovationDev11', point: 5000 },
    { rank: 12, name: 'nextInnovationDev12', point: 4500 },
    { rank: 13, name: 'nextInnovationDev13', point: 4000 },
    { rank: 14, name: 'nextInnovationDev14', point: 3500 },
    { rank: 15, name: 'nextInnovationDev15', point: 3000 },
    { rank: 16, name: 'nextInnovationDev16', point: 2500 },
    { rank: 17, name: 'nextInnovationDev17', point: 2000 },
    { rank: 18, name: 'nextInnovationDev18', point: 1500 },
    { rank: 19, name: 'nextInnovationDev19', point: 1000 },
    { rank: 20, name: 'nextInnovationDev20', point: 500 },
    { rank: 21, name: 'nextInnovationDev21', point: 450 },
    { rank: 22, name: 'nextInnovationDev22', point: 400 },
    { rank: 23, name: 'nextInnovationDev23', point: 350 },
    { rank: 24, name: 'nextInnovationDev24', point: 300 },
    { rank: 25, name: 'nextInnovationDev25', point: 250 }
]
const mockReferralRankingData = [
    { rank: 1, name: 'nextInnovationDev25', referral: 5999999999 },
    { rank: 2, name: 'nextInnovationDev24', referral: 59999999 },
    { rank: 3, name: 'nextInnovationDev23', referral: 5999999 },
    { rank: 4, name: 'nextInnovationDev22', referral: 599999 },
    { rank: 5, name: 'nextInnovationDev21', referral: 59999 },
    { rank: 6, name: 'nextInnovationDev20', referral: 5999 },
    { rank: 7, name: 'nextInnovationDev19', referral: 2011 },
    { rank: 8, name: 'nextInnovationDev18', referral: 123 },
    { rank: 9, name: 'nextInnovationDev17', referral: 17 },
    { rank: 10, name: 'nextInnovationDev16', referral: 16 },
    { rank: 11, name: 'nextInnovationDev15', referral: 15 },
    { rank: 12, name: 'nextInnovationDev14', referral: 14 },
    { rank: 13, name: 'nextInnovationDev13', referral: 13 },
    { rank: 14, name: 'nextInnovationDev12', referral: 12 },
    { rank: 15, name: 'nextInnovationDev11', referral: 11 },
    { rank: 16, name: 'nextInnovationDev10', referral: 10 },
    { rank: 17, name: 'nextInnovationDev9', referral: 9 },
    { rank: 18, name: 'nextInnovationDev8', referral: 8 },
    { rank: 19, name: 'nextInnovationDev7', referral: 7 },
    { rank: 20, name: 'nextInnovationDev6', referral: 6 },
    { rank: 21, name: 'nextInnovationDev5', referral: 5 },
    { rank: 22, name: 'nextInnovationDev4', referral: 4 },
    { rank: 23, name: 'nextInnovationDev3', referral: 3 },
    { rank: 24, name: 'nextInnovationDev2', referral: 2 },
    { rank: 25, name: 'nextInnovationDev1', referral: 1 },

]

const mockUserAccount = {
    name: 'nextInnovationDev25', point: 999999999999, referral: 25
}


const dailyCheckInPointReward = 2

const weeklyCheckInPointReward = 15

const friendReferralPointReward = 100

const tenFriendsReferralPointReward = 3000

export {
    testInitDataRaw,
    navLinks,
    socialMediaLinks,
    mockPointRankingData,
    mockReferralRankingData,
    mockUserAccount,
    dailyCheckInPointReward,
    weeklyCheckInPointReward,
    friendReferralPointReward,
    tenFriendsReferralPointReward
}