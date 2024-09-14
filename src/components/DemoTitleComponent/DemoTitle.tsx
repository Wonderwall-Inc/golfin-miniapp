import UpperFlag from '../../assets/icons/UpperFlag.svg'
import LowerFlag from '../../assets/icons/LowerFlag.svg'
import GolfinTitle from '../../assets/images/02_earn_logo.png'

interface DemoTitleProps {
    titlename: string,
    style?: string
}
const DemoTitle = ({ titlename, style }: DemoTitleProps) => {
    return (
        <>
            <img src={GolfinTitle}
                width={150}
                height={150}
                className='mx-auto py-10 sm:py-10 md:py-15' />
            <div className='px-5 mb-3'>
                <div className="w-[393px] h-[49px]">
                    <div className="relative h-[49px] w-[393px]">
                        <div className="h-[3px] top-[46px] [background:linear-gradient(180deg,rgb(47,220,202)_0%,rgb(127.27,231.4,127.42)_47.5%,rgb(216,244,45)_100%)] absolute w-[393px] left-[-20px]" />
                        <div className="h-[46px] top-0 [background:linear-gradient(180deg,rgba(47,220,202,0)_0%,rgb(130,201,31)_100%)] absolute w-[393px] left-0" />
                        <div className="absolute w-4 h-11 top-1 left-[29px]">
                            <div className="relative h-[42px]">
                                <div className="absolute w-4 h-[42px] top-0 left-0">
                                    <div className="!absolute !w-0.5 !h-[42px] !top-[-6px] !left-[-0.5px] scale-50"><UpperFlag /></div>
                                    <div className="!absolute !w-[15px] !h-[11px] !top-[15px] !left-[-14px]"><LowerFlag /></div>
                                </div>
                                <div className="absolute w-[3px] h-[3px] top-[39px] left-[11px] bg-[#ffffff] rounded-[1.5px]" />
                            </div>
                        </div>
                        <div className={`absolute top-1 left-[130px] [font-family:'Rubik-Medium',Helvetica] font-medium text-white text-[34px] text-center tracking-[0.40px] leading-[41px] whitespace-nowrap`}>
                            <div className={`${style}`}>{titlename}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DemoTitle