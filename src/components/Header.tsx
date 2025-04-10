import React, {useState, useEffect} from 'react'
import "./Header.scss";
import Links from "./Links";
import NavMenu from "./NavMenu";
import { useTheme } from '../contexts/ThemeContext';

interface LinkData {
    text: string;
    href: string;
    px: number;
    id: string;
}

interface HeaderProps {
    links: LinkData[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
  const { theme } = useTheme();
  const [currentScroll, setCurrentScroll] = useState(window.pageYOffset);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth > 900 && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener('resize', handleResize) }
  }, [isMobileMenuOpen])

  useEffect(() => {
    let previousScroll = window.pageYOffset;
    const handleScroll = () => {
      if (isMobileMenuOpen) return;
      
      const current = window.pageYOffset;
      setCurrentScroll(current);
      if (current > previousScroll) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      previousScroll = current;
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const headerClasses = [
    'App-header',
    currentScroll < 1 ? 'headerBigger' : '',
    currentScroll > 75 && scrollDirection === "down" && !isMobileMenuOpen ? 'hideHeader' : ''
  ].filter(Boolean).join(' ');

  let content = 
  <nav className={headerClasses}>
    <div className="navLogoContainer">
      {/* <a href="#">
        <img src={logo} className="logo" alt="logo" />
      </a> */}
    </div>
    <div className="navCenterContainer">
      <div className="mainNavLinks">
        <Links links={links} onLinkClick={handleLinkClick} />
      </div>
    </div>
    <div className="navLinksContainer">
      <div className={`hamburgerMenu ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleToggleMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div className={`mobileMenu ${isMobileMenuOpen ? 'open' : ''}`}>
      <Links links={links} onLinkClick={handleLinkClick} />
    </div>
  </nav>;

  return content;
};

export default Header;