import { ClipLoader } from 'react-spinners'
import ellipseImage1 from '../../assets/images/ellipse-171.png'
import { LoaderComponentPropsType } from '@/type'
import { useEffect, useState } from 'react'

const Loader = ({ isLoading, wrapperHeight = '852px', wrapperWidth = '393', type = 'default' }: LoaderComponentPropsType) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }, [])

    console.log('windowWidth', windowWidth);
    console.log('windowHeight', windowHeight);

    return (
        type == 'default' ?
            <div>
                <div className="bg-[#00161c] justify-center w-full">
                    <div className={`bg-[#00161c] overflow-hidden w-[${wrapperWidth}px] h-[${wrapperHeight}] relative`}>
                        <ClipLoader
                            color='gray'
                            loading={isLoading}
                            size={150}
                            className={`opacity-80 absolute top-[30%] left-[30%] translate-x-[-50%] translate-y-[-50%]`}
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
                            className={`opacity-80 absolute top-[13%] left-[30%] translate-x-[-50%] translate-y-[-50%]`}
                        >
                        </ClipLoader>
                        <img className="absolute left-[50%] w-[100%] translate-x-[-50%]" alt="Ellipse171" src={ellipseImage1} />
                    </div>
                </div>
            </div>
    )
}

export default Loader