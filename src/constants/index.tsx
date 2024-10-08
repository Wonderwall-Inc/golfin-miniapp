import DemoIgSvg from '../assets/icons/DemoIg.svg'
import DemoXSvg from '../assets/icons/DemoX.svg'
import DemoGolfinWebSvg from '../assets/icons/DemoGolfinWeb.svg'
import ForwardTgLinkSvg from '../assets/icons/ForwardTgLink.svg'
import DiscordSvgLinkSvg from '../assets/icons/Discord.svg'
import { sgTimeNowByDayJs } from '@/utils'

const MINI_APP_BOT_NAME = import.meta.env.VITE_MINI_APP_BOT_NAME
const MINI_APP_NAME = import.meta.env.VITE_MINI_APP_NAME
const sgTime = sgTimeNowByDayJs()

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
    { label: 'Demo Profile', url: '/profile' },
]

const demoSocialMediaLinks = [
    { label: 'Golfin Forward Link', url: `https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start`, icon: <div className='scale-120 mx-3'><ForwardTgLinkSvg /></div>, cto: 'Copy invitation link' },
    { label: 'Golfin Instagram', url: 'https://www.instagram.com/golfin_official/', icon: <div className='scale-150 mx-3'><DemoIgSvg /></div>, cto: 'Follow us on Instagram' },
    { label: 'Golfin X', url: 'https://x.com/GOLFIN_GL', icon: <div className='scale-150 mx-3'><DemoXSvg /></div>, cto: 'Follow us on X' },
    { label: 'Golfin Website', url: 'https://golfin.io/en/', icon: <div className='scale-150 mx-3'><DemoGolfinWebSvg /></div>, cto: 'Visit Golfin Website' },
    { label: 'Golfin Discord', url: 'https://discord.com/invite/9jHYM5zYnv', icon: <div className='scale-120 mx-3'><DiscordSvgLinkSvg /></div>, cto: 'Join Golfin Discord' },
]

const mockPointRankingData = [
    { rank: 1, name: 'nextInnovationDev1', point: 10000, id: 25, telegram_id: 'nextInnovationDev1' },
    { rank: 2, name: 'nextInnovationDev2', point: 9500, id: 24, telegram_id: 'nextInnovationDev2' },
    { rank: 3, name: 'nextInnovationDev3', point: 9000, id: 23, telegram_id: 'nextInnovationDev3' },
    { rank: 4, name: 'nextInnovationDev4', point: 8500, id: 22, telegram_id: 'nextInnovationDev4' },
    { rank: 5, name: 'nextInnovationDev5', point: 8000, id: 21, telegram_id: 'nextInnovationDev5' },
    { rank: 6, name: 'nextInnovationDev6', point: 7500, id: 20, telegram_id: 'nextInnovationDev6' },
    { rank: 7, name: 'nextInnovationDev7', point: 7000, id: 19, telegram_id: 'nextInnovationDev7' },
    { rank: 8, name: 'nextInnovationDev8', point: 6500, id: 18, telegram_id: 'nextInnovationDev8' },
    { rank: 9, name: 'nextInnovationDev9', point: 6000, id: 17, telegram_id: 'nextInnovationDev9' },
    { rank: 10, name: 'nextInnovationDev10', point: 5500, id: 16, telegram_id: 'nextInnovationDev10' },
    { rank: 11, name: 'nextInnovationDev11', point: 5000, id: 15, telegram_id: 'nextInnovationDev11' },
    { rank: 12, name: 'nextInnovationDev12', point: 4500, id: 14, telegram_id: 'nextInnovationDev12' },
    { rank: 13, name: 'nextInnovationDev13', point: 4000, id: 13, telegram_id: 'nextInnovationDev13' },
    { rank: 14, name: 'nextInnovationDev14', point: 3500, id: 12, telegram_id: 'nextInnovationDev14' },
    { rank: 15, name: 'nextInnovationDev15', point: 3000, id: 11, telegram_id: 'nextInnovationDev15' },
    { rank: 16, name: 'nextInnovationDev16', point: 2500, id: 10, telegram_id: 'nextInnovationDev16' },
    { rank: 17, name: 'nextInnovationDev17', point: 2000, id: 9, telegram_id: 'nextInnovationDev17' },
    { rank: 18, name: 'nextInnovationDev18', point: 1500, id: 8, telegram_id: 'nextInnovationDev18' },
    { rank: 19, name: 'nextInnovationDev19', point: 1000, id: 7, telegram_id: 'nextInnovationDev19' },
    { rank: 20, name: 'nextInnovationDev20', point: 500, id: 6, telegram_id: 'nextInnovationDev20' },
    { rank: 21, name: 'nextInnovationDev21', point: 450, id: 5, telegram_id: 'nextInnovationDev21' },
    { rank: 22, name: 'nextInnovationDev22', point: 400, id: 4, telegram_id: 'nextInnovationDev22' },
    { rank: 23, name: 'nextInnovationDev23', point: 350, id: 3, telegram_id: 'nextInnovationDev23' },
    { rank: 24, name: 'nextInnovationDev24', point: 300, id: 2, telegram_id: 'nextInnovationDev24' },
    { rank: 25, name: 'nextInnovationDev25', point: 250, id: 1, telegram_id: 'nextInnovationDev25' }
]
const mockReferralRankingData = [
    { rank: 1, name: 'nextInnovationDev25', referral: 599999999, id: 1 },
    { rank: 2, name: 'nextInnovationDev24', referral: 59999999, id: 2 },
    { rank: 3, name: 'nextInnovationDev23', referral: 5999999, id: 3 },
    { rank: 4, name: 'nextInnovationDev22', referral: 599999, id: 4 },
    { rank: 5, name: 'nextInnovationDev21', referral: 59999, id: 5 },
    { rank: 6, name: 'nextInnovationDev20', referral: 5999, id: 6 },
    { rank: 7, name: 'nextInnovationDev19', referral: 2011, id: 7 },
    { rank: 8, name: 'nextInnovationDev18', referral: 123, id: 8 },
    { rank: 9, name: 'nextInnovationDev17', referral: 17, id: 9 },
    { rank: 10, name: 'nextInnovationDev16', referral: 16, id: 10 },
    { rank: 11, name: 'nextInnovationDev15', referral: 15, id: 11 },
    { rank: 12, name: 'nextInnovationDev14', referral: 14, id: 12 },
    { rank: 13, name: 'nextInnovationDev13', referral: 13, id: 13 },
    { rank: 14, name: 'nextInnovationDev12', referral: 12, id: 14 },
    { rank: 15, name: 'nextInnovationDev11', referral: 11, id: 15 },
    { rank: 16, name: 'nextInnovationDev10', referral: 10, id: 16 },
    { rank: 17, name: 'nextInnovationDev9', referral: 9, id: 17 },
    { rank: 18, name: 'nextInnovationDev8', referral: 8, id: 18 },
    { rank: 19, name: 'nextInnovationDev7', referral: 7, id: 19 },
    { rank: 20, name: 'nextInnovationDev6', referral: 6, id: 20 },
    { rank: 21, name: 'nextInnovationDev5', referral: 5, id: 21 },
    { rank: 22, name: 'nextInnovationDev4', referral: 4, id: 22 },
    { rank: 23, name: 'nextInnovationDev3', referral: 3, id: 23 },
    { rank: 24, name: 'nextInnovationDev2', referral: 2, id: 24 },
    { rank: 25, name: 'nextInnovationDev1', referral: 1, id: 25 },

]

const mockUserAccount = {
    name: 'nextInnovationDev25', point: 999999999999, referral: 25
}


const dailyCheckInPointReward = 2

const weeklyCheckInPointReward = 15

const friendReferralPointReward = 100

const tenFriendsReferralPointReward = 3000

// ACTIVITY PROVIDER MOCK DATA
const mockProviderActivity = {
    id: 1,
    logged_in: true,
    login_streak: 1,
    total_logins: 1,
    last_action_time: '2024-09-17T00:00:00',
    last_login_time: '2024-09-17T00:00:00',
    created_at: '2024-09-17T00:00:00',
    updated_at: '2024-09-17T00:00:00',
}

// USER PROVIDER MOCK DATA
const mockProviderPoint = {
    id: 1,
    login_amount: 0,
    referral_amount: 0,
    extra_profit_per_hour: 1,
    created_at: '2024-09-17T00:00:00',
    updated_at: '2024-09-17T00:00:00',
}
// POINT PROVIDER MOCK DATA

// FRIEND PROVIDER MOCK DATA


// DEMO PAGE TEST DATA
const mockDailyCheckInActivity = {
    id: 1,
    logged_in: false,
    login_streak: 1,
    total_logins: 1,
    last_action_time: sgTime,
    last_login_time: sgTime,
    created_at: sgTime,
    updated_at: sgTime,
}

const mockDailyCheckInPoint = {
    id: 1,
    login_amount: 2,
    referral_amount: 0,
    extra_profit_per_hour: 0,
    created_at: sgTime,
    updated_at: sgTime,
}

const mockSingleFriendReferralPoint = {
    ...mockProviderPoint,
    id: mockProviderPoint?.id,
    referral_amount: mockProviderPoint?.referral_amount + 3000,
}


export {
    testInitDataRaw,
    navLinks,
    mockPointRankingData,
    mockReferralRankingData,
    mockUserAccount,
    dailyCheckInPointReward,
    weeklyCheckInPointReward,
    friendReferralPointReward,
    tenFriendsReferralPointReward,
    demoSocialMediaLinks,
    mockDailyCheckInActivity,
    mockDailyCheckInPoint,
    mockProviderActivity,
    mockProviderPoint,
    mockSingleFriendReferralPoint
}