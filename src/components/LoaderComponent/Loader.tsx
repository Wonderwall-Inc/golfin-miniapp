import { ClipLoader } from 'react-spinners'
import ellipseImage1 from '../../assets/images/ellipse-171.png'

interface LoaderComponentProps {
    isLoading: boolean;
    wrapperHeight?: string;
    wrapperWidth?: string;
    spinnerTopPosition?: string;
}

const Loader = ({ isLoading, wrapperHeight = '852px', wrapperWidth = '393px', spinnerTopPosition = '30%' }: LoaderComponentProps) => {
    return (
        <div>
            <div className="bg-[#00161c] justify-center w-full">
                <div className={`bg-[#00161c] overflow-hidden w-[${wrapperWidth}] h-[${wrapperHeight}] relative`}>
                    <ClipLoader
                        color='gray'
                        loading={isLoading}
                        size={150}
                        className={`opacity-80 absolute top-[${spinnerTopPosition}] left-[30%] translate-x-[-50%] translate-y-[-50%]`}
                    >
                    </ClipLoader>
                    <img className="absolute left-[50%] w-[100%] translate-x-[-50%]" alt="Ellipse171" src={ellipseImage1} />
                </div>
            </div>
        </div>
    )
}

export default Loader