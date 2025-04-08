import React, { useEffect } from "react";
import logo from "../assets/images/header/logo.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const existing = document.querySelector("script[src*='clarity.ms']");
        if (!existing) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.innerHTML = `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    console.log('Clarity loaded!');
                })(window, document, "clarity", "script", "r0rhnl5ffn");
            `;
            document.head.appendChild(script);
        } else {
            console.log("Clarity already loaded.");
        }
    }, []);

    const handleLogoClick = () => {
        navigate('/dashboard');
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 h-[80px] bg-[#0d1846] text-white">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Bitcoin"
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={handleLogoClick}
                />
            </div>
        </header>
    );
}

export default Header;
