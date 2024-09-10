import React, { useState, useEffect } from 'react';

interface SpinnerProps {
    isLoading: boolean
}
const Spinner = ({ isLoading }: SpinnerProps) => {

    return (
        <div className="flex justify-center" aria-label="">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
    );
};

export default Spinner;