import React from 'react';
import './Background.css';
import ellipseImage1 from '../../assets/images/ellipse-171.png';
import ellipseImage2 from '../../assets/images/ellipse-172.png';

const Background: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="bg-[#00161c] justify-center w-full">
            <div className="bg-[#00161c] overflow-hidden w-[393px] h-[852px] relative">
                <img className="h-[500px] top-[-100px] absolute left-[50%] w-[100%] translate-x-[-50%]" alt="Ellipse171" src={ellipseImage1} />
                <img className="h-[554px] top-[298px] absolute w-[393px] left-0" alt="Ellipse172" src={ellipseImage2} />
                <div className="relative w-[833px] h-[1285px] top-[-150px] left-[-214px]">
                    <div className='fixed top-0 left-0 w-[100%] content-center'>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Background;