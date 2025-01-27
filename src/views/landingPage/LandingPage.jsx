import React, { useState } from 'react';
import PropTypes from 'prop-types';

//Hero 
import MainVideo from '../../assets/images/hero/image_filekit-intro.mp4'
//Fast Marque Images 
import Image1 from '../../assets/images/trusted/image (2).webp'
import Image2 from '../../assets/images/trusted/image (3).webp'
import Image3 from '../../assets/images/trusted/image (4).webp'
import Image4 from '../../assets/images/trusted/image (5).webp'
import Image5 from '../../assets/images/trusted/image (6).webp'
import Image6 from '../../assets/images/trusted/image (7).webp'
//Features Images 
import Authentication from '../../assets/images/feature/image (10).webp'
import EditableHomePage from '../../assets/images/feature/image (13).webp'
import DarkMode from '../../assets/images/feature/image (12).webp'
import FilePreview from '../../assets/images/feature/image (14).webp'
import Performance from '../../assets/images/feature/image (15).webp'
import Sharing from '../../assets/images/feature/image (18).webp'
import SharableLinks from '../../assets/images/feature/image (17).webp'
import Responsive from '../../assets/images/feature/image (16).webp'
import CustomPages from '../../assets/images/feature/image (11).webp'
import Analaytics from '../../assets/images/feature/image (9).webp'
import AdvancedSearch from '../../assets/images/feature/image (8).webp'
import Trash from '../../assets/images/feature/image (19).webp'

//Testimonal Images 

import Profile1 from '../../assets/images/testimonials/image (21).webp'
import Profile2 from '../../assets/images/testimonials/image (22).webp'
import Profile3 from '../../assets/images/testimonials/image (23).webp'
import Profile4 from '../../assets/images/testimonials/image (24).webp'
import Profile5 from '../../assets/images/testimonials/image (25).webp'
import Profile6 from '../../assets/images/testimonials/image (26).webp'


import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Link,
  Slide,
  CssBaseline,
  useScrollTrigger,
  Fab,
  Fade
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logo from '../../assets/images/logo.png';
import landning1 from '../../assets/images/landning/landning1.png';
import landning2 from '../../assets/images/landning/landning2.png';
import landning3 from '../../assets/images/landning/landning3.png';
import { useAuth } from 'Components/context/auth-and-perm/AuthProvider';
import AccountMenu from './MenueUser';

// New Edition 
import './landing-page.css'
import {FaLock, FaBars  , FaUserEdit,FaDownload,FaFolder,FaFolderOpen,FaFolderPlus ,FaCheckCircle,FaCheck,FaTimes,FaFacebookF ,FaTwitter ,FaLinkedinIn        } from "react-icons/fa";
import Sharing1 from '../../assets/images/sharing/service-illustration.webp'
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

// Drawer 
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

//React Fast Marque

import Marquee from "react-fast-marquee";



// Accordion from Material UI
// import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
  


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    }
  }
});

const testimonials = [
  {
    name: 'John Doe',
    feedback: 'WithaqVDR has revolutionized the way we manage our documents.'
  },
  {
    name: 'Jane Smith',
    feedback: "An essential tool for our company's file management."
  }
];

const packages = [
  {
    name: 'Basic Plan',
    price: '$9.99/month',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  },
  {
    name: 'Pro Plan',
    price: '$19.99/month',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
  },
  {
    name: 'Enterprise Plan',
    price: '$49.99/month',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
  }
];

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center'
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

