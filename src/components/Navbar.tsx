import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = () => {
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(false)
    const navItems = ['Inicio', 'Sobre Nosotros', 'Servicios', 'Contacto'];
    const navContainerRef = useRef<HTMLDivElement>(null);
    const { y : currentScrollY} = useWindowScroll();



    useEffect(() => {
        if(currentScrollY === 0){
            setIsNavVisible(true)
            navContainerRef.current?.classList.remove('floating-nav')
        } else if(currentScrollY > lastScrollY){
            setIsNavVisible(false)
            navContainerRef.current?.classList.remove('floating-nav')
        } else if(currentScrollY <lastScrollY){
            setIsNavVisible(true)
            navContainerRef.current?.classList.add('floating-nav')
        }
        setLastScrollY(currentScrollY)
    },[currentScrollY])


    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        })
    }, [isNavVisible])



    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 floating-nav">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center ">
                        <img src="img/logo.png" alt="logo" className="w-20" />
                    </div>
                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((nav) => (
                                <a 
                                    key={nav}
                                    href={`#${nav.toLowerCase()}`}
                                    className="nav-hover-btn"
                                >
                                    {nav}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;