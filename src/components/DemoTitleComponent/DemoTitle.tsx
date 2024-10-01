import UpperFlag from '../../assets/icons/UpperFlag.svg'
import LowerFlag from '../../assets/icons/LowerFlag.svg'
//import GolfinTitle from '../../assets/images/02_earn_logo.png'
import GolfinTitle from '../../assets/images/Golfin_main_logotype 1.png'

import { useNavigate } from 'react-router-dom'
import { DemoTitleProps } from '@/type'

const DemoTitle = ({ titlename, /* style */ }: DemoTitleProps) => {

    const nav = useNavigate()
    return (
        <>
            <div onClick={() => nav('/dev')} className='md:px-[95px] md:pt-[52px] pb-[10px] sm:pt-[20.32px]'>
                <img src={GolfinTitle} width="203px" height="67px" className='mx-auto py-10 sm:py-10 md:py-15' />
            </div>

            <div className="relative h-[49px] w-[393px] mx-auto">
                <div className="h-[3px] 
                    top-[46px] 
                    [background:linear-gradient(180deg,rgba(47,220,202,1)_0%,rgba(127,231,127,1)_47.5%,rgba(216,244,45,1)_100%)]
                    absolute 
                    w-[100%]" />
                <div className="h-[46px] 
                    left-[28px] 
                    [background:linear-gradient(90deg,rgba(47,220,202,0)_0%,rgba(130,201,31,1)_100%)] 
                    w-[393px]" />
                <div className="absolute w-4 h-11 top-1 left-[29px]">
                    <div className="relative h-[42px]">
                        <div className="absolute w-4 h-[42px] top-0 left-0">
                            <div className="!absolute !w-0.5 !h-[42px] !top-[-6px] !left-[-0.5px] scale-50"><UpperFlag /></div>
                            <div className="!absolute !w-[15px] !h-[11px] !top-[15px] !left-[-14px]"><LowerFlag /></div>
                        </div>
                        <div className="absolute w-[3px] h-[3px] top-[39px] left-[11px] bg-[#ffffff] rounded-[1.5px]" />
                    </div>
                </div>
                <div className={`[font-family:'Rubik-Medium',Helvetica] 
                        font-bold
                        flex
                        justify-center
                        content-center
                        items-center
                        text-white 
                        text-[34px] 
                        text-center 
                        tracking-[0.40px] 
                        absolute
                        top-[10px]
                        left-[50%]
                        translate-x-[-50%]
                        leading-[41px] 
                        whitespace-nowrap`}>
                    {titlename}

                </div>

            </div>
        </>
    )
}

export default DemoTitle