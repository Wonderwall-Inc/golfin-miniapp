import { cn } from '@/lib/utils'

import { useToast } from '@/hooks/use-toast'

import useCopyToClipboard from '@/hooks/useCopyToClipboard'

import { demoSocialMediaLinks } from '@/constants'
import { DemoLinkProp, DemoLinkSocialMediaLink } from '@/type'

const DemoLinks = ({ utils, appLink }: DemoLinkProp) => {
    return (
        <div className='w-[100%] h-[690px]'>
            <DemoLinkPageComponent utils={utils} appLink={appLink} />
        </div >
    )
}

const DemoLinkPageComponent = ({ utils, appLink }: DemoLinkProp) => {
    const handleClick = (socialMediaLink: DemoLinkSocialMediaLink) => {
        if (socialMediaLink.label == 'Golfin Forward Link') {
            copyToClipboard(appLink)
            toast({
                className: cn('bg-[#FFFAE6] rounded-[10px]'),
                description: 'Invitation link copied to clipboard',
            })
        } else if (import.meta.env.VITE_MINI_APP_ENV == 'test') {
            window.open(socialMediaLink.url, '_blank')
        } else {
            utils?.openLink(socialMediaLink.url, { tryInstantView: true })
        }
    }
    const { copyToClipboard } = useCopyToClipboard()
    const { toast } = useToast()
    return (
        <div className='grid space-y-5 mx-auto justify-items-center cursor-pointer mt-5'>
            {demoSocialMediaLinks?.map((socialMediaLink, index) => {
                return (
                    <div key={index}
                        className="w-[21.4375rem] h-[2.5rem] rounded-lg bg-white/[.20] content-center cursor-pointer"
                        onClick={() => { handleClick(socialMediaLink) }}>
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