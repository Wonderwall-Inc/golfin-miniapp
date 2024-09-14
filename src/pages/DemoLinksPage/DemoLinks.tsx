import { Utils } from '@telegram-apps/sdk'
import DemoIgSvg from '../../assets/icons/DemoIg.svg'
import DemoXSvg from '../../assets/icons/DemoX.svg'
import DemoGolfinWebSvg from '../../assets/icons/DemoGolfinWeb.svg'

interface LinkPageProp {
    utils: Utils
}

const socialMediaLinks = [
    { label: 'Instagram', url: 'https://www.instagram.com/golfin_official/', icon: <div className='scale-150 mx-2'><DemoIgSvg /></div>, cto: 'Follow us on Instagram' },
    { label: 'X', url: 'https://x.com/GOLFIN_GL', icon: <div className='scale-150 mx-2'><DemoXSvg /></div>, cto: 'Follow us on X' },
    { label: 'Golfin Website', url: 'https://golfin.io/en/', icon: <div className='scale-150 mx-2'><DemoGolfinWebSvg /></div>, cto: 'Visit Golfin Website' },
]

const DemoLinks = ({ utils }: LinkPageProp) => {
    return (
        <div className='w-[100%] h-[690px]'>
            <DemoLinkPageComponent utils={utils} />
        </div >
    )
}

const DemoLinkPageComponent = ({ utils }: LinkPageProp) => {
    return (
        <div className='grid space-y-5 mx-auto justify-items-center cursor-pointer mt-5'>
            {socialMediaLinks.map((socialMediaLink, index) => {
                return (
                    <div key={index}
                        className="w-[21.4375rem] h-[6.25rem] rounded-lg bg-white/[.20] content-center cursor-pointer"
                        onClick={() => {
                            if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                                window.open(socialMediaLink.url, '_blank')
                            }
                            else {
                                utils !== undefined ? utils.openLink(socialMediaLink.url, { tryInstantView: true }) : window.open(socialMediaLink.url, '_blank')
                            }
                        }}>
                        <div className='flex justify-start mx-3 cursor-pointer'>
                            {socialMediaLink.icon}
                            <div className={`${socialMediaLink.label} cursor-pointertext-white text-xl font-medium leading-[2.125rem] text-center font-['Rubik'] content-center text-white`}>{socialMediaLink.cto}</div>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

export default DemoLinks