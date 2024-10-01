import { Utils } from '@telegram-apps/sdk'
import DemoIgSvg from '../../assets/icons/DemoIg.svg'
import DemoXSvg from '../../assets/icons/DemoX.svg'
import DemoGolfinWebSvg from '../../assets/icons/DemoGolfinWeb.svg'
import ForwardTgLinkSvg from '../../assets/icons/ForwardTgLink.svg'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import useCopyToClipboard from '@/hooks/useCopyToClipboard'

const MINI_APP_BOT_NAME = import.meta.env.VITE_MINI_APP_BOT_NAME
const MINI_APP_NAME = import.meta.env.VITE_MINI_APP_NAME
const MINI_APP_APP = `https://t.me/${MINI_APP_BOT_NAME}/${MINI_APP_NAME}/start`


interface LinkPageProp {
    utils: Utils
}

const socialMediaLinks = [
    { label: 'Golfin Forward Link', url: MINI_APP_APP, icon: <div className='scale-120 mx-3'><ForwardTgLinkSvg /></div>, cto: 'Copy invitation link' },
    { label: 'Golfin Instagram', url: 'https://www.instagram.com/golfin_official/', icon: <div className='scale-150 mx-3'><DemoIgSvg /></div>, cto: 'Follow us on Instagram' },
    { label: 'Golfin X', url: 'https://x.com/GOLFIN_GL', icon: <div className='scale-150 mx-3'><DemoXSvg /></div>, cto: 'Follow us on X' },
    { label: 'Golfin Website', url: 'https://golfin.io/en/', icon: <div className='scale-150 mx-3'><DemoGolfinWebSvg /></div>, cto: 'Visit Golfin Website' },
    { label: 'Golfin Discord', url: 'https://discord.com/invite/9jHYM5zYnv', icon: <div className='scale-150 mx-3'><DemoGolfinWebSvg /></div>, cto: 'Join Golfin Discord' },
]

const DemoLinks = ({ utils }: LinkPageProp) => {
    return (
        <div className='w-[100%] h-[690px]'>
            <DemoLinkPageComponent utils={utils} />
        </div >
    )
}

const DemoLinkPageComponent = ({ utils }: LinkPageProp) => {
    const { isCopied, copytoClipboard } = useCopyToClipboard()
    const { toast } = useToast()
    return (
        <div className='grid space-y-5 mx-auto justify-items-center cursor-pointer mt-5'>
            {socialMediaLinks.map((socialMediaLink, index) => {
                return (
                    <div key={index}
                        className="w-[21.4375rem] h-[2.5rem] rounded-lg bg-white/[.20] content-center cursor-pointer"
                        onClick={() => {
                            if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
                                window.open(socialMediaLink.url, '_blank')
                            } else {
                                if (socialMediaLink.label == 'Golfin Forward Link') {
                                    copytoClipboard(MINI_APP_APP)
                                    isCopied && toast({
                                        className: cn('bg-[#FFFAE6] rounded-[10px]'),
                                        description: 'Invitation link copied to clipboard',
                                    })
                                } else {
                                    utils !== undefined ? utils.openLink(socialMediaLink.url, { tryInstantView: true }) : window.open(socialMediaLink.url, '_blank')
                                }
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