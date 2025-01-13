"use client"
import { url } from "inspector";
import { useEffect, useState } from "react";

export default function GnbForm() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 425);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const handleLogo = () => {
        console.log('홈으로 가자')
        window.location.href = './';
    };

    return (
        <div className="w-full h-[60px] flex justify-start items-start border-b lg:border-gray-200 bg-white">
            <img className="w-[71px] h-10 relative top-[9.71px] ml-[16px] 
            sm:w-auto sm:ml-[24px] lg:w-[151px] lg:ml-[360px] object-fit: contain"
            src={isMobile ? '/img/image.png' : '/img/doit.png'} onClick={handleLogo}/>
        </div>
    );
}
