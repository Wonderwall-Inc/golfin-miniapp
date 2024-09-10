import React, { useState, useEffect } from 'react';

interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    const [ballPosition, setBallPosition] = useState(0);

    useEffect(() => {
        if (isLoading) {
            const intervalId = setInterval(() => {
                if (ballPosition < 100) {
                    setBallPosition(ballPosition + 1);
                } else {
                    clearInterval(intervalId);
                }
            }, 10); // Adjust the interval for animation speed

            return () => clearInterval(intervalId);
        }
    }, [isLoading, ballPosition]);

    const loaderStyle = {

        height: '15px',
        backgroundColor: '#f0f0f0',
        position: 'relative',
        // overflow: 'hidden'

    };

    const ballStyle = {
        position: 'absolute',
        top: -10,
        left: `${ballPosition}%`,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#333',
    };

    return (
        <div className="loader w-[250px] bg-white rounded-lg overflow-clip h-[15px]">
            {isLoading && <div className="ball" style={ballStyle}></div>}
        </div>
    );
};

export default Loader;