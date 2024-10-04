import { ClipLoader } from 'react-spinners'
import ellipseImage1 from '../../assets/images/ellipse-171.png'
import { LoaderComponentPropsType } from '@/type'
import { useLocation } from 'react-router-dom'

const Loader = ({ isLoading }: LoaderComponentPropsType) => {

    const location = useLocation()

    return (
        <div className="bg-[#00161c] justify-center w-full">
            <div className={` bg-[#00161c] overflow-hidden w-[393px] relative ${location.pathname == '/' ? ' h-[852px]' : ' h-[690px]'}`}>
                <ClipLoader
                    color='gray'
                    loading={isLoading}
                    size={150}
                    className={`opacity-80 absolute left-[30%] translate-x-[-50%] translate-y-[-50%] ${location.pathname == '/' ? 'top-[30%]' : 'top-[13%]'} `} />
                <img className="absolute left-[50%] w-[100%] translate-x-[-50%]" alt="Ellipse171" src={ellipseImage1} />
            </div>
        </div>
    )
}

export default Loader