import { ClipLoader } from 'react-spinners'
import ellipseImage1 from '../../assets/images/ellipse-171.png'

interface LoaderComponentProps {
    isLoading: boolean;
    wrapperHeight?: string;
    wrapperWidth?: string;
    spinnerTopPosition?: string;
    type?: string;
}

const Loader = ({ isLoading, wrapperHeight = '852px', wrapperWidth = '393', type = 'default' }: LoaderComponentProps) => {
    return (
        type == 'default' ?
            <div>
                <div className="bg-[#00161c] justify-center w-full">
                    <div className={`bg-[#00161c] overflow-hidden w-[${wrapperWidth}px] h-[${wrapperHeight}] relative`}>
                        <ClipLoader
                            color='gray'
                            loading={isLoading}
                            size={150}
                            className={`opacity-80 absolute top-[40%] left-[30%] translate-x-[-50%] translate-y-[-50%]`}
                        >
                        </ClipLoader>
                        <img className="absolute left-[50%] w-[100%] translate-x-[-50%]" alt="Ellipse171" src={ellipseImage1} />
                    </div>
                </div>
            </div> :
            <div>
                <div className="bg-[#00161c] justify-center w-full">
                    <div className={`bg-[#00161c] overflow-hidden w-[${wrapperWidth}px] h-[${wrapperHeight}] relative`}>
                        <ClipLoader
                            color='gray'
                            loading={isLoading}
                            size={150}
                            className={`opacity-80 absolute top-[23%] left-[30%] translate-x-[-50%] translate-y-[-50%]`}
                        >
                        </ClipLoader>
                        <img className="absolute left-[50%] w-[100%] translate-x-[-50%]" alt="Ellipse171" src={ellipseImage1} />
                    </div>
                </div>
            </div>
    )
}

export default Loader