import Background from '@/components/BackgroundComponent/Background'
import GolfinTitle from '../../assets/images/02_earn_logo.png'
import DemoTitle from '@/components/DemoTitleComponent/DemoTitle'
import { Utils } from '@telegram-apps/sdk'
import { Page } from 'konsta/react'
// import { useUserContext } from '../../contexts/UserContext'

interface LinkPageProp {
    utils: Utils
}

const socialMediaLinks = [
    {
        label: 'Instagram', url: 'https://www.instagram.com/golfin_official/', icon: <svg width={64} height={64} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.898 13.0239H22.1021C16.6365 13.0239 12.1841 17.4763 12.1841 22.9419V41.0581C12.1841 46.5236 16.6365 50.976 22.1021 50.976H41.898C47.3635 50.976 51.8159 46.5236 51.8159 41.0581V22.9419C51.8159 17.4763 47.3635 13.0239 41.898 13.0239ZM15.6767 22.9419C15.6767 19.3959 18.5561 16.5165 22.1021 16.5165H41.898C45.4439 16.5165 48.3233 19.3959 48.3233 22.9419V41.0581C48.3233 44.604 45.4439 47.4834 41.898 47.4834H22.1021C18.5561 47.4834 15.6767 44.604 15.6767 41.0581V22.9419Z" fill="white" />
            <path d="M31.9934 41.2315C37.0856 41.2315 41.2181 37.0857 41.2181 32.0067C41.2181 26.9278 37.0856 22.782 31.9934 22.782C26.9011 22.782 22.7686 26.9278 22.7686 32.0067C22.7686 37.0857 26.9011 41.2315 31.9934 41.2315ZM31.9934 26.2746C35.1527 26.2746 37.7255 28.8474 37.7255 32.0067C37.7255 35.1661 35.1527 37.7389 31.9934 37.7389C28.834 37.7389 26.2612 35.1661 26.2612 32.0067C26.2612 28.8474 28.834 26.2746 31.9934 26.2746Z" fill="white" />
            <path d="M42.0712 24.2615C43.4443 24.2615 44.5507 23.1417 44.5507 21.7687C44.5507 20.3956 43.431 19.2759 42.0712 19.2759C40.7115 19.2759 39.5784 20.3956 39.5784 21.7687C39.5784 23.1417 40.6982 24.2615 42.0712 24.2615Z" fill="white" />
        </svg>, cto: 'Follow us on Instagram'
    },
    {
        label: 'X', url: 'https://x.com/GOLFIN_official', icon: <svg width={64} height={64} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9733 14.1067L27.7333 33.84L12.8933 49.88H16.24L29.24 35.84L39.7466 49.88H51.12L35.5333 29.04L49.3466 14.1067H46L34.0266 27.04L24.36 14.1067H12.9866H12.9733ZM17.8933 16.5734H23.12L46.1866 47.4267H40.96L17.8933 16.5734Z" fill="white" />
        </svg>, cto: 'Follow us on X'
    },
    {
        label: 'Golfin Website', url: 'https://golfin.io/', icon: <svg width={64} height={64} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.9289 51.9892C21.1269 51.9892 11.9975 43.0232 11.9975 31.9443C11.9975 20.8654 21.1269 11.9976 32.9289 11.9976C38.4232 11.9976 43.6166 14.1133 47.198 17.2855C44.2244 20.6125 39.7015 22.1658 35.3394 21.2195C34.5528 21.0499 33.7453 20.9606 32.9289 20.9606C26.5735 20.9606 21.833 25.7963 21.833 31.9413C21.833 38.0863 26.5705 43.0202 32.9289 43.0202C36.9126 43.0202 40.1901 40.5027 41.4981 36.9764H32.9289C34.8478 32.2835 39.4184 29.2185 44.4926 29.2185H51.9892V31.8401C51.9892 43.2225 43.6166 51.9863 32.9289 51.9863V51.9892Z" fill="white" />
        </svg>, cto: 'Visit Golfin Website'
    },
]

const DemoLinks = ({ utils }: LinkPageProp) => {


    // const { account, setAccount } = useUserContext()
    return (
        <div>
            <div className='w-[100%] h-[690px]'>
                <DemoTitle titlename='LINKS' />
                <DemoLinkPageComponent utils={utils} />


            </div >
        </div >
    )
}

const DemoLinkPageComponent = ({ utils }: LinkPageProp) => {
    return (
        <div className='grid space-y-5 mx-auto justify-items-center cursor-pointer'>
            <>
                {socialMediaLinks.map((socialMediaLink, index) => {
                    return (

                        <div key={index}
                            className="w-[21.4375rem] 
                    h-[6.25rem] 
                    rounded-lg 
                    bg-white/[.20] 
                    content-center 
                    cursor-pointer"
                            onClick={() => {                                
                                if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                                    window.open(socialMediaLink.url, '_blank')
                                }
                                else {
                                    if (utils !== undefined) {
                                        utils.openLink(socialMediaLink.url, { tryInstantView: true })
                                    } else {
                                        window.open(socialMediaLink.url, '_blank')
                                    }
                                }

                            }}>
                            <div className='flex justify-start mx-3 cursor-pointer'>
                                {socialMediaLink.icon}
                                <div className={`
                                ${socialMediaLink.label}
                                cursor-pointer
                                text-white 
                                text-xl 
                                font-medium
                                leading-[2.125rem]
                                text-center
                                font-['Rubik'] 
                                content-center`}>{socialMediaLink.cto}</div>
                            </div>

                        </div>
                    )
                })}
            </>
        </div>
    )

}


export default DemoLinks