export default function LandingPage(props) {
  const [team,setTeam] = useState(false)

  const [activeSlide, setActiveSlide] = useState(0);
  const { token } = useAuth();

  const images = [landning1, landning2, landning3];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  //Drawer 
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List className='py-[10px] flex justify-center'>
        <img src={logo} alt="" className="logo max-w-[100px]" />
      </List>
      <Divider />
      <List>
        <div className="links text-[18px] flex flex-col items-center !mt-0">
          <a href="/" className='w-full text-center py-[10px] hover:bg-slate-300 duration-200'>Home</a>
          <a href="/" className='w-full text-center py-[10px] hover:bg-slate-300 duration-200'>Pricing</a>
          <a href="/" className='w-full text-center py-[10px] hover:bg-slate-300 duration-200'>Contact</a>
          <a href="/" className='w-full text-center py-[10px] hover:bg-slate-300 duration-200'>Privacy Policy</a>
          <a href="/" className='w-full text-center py-[10px] hover:bg-slate-300 duration-200'>Terms & Condition</a>
          <a href="/" className='w-full text-center py-[10px] hover:bg-slate-300 duration-200'>FAQ</a>
        </div>
      </List>
    </Box>
  );


  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      {/* <AppBar
        // sx={{
        //   borderRadius: 12,
        //   mt: 2,

        //   boxShadow: 3
        // }}
        position="fixed"
        color="default"
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <img src={logo} alt="WithaqVDR Logo" style={{ width: 100, marginRight: 10 }} />
          </Typography>
          <div style={{ justifyContent: 'center', width: '100%', display: 'flex' }}>
            <Link variant="button" color="textPrimary" href="#about" sx={{ mx: 2 }} style={{ textDecoration: 'none' }}>
              About
            </Link>
            <Link variant="button" color="textPrimary" href="#packages" sx={{ mx: 2 }} style={{ textDecoration: 'none' }}>
              Packages
            </Link>
            <Link variant="button" color="textPrimary" href="#testimonials" sx={{ mx: 2 }} style={{ textDecoration: 'none' }}>
              Testimonials
            </Link>
            <Link variant="button" color="textPrimary" href="#footer" sx={{ mx: 2 }} style={{ textDecoration: 'none' }}>
              Contact
            </Link>
          </div>
          {token ? (
            <AccountMenu />
          ) : (
            <Button href="login" color="primary" variant="outlined" sx={{ ml: 'auto' }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar> */}
      {/* <Toolbar  /> */}
      
      <div className="nav-bar sticky top-0 left-0 z-10 min-h-[63px] bg-white flex items-center" >
        <div className="container ">
          <div className="large-screen  hidden lg:flex items-center justify-between">
            <img src={logo} alt="" className="logo max-w-[100px]" />
            <div className="links text-[18px] flex gap-4">
              <a className='hover:text-[#ddd] duration-300' href="/">Home</a>
              <a className='hover:text-[#ddd] duration-300' href="/">Pricing</a>
              <a className='hover:text-[#ddd] duration-300' href="/">Contact</a>
              <a className='hover:text-[#ddd] duration-300' href="/">Privacy Policy</a>
              <a className='hover:text-[#ddd] duration-300' href="/">Terms & Condition</a>
              <a className='hover:text-[#ddd] duration-300' href="/">FAQ</a>
            </div>
            <div className="login">
              <a href="/login" className='flex text-[18px] gap-2 items-center hover:text-[#ddd] duration-300'><span><FaLock /></span><span>Login</span></a>
            </div>
          </div>
          <div className="small-screen flex justify-between items-center lg:hidden ">
            <img src={logo} alt="" className="logo max-w-[100px]" />
            <div>
              <Button onClick={toggleDrawer(true)}><FaBars className='text-[25px]'/></Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </div>
          </div>
        </div>
      </div>
      <div id="back-to-top-anchor"></div>
      <div className="hero py-[80px] md:py-[150px] flex items-center  ">
        <div className="container flex flex-col md:flex-row items-center justify-center gap-[100px]">
          <div className="left text-center md:!text-left w-[300px] lg:w-[520px]  ">
            <h1 className='text-white text-[30px] md:text-[46px]  mb-[20px] '>
            Empower your workspace simplify your files with FileKit
            </h1>
            <p className='text-[#EEE] mb-[40px] text-[14px] md:text-[16px]'>
            Streamline, secure, and share files effortlessly. Boost collaboration and productivity in one intuitive platform.
            </p>
            <div className="buttons flex justify-center md:justify-start gap-3">
              <button className="subscribe px-[18px] md:px-[30px] py-[8px] md:py-[12px] bg-white rounded text-[16px]">
                Subscribe
              </button>
              <button className="subscribe px-[18px] md:px-[30px] py-[8px] md:py-[12px] border border-[#AAA] bg-black text-white rounded text-[16px]">
                Free Trial
              </button>
            </div>
          </div>
          <div className="right">
            <video controls className='w-full max-w-[600px] -mb-[200px] md:mb-0 rounded-2xl min-h-[250px] lg:min-h-[300px] '>
              <source src={MainVideo} type="video/mp4"/>
              <track src="captions_en.vtt" kind="captions"  label="english_captions"></track>
            </video>
          </div>
        </div>
      </div>
      
      <div className="trusted container pt-[160px] md:!pt-[64px] pb-[64px]">
        <h2 className="text-[34px] text-center mb-[28px] md:mb-[64px] w-fit border-b-[4px] border-black mx-auto">Trusted Companies</h2>
        <Marquee >
          <img src={Image1} alt="" className='mx-[50px]'/>
          <img src={Image2} alt="" className='mx-[50px]'/>
          <img src={Image3} alt="" className='mx-[50px]'/>
          <img src={Image4} alt="" className='mx-[50px]'/>
          <img src={Image5} alt="" className='mx-[50px]'/>
          <img src={Image6} alt="" className='mx-[50px]'/>
        </Marquee>
      </div>

      <div className="manage container py-[64px]">
        <div className='info mb-[40px] md:mb-[64px]  text-center relative'>
          <span className=' rounded absolute left-1/2 top-0 h-[4px] w-[100px] bg-[#6493FD] -translate-x-1/2'></span>
          <h1 className='font-bold text-[32px] pt-[18px] md:pt-[24px] mb-[10px] '>
            Manage Your Files With FileKit
          </h1>
          <p className=' text-[14px] md:text-[18px] w-[300px] md:w-[500px] text-[#475569] m-auto'>Safely store and access your files from anywhere with FileKit’s secure, cloud-based platform</p>
        </div>
        <div className="boxs gap-[20px] mx-auto flex flex-col md:flex-row justify-center md:w-[1280px]">
          <div className="box p-[16px] md:p-[40px] md:w-[410px] flex flex-col items-center text-center">
            <div className='w-[50px] h-[50px] flex justify-center items-center bg-[#9F57CB] rounded-[20px]'>
              <FaUserEdit className='text-[25px] md:text-[36px] text-white'/>
            </div>
            <h3 className='mt-[20px] md:mt-[30px] text-[22px] md:text-[24px] text-[#0f172a] mb-[10px] md:mb-[16px]'>Create an account</h3>
            <p className=' text-[#475569] w-[300px]'>
            Quickly sign up to efficiently manage and securely store your files with FileKit’s user-friendly platform.
            </p>
          </div>
          <div className="box p-[16px] md:p-[40px] md:w-[410px] flex flex-col items-center text-center">
            <div className='w-[50px] h-[50px] flex justify-center items-center bg-[#597AEA] rounded-[20px]'>
              <FaDownload  className='text-[25px] md:text-[36px] text-white'/>
            </div>
            <h3 className='mt-[20px] md:mt-[30px] text-[22px] md:text-[24px] text-[#0f172a] mb-[10px] md:mb-[16px]'>Upload your file</h3>
            <p className=' text-[#475569] w-[300px]'>
            Easily upload any file type using our simple, robust drag-and-drop or upload interface for seamless management.
            </p>
          </div>
          <div className="box p-[16px] md:p-[40px] md:w-[410px] flex flex-col items-center text-center">
            <div className='w-[50px] h-[50px] flex justify-center items-center bg-[#57CBAA] rounded-[20px]'>
              <FaUserEdit className='text-[25px] md:text-[36px] text-white'/>
            </div>
            <h3 className='mt-[20px] md:mt-[30px] text-[22px] md:text-[24px] text-[#0f172a] mb-[10px] md:mb-[16px]'>Share file instantly</h3>
            <p className=' text-[#475569] w-[300px]'>
              Instantly share files securely with colleagues or clients, enhancing collaboration and communication. 
            </p>
          </div>
        </div>
      </div>
      
      <div className="sharing bg-[#faf7f7] py-[64px] ">
        <div className="container flex flex-col-reverse md:flex-row items-center justify-center mx-auto gap-[50px] md:gap-[80px]">
          <div className="left flex flex-col">
            <div className="box md:w-[415px] flex gap-[16px] justify-between ">
              <div className="min-w-[50px] h-[50px] md:w-[80px]  md:h-[80px] bg-white flex justify-center items-center rounded-[10px] md:rounded-[20px]">
                <FaFolder className='text-[25px] md:text-[40px] text-[#FFC90D]' />
              </div>
              <div className='md:w-[310px]'>
                <p className='text-[24px] mb-[8px] md:mb-[16px]'>
                  File Sharing
                </p>
                <p className='text-[#475569]'>
                  Share files effortlessly with secure links, enhancing team collaboration and external partnerships.
                </p>
              </div>
            </div>
            <div className="box md:w-[415px] flex gap-[16px] justify-between mt-[36px] md:mt-[80px] ">
              <div className="min-w-[50px] h-[50px] md:w-[80px]  md:h-[80px] bg-white flex justify-center items-center rounded-[10px] md:rounded-[20px]">
                <FaFolderOpen  className='text-[25px] md:text-[40px] text-[#FFC90D]' />
              </div>
              <div className='md:w-[310px]'>
                <p className='text-[24px] mb-[8px] md:mb-[16px]'>
                  Upload Files
                </p>
                <p className='text-[#475569]'>
                  Quickly and efficiently upload files of any size and format with our user-friendly interface.                </p>
              </div>
            </div>
            <div className="box md:w-[415px] flex gap-[16px] justify-between mt-[36px] md:mt-[80px] ">
              <div className="min-w-[50px] h-[50px] md:w-[80px]  md:h-[80px] bg-white flex justify-center items-center rounded-[10px] md:rounded-[20px]">
                <FaFolderPlus  className='text-[25px] md:text-[40px] text-[#FFC90D]' />
              </div>
              <div className='md:w-[310px]'>
                <p className='text-[24px] mb-[8px] md:mb-[16px]'>
                  Collect and receive files
                </p>
                <p className='text-[#475569]'>
                  Streamline the process of collecting files with secure, straightforward, and customizable intake forms.
                </p>
              </div>
            </div>
          </div>
          <div className="right w-fit">
              <img src={Sharing1} alt="" className='md:h-[650px] ' />
          </div>
        </div>
      </div>

      <div className="features py-[64px] md:py-[96px]"

        style={{
          background : 'radial-gradient(44.93% 44.91% at 51.9% 17.51%,rgba(64,193,123,.18) 0,hsla(0,0%,100%,0) 100%),#010609'
        }}
      >
        <div className='info mb-[40px] md:mb-[64px] text-center relative'>
          <span className=' rounded absolute left-1/2 top-0 h-[4px] w-[100px] bg-[#6493FD] -translate-x-1/2'></span>
          <h1 className='font-bold text-[32px] pt-[18px] md:pt-[24px] mb-[10px] text-white'>
          Features
          </h1>
          <p className=' w-[300px] text-[14px] md:text-[18px] md:w-[500px] text-[#cbd5e1] m-auto'>Explore the powerful features of FileKit designed to enhance your file management efficiency and security.  </p>
        </div>
        <div className="big-box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] container mx-auto">
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={Authentication} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Authentication</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Secure user login with robust protection for your app</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={EditableHomePage} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Editable Homepage</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Customize your homepage content with customizable options.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={DarkMode} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Dark Mode</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Enhance visual comfort with an optional darker color scheme.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={FilePreview} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>File Previews</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Quickly view file contents without download the entire file.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={Performance} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>High Performance</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Experience efficiency with optimized performance.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={Sharing} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Sharing</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Facilitate seamless file sharing internally with guaranteed security.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={SharableLinks} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Sharable Links</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Create secure links to share files with other users or members.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={Responsive} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Responsive</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Achieve flawless display on all devices and screen sizes.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={CustomPages} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Custom Pages</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Design pages tailored to specific needs and requirements.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={Analaytics} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Analytics</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Gain insights with detailed analytics on file usage and users activity.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={AdvancedSearch} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Advance Search</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Find files or folders swiftly using powerful and precise search tools.</p>
          </div>
          <div className="feature text-center  py-[32px] px-[16px] md:py-[40px] md:px-[20px] bg-[#010405] rounded-[20px] border border-[#292b30cc]">
            <div className='flex justify-center'>
              <img src={Trash} className='mb-[24px] w-[50px] h-[50px] md:w-[80px] md:h-[80px]' alt="" />
            </div>
            <p className='text-[#cbd5e1] text-[16px] md:text-[18px] mb-[10px]'>Trash</p>
            <p className='text-[#94a3b8] text-[14px] md:text-[16px]'>Easily manage deleted files and restore them as needed.</p>
          </div>
        </div>
      </div>

      <div className="pricing  py-[64px] md:py-[96px]">
        <div className="md:container mx-[16px] md:mx-auto ">
          <div className='info mb-[40px] md:mb-[64px] text-center relative'>
            <span className=' rounded absolute left-1/2 top-0 h-[4px] w-[100px] bg-[#6493FD] -translate-x-1/2'></span>
            <h1 className='font-bold text-[32px] pt-[18px] md:pt-[24px] mb-[10px] '>
            Pricing Plan
            </h1>
            <p className=' w-[300px] text-[14px] md:text-[18px] md:w-[500px] text-[#475569] m-auto'>Choose the right plan for your needs with our flexible, scalable pricing options.</p>

          </div>
          <div className="">
            <div className="switch mb-[50px] flex justify-center items-center gap-[15px] ">
              <span className='text-[#475569] text-[14px] md:text-[16px] '>Individual</span>
              <Switch {...label} onClick={()=> setTeam(!team)}/>
              <span className='text-[#475569] text-[14px] md:text-[16px] '>Team</span>
            </div>
            <div className='plans flex flex-col md:flex-row justify-center gap-[30px]'>
              <div className="plan rounded-xl shadow-lg p-[28px] md:p-[32px] lg:p-[44px] md:w-[380px]">
                <p className='mb-[16px] md:text-[24px]  text-center'>
                  Free
                </p>
                <p className='text-[32px] md:text-[40px] text-center font-bold  '>
                  $0/month
                </p>
                <div className='pt-[48px] md:pt-[64px] flex flex-col gap-3'>
                  <p className='flex items-center gap-2'>
                    <span className='block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck className='text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>300MB Storage</span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='check block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck className='text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Basic Features</span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#fecdd3] flex justify-center items-center'><FaTimes  className=' text-red-600 text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Email Support
                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#fecdd3] flex justify-center items-center'><FaTimes  className=' text-red-600 text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Premium Features

                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#fecdd3] flex justify-center items-center'><FaTimes  className=' text-red-600 text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>24/7 Chat Support
                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#fecdd3] flex justify-center items-center'><FaTimes  className=' text-red-600 text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Unlimited Access
                    </span>
                  </p>
                  <button className="mt-[48px] font-bold subscribe px-[18px] md:px-[30px] py-[8px] md:py-[12px] border border-[#AAA] bg-black text-white rounded text-[16px]">
                    Get Started
                </button>
                </div>
              </div>
              <div className="plan rounded-xl shadow-lg p-[28px] md:p-[32px] lg:p-[44px] md:w-[380px]">
                <p className='mb-[16px] md:text-[24px]  text-center'>
                  {team ? "Basic" : "Premium"}
                </p>
                <p className='text-[32px] md:text-[40px] text-center font-bold  '>
                  {team ? "$300/month" : "$99/month"}
                </p>
                <div className='pt-[48px] md:pt-[64px] flex flex-col gap-3'>
                  <p className='flex items-center gap-2'>
                    <span className='block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck className='text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>{team ? "100GB Storage": "1GB Storage"}</span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='check block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck className='text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Basic Features</span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck  className=' text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Email Support
                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck  className=' text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Premium Features

                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck  className=' text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>24/7 Chat Support
                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#fecdd3] flex justify-center items-center'><FaTimes  className=' text-red-600 text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Unlimited Access
                    </span>
                  </p>
                  <button className="mt-[48px] font-bold subscribe px-[18px] md:px-[30px] py-[8px] md:py-[12px] border border-[#AAA] bg-black text-white rounded text-[16px]">
                    Get Started
                </button>
                </div>
              </div>
              <div className="plan rounded-xl shadow-lg p-[28px] md:p-[32px] lg:p-[44px] md:w-[380px]">
                <p className='mb-[16px] md:text-[24px]  text-center'>
                {team ? "Premium" : "Exclusive"}
                </p>
                <p className='text-[32px] md:text-[40px] text-center font-bold  '>
                  {team ? "$999/month" : "$199/month"}
                </p>
                <div className='pt-[48px] md:pt-[64px] flex flex-col gap-3'>
                  <p className='flex items-center gap-2'>
                    <span className='block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck className='text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>{team ? "500GB Storage" : "10GB Storage"}</span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='check block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck className='text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Basic Features</span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck  className=' text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Email Support
                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck  className=' text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Premium Features

                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck  className=' text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>24/7 Chat Support
                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='close block w-4 h-4 rounded-full bg-[#bbf7d0] flex justify-center items-center'><FaCheck  className=' text-black text-[8px]'/></span>
                    <span className='text-[#475569] text-[14px] md:text-[16px]'>Unlimited Access
                    </span>
                  </p>
                  <button className="mt-[48px] font-bold subscribe px-[18px] md:px-[30px] py-[8px] md:py-[12px] border border-[#AAA] bg-black text-white rounded text-[16px]">
                    Get Started
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <div className="testimonials pb-[64px] md:pb-[96px]">
        <div className='info mb-[40px] md:mb-[64px] text-center relative'>
            <span className=' rounded absolute left-1/2 top-0 h-[4px] w-[100px] bg-[#6493FD] -translate-x-1/2'></span>
              <h1 className='font-bold text-[32px] pt-[18px] md:pt-[24px] mb-[10px] text-[#0f172]'>
              Testimonial
            </h1>
            <p className=' w-[300px] text-[14px] md:text-[18px] md:w-[500px] text-[#475569] m-auto'>Discover what our users say about us. Real feedback from those who trust FileKit daily. </p>
        </div>
        <div className="big-box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 container mx-auto">
          <div className="testimonial p-[24px] rounded shadow-lg ">
            <div className='mb-[24px] md:mb-[28px] flex justify-between items-center'>
              <figure className='flex gap-2 items-center'>
                <img src={Profile1} alt="" className=' w-[48px] h-[48px] rounded-full' />
                <div>
                  <p className='text-[#0f172a]'>Jonathat Taylor</p>
                  <p className='text-[#64748b]'>@jonathattylor </p>
                </div>
              </figure> 
              <FaTwitter className='w-[28px] h-[28px] text-[#359dd2]'/>
            </div>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
              FileKit has completely transformed our workflow with its user-friendly interface and efficiency. Highly recommended for anyone looking for a reliable file management solution.
            </p>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
              8:48 AM . Jul 22,2024
            </p>
          </div>
          <div className="testimonial p-[24px] rounded shadow-lg ">
            <div className='mb-[24px] md:mb-[28px] flex justify-between items-center'>
              <figure className='flex gap-2 items-center'>
                <img src={Profile2} alt="" className=' w-[48px] h-[48px] rounded-full' />
                <div>
                  <p className='text-[#0f172a]'>Isabella Berger</p>
                  <p className='text-[#64748b]'>@isabellaberger </p>
                </div>
              </figure> 
              <FaTwitter className='w-[28px] h-[28px] text-[#359dd2]'/>
            </div>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
            Since we started using FileKit, our teams collaboration has significantly improved. Its a reliable, secure platform that has streamlined our document management processes.            </p>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
              8:48 AM . Jul 22,2024
            </p>
          </div>
          <div className="testimonial p-[24px] rounded shadow-lg ">
            <div className='mb-[24px] md:mb-[28px] flex justify-between items-center'>
              <figure className='flex gap-2 items-center'>
                <img src={Profile3} alt="" className=' w-[48px] h-[48px] rounded-full' />
                <div>
                  <p className='text-[#0f172a]'>Justin Willson</p>
                  <p className='text-[#64748b]'>@justinwillson </p>
                </div>
              </figure> 
              <FaTwitter className='w-[28px] h-[28px] text-[#359dd2]'/>
            </div>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
            Fantastic tool with unbeatable features! FileKits support team is always responsive and helpful, making it an excellent choice for our business needs.            </p>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
              8:48 AM . Jul 22,2024
            </p>
          </div>
          <div className="testimonial p-[24px] rounded shadow-lg ">
            <div className='mb-[24px] md:mb-[28px] flex justify-between items-center'>
              <figure className='flex gap-2 items-center'>
                <img src={Profile4} alt="" className=' w-[48px] h-[48px] rounded-full' />
                <div>
                  <p className='text-[#0f172a]'>Justin Willson</p>
                  <p className='text-[#64748b]'>@justinwillson </p>
                </div>
              </figure> 
              <FaTwitter className='w-[28px] h-[28px] text-[#359dd2]'/>
            </div>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
            FileKit made file management not only easy but also secure. Its features are perfectly tailored for growing businesses like ours, looking for scalable solutions.            </p>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
              8:48 AM . Jul 22,2024
            </p>
          </div>
          <div className="testimonial p-[24px] rounded shadow-lg ">
            <div className='mb-[24px] md:mb-[28px] flex justify-between items-center'>
              <figure className='flex gap-2 items-center'>
                <img src={Profile5} alt="" className=' w-[48px] h-[48px] rounded-full' />
                <div>
                  <p className='text-[#0f172a]'>Jonathat Taylor</p>
                  <p className='text-[#64748b]'>@jonathattylor </p>
                </div>
              </figure> 
              <FaTwitter className='w-[28px] h-[28px] text-[#359dd2]'/>
            </div>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
            A must-have service for any organization, FileKits intuitive design and robust functionality make it indispensable for managing our critical data efficiently.</p>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
              8:48 AM . Jul 22,2024
            </p>
          </div>
          <div className="testimonial p-[24px] rounded shadow-lg ">
            <div className='mb-[24px] md:mb-[28px] flex justify-between items-center'>
              <figure className='flex gap-2 items-center'>
                <img src={Profile6} alt="" className=' w-[48px] h-[48px] rounded-full' />
                <div>
                  <p className='text-[#0f172a]'>Isabella Berger</p>
                  <p className='text-[#64748b]'>@isabellaberger </p>
                </div>
              </figure> 
              <FaTwitter className='w-[28px] h-[28px] text-[#359dd2]'/>
            </div>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
            We rely on FileKit daily for its excellent value and superb data protection system. Gradually has become an essential tool in our data management strategy.            </p>
            <p className='text-[#475569] text-[14px] leading-[28px] mb-[24px]'>
              8:48 AM . Jul 22,2024
            </p>
          </div>
        </div>
      </div>

      <div className="testimonials pb-[64px] md:pb-[96px]">
        <div className='info mb-[40px] md:mb-[64px] text-center relative'>
            <span className=' rounded absolute left-1/2 top-0 h-[4px] w-[100px] bg-[#6493FD] -translate-x-1/2'></span>
              <h1 className='font-bold text-[32px] pt-[18px] md:pt-[24px] mb-[10px] text-[#0f172]'>
              Frequently Ask Question
            </h1>
            <p className=' w-[300px] text-[14px] md:text-[18px] md:w-[500px] text-[#475569] m-auto'>Ask your question and meet</p>
        </div>
        <div className="big-box container mx-auto grid grid-col-1 gap-3 lg:grid-cols-2 lg:gap-5  ">
          <Accordion className='!rounded-[10px] shadow-md  lg:text-[20px] '>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className='text-[#0f172a] py-[10px] px-[20px]'
          >
            01. What is FileKit?
          </AccordionSummary>
          <AccordionDetails className=' text-[#434a54] leading-[24px] py-[10px] px-[20px]'>
            FileKit is a cloud-based file management system designed to help users store, share, and manage their files easily and securely from anywhere.
          </AccordionDetails>
          </Accordion>
          <Accordion className='!rounded-[10px] shadow-md  lg:text-[20px] '>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            className='text-[#0f172a] py-[10px] px-[20px] !border-none'
          >
            02. How does FileKit differ from other cloud storage solutions?
          </AccordionSummary>
          <AccordionDetails className=' text-[#434a54] leading-[24px] py-[10px] px-[20px]'>
          FileKit sets itself apart by offering enhanced collaboration tools, superior file management capabilities, and customizable options tailored to user needs
          </AccordionDetails>
          </Accordion>
          <Accordion className='!rounded-[10px] shadow-md  lg:text-[20px] '>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            className='text-[#0f172a] py-[10px] px-[20px] !border-none'
          >
            03. Is FileKit secure for storing sensitive data?
        </AccordionSummary>
          <AccordionDetails className=' text-[#434a54] leading-[24px] py-[10px] px-[20px]'>
          Yes, FileKit prioritizes security with end-to-end encryption, rigorous compliance with international data protection regulations, and advanced access controls.          
          </AccordionDetails>

          </Accordion>
          <Accordion className='!rounded-[10px] shadow-md  lg:text-[20px] '>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
            className='text-[#0f172a] py-[10px] px-[20px] !border-none'
          >
            04. Can I access my files from any device?
        </AccordionSummary>
          <AccordionDetails className=' text-[#434a54] leading-[24px] py-[10px] px-[20px]'>
          Absolutely, FileKit is fully responsive and accessible from any device with internet connectivity, including smartphones, tablets, and desktop computers.</AccordionDetails>

          </Accordion>
          <Accordion className='!rounded-[10px] shadow-md  lg:text-[20px] '>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5-content"
            id="panel5-header"
            className='text-[#0f172a] py-[10px] px-[20px] !border-none'
          >
            05. How much storage space do I get with FileKit?
        </AccordionSummary>
          <AccordionDetails className=' text-[#434a54] leading-[24px] py-[10px] px-[20px]'>
          FileKit offers various storage plans to suit different needs, starting from basic free plans to more extensive storage options for enterprise users.</AccordionDetails>

          </Accordion>
          <Accordion className='!rounded-[10px] shadow-md  lg:text-[20px] '>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6-content"
            id="panel6-header"
            className='text-[#0f172a] py-[10px] px-[20px] !border-none'
          >
            06. Does FileKit offer collaboration features?
        </AccordionSummary>
          <AccordionDetails className=' text-[#434a54] leading-[24px] py-[10px] px-[20px]'>
          Yes, FileKit includes features like real-time collaboration, file sharing with permissions, and team folders to enhance productivity and teamwork. </AccordionDetails>

          </Accordion>
          <Accordion className='!rounded-[10px] shadow-md  lg:text-[20px] '>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7-content"
            id="panel7-header"
            className='text-[#0f172a] py-[10px] px-[20px] !border-none'
          >
            07. What level of customer support is provided?
        </AccordionSummary>
          <AccordionDetails className=' text-[#434a54] leading-[24px] py-[10px] px-[20px]'>
          FileKit provides 24/7 customer support through multiple channels, including live chat, email, and phone support, ensuring users receive timely assistance.</AccordionDetails>

          </Accordion>
          <Accordion className='!rounded-[10px] shadow-md  lg:text-[20px] '>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            className='text-[#0f172a] py-[10px] px-[20px] !border-none'
          >
            08. Does FileKit has restore functionality?
        </AccordionSummary>
          <AccordionDetails className=' text-[#434a54] leading-[24px] py-[10px] px-[20px]'>
          Yes, FileKit has file restore facility from trash.You will be able to restore your trashed file from trash menu</AccordionDetails>

          </Accordion>

          

        </div>
        <div className='mt-[48px] md:mt-[64px] flex flex-col items-center text-center'>
          <h2 className='md:text-[18px] lg:text-[28px] text-[#0f172A] lg:w-[380px] mb-[20px] font-bold'>
            Do you have any quesiton? Please ask here we ready to support
          </h2>
          <button className='text-[14px] md:text-[18px] py-[16px] px-[32px] bg-[#000] font-bold rounded-xl text-white'>
            <a href="">Contact Us</a>
          </button>
        </div>
      </div>

      <div className="footer  pt-[48px] pb-[0] md:pt-[64px] md:pb-[8px] bg-[#010609]">
        <div className="content-top text-center flex justify-center">
          <div className='mb-[64px]'>
            <p className='mb-[6px] text-[12px] text-[#6493fd] md:text-[16px] '>
            SUBSCRIBE TO NEWSLETTER
            </p>
            <h2 className='text-[20px] mb-[16px] text-white md:text-[32px] w-[300px] md:w-[580px] '>
            Stay Up To Date with <span className=' text-[#2c9f6f]'>FileKits</span> Latest Updates and Promotions
            </h2>
            <p className='text-[#cbd5e1] text-[14px] !text-center mb-[40px] w-[300px] md:w-[450px] mx-auto '>
            Be the first to know about our latest updates, exclusive promotions, and insider tips on FileKit!
            </p>  
            <div className='flex justify-center'>
              <button className='text-white text-[14px] py-[12px] px-[32px] md:py-[16px] md:px-[48px] border !border-[#2c9f6f] rounded'>Notify Me</button>
            </div>
          </div>
        </div>
        <div className="social flex gap-3 justify-center pb-[30px]">
          <FaFacebookF className='text-white text-[14px] md:text-[20px] '/>
          <FaTwitter className='text-white text-[14px] md:text-[20px] '/>
          <FaLinkedinIn className='text-white text-[14px] md:text-[20px] '/>
        </div>
        <div className="content-bottom flex flex-col-reverse md:flex-row items-center gap-3 md:justify-between  text-[14px] text-[#e5e7ebcc]   md:text-[18px] py-[32px] container mx-auto border-t border-[#434a54]">
          <p>
            &copy; 2024 <span className="font-bold">REDQ</span>. All rights reseved
          </p>
          <div className="flex gap-3">
            <a href="/">Support</a>
            <a href="/">Privacy</a>
            <a href="/">Terms&Condition</a>
          </div>
        </div>
      </div>


      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      
    </ThemeProvider>
  );
}
