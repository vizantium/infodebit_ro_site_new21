'use client'
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import {AppBar, Grid, IconButton, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ro from "../public/ro.png"
import en from "../public/en.png";
import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from "next/link";

import {makeStrapiRequest} from "@/utils/makeStrapiRequest";
import styles from './Header.module.scss'


async function getHeaderData () {
    const {data} = await makeStrapiRequest.get(`/header-items?populate=*&locale=ro`)
    return data
}

export default function Header(){
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"))
    const [openDrawer, setOpenDrawer] = useState(false);
    const divBlock = useRef(null);

    const handleChange = (e: any, newValue: any) => {
        setValue(newValue)
    }
    const [language, setLanguage] = useState('ro')
    const [headerData, setHeaderData] = useState<any>()

    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget)
        setOpenMenu(true)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setOpenMenu(false)
    }

    useEffect(() => {
        setLanguage(localStorage.getItem('language') || 'ro')
        getHeaderData().then((res) => {
            setHeaderData(res)
        })
    }, [])


    function handleClickLanguage(lang: any) {
        setLanguage(lang)
        localStorage.setItem('language', lang)
        document.location.reload()
    }

    const tabs = (
        <React.Fragment>
            <Tabs  value={value} onChange={handleChange}
                   TabIndicatorProps={{style: {background:'white'}}}
                    sx={{borderBottom: 'none'}} className={styles.tabContainer}>
                {
                   headerData && headerData.data.map((item: any, index: any) => (
                        <Grid sx={{paddingLeft: '-10px', borderBottom: 'none'}} key={index} ref={divBlock} className={styles.dropdown}>
                            <Link style={{textTransform: 'none', marginLeft: '-25px'}} href={`/${item.attributes?.link}`}>
                                <Tab sx={{minWidth: 10, textTransform: 'none', fontSize: '16px', fontWeight: 700,
                                    marginTop: '9px'}} className={styles.tab} label={item.attributes?.title} disableRipple/>
                            </Link>
                            {item.attributes?.header_item_dropdown?.length > 0 && <ArrowDropDownIcon color={'action'} sx={{opacity: '0.9', marginTop: '20px', marginLeft: '-15px', paddingRight: '5px'}}/>}
                            {
                                item.attributes?.header_item_dropdown?.length > 0 && <Grid  className={styles.dropdownContent}>
                                    {
                                        item.attributes?.header_item_dropdown?.map((itemDrop: any, index: any) => (
                                            <Grid key={index} sx={{display: 'flex', flexDirection: 'column'}}>
                                                <Link style={{borderBottom: '1px', textDecoration: 'none', fontWeight: '500', fontSize: '16px', color: 'black', opacity: '0.9'}}
                                                      className={styles.noActiveLink} href={`/${itemDrop.link}`}>
                                                    <Grid sx={{padding: '20px 0px 20px 0px', margin: '0 20px',
                                                        borderBottom: `${index === item.attributes?.header_item_dropdown?.length - 1 ? 'none' : '1px solid #b6b4b4' }`,
                                                        textDecoration: 'none', fontWeight: '500', fontSize: '16px', color: 'black',}}>
                                                        {/*<Link style={{borderBottom: '1px', textDecoration: 'none', fontWeight: '500', fontSize: '16px', color: 'black', opacity: '0.9'}} to={`/${itemDrop.link}`}*/}
                                                        {/*>{itemDrop.title}</Link>*/}

                                                        {itemDrop.title}
                                                    </Grid>
                                                </Link>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            }
                        </Grid>
                    ))
                }
                <Grid className={styles.arrangeDrop} item aria-owns={anchorEl ? "simple-menu" : undefined}
                      sx={{paddingTop: '8px'}}
                      aria-haspopup={anchorEl ? "true" : undefined}
                      onClick={event => handleClick(event)}>
                    <Typography sx={{display: 'flex', alignItems: 'center'}}>{language === 'ro' ? <img alt={'ro'} src='/ro.png' className={styles.space} style={{ marginTop: '2px'}}/> : <img alt={'en'} src='/en.png' className={styles.space} style={{ marginTop: '2px'}}/>}
                        <ArrowDropDownIcon color={'action'} sx={{opacity: '0.9', marginTop: '2px'}}/></Typography>
                </Grid>
            </Tabs>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                // classes={{paper: classes.menu}}
                elevation={0}
                disableScrollLock={ true }
            >
                <MenuItem  onClick={()=> handleClickLanguage("ro")} style ={{color: "ro" === language ? "#0795fe" : "black"}}>
                    <img alt={'ro'} src='/ro.png' className={styles.space}/> <span className={styles.languageStyle}>RO</span></MenuItem>
                <MenuItem  onClick={()=> handleClickLanguage("en")} style ={{color: "en" === language ? "#0795fe" : "black"}}>
                    <img alt={'en'} src='/en.png' className={styles.space}/> <span className={styles.languageStyle}>EN</span></MenuItem>
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer} onClose={() => setOpenDrawer(false)}
                             onOpen={() => setOpenDrawer(true)} classes={{paper: styles.drawer}}>
                <List disablePadding className={styles.arrangeDrower}>
                    {

                        headerData && headerData.data.map((item: any) => (<>
                                <Link style={{textDecoration: 'none'}} href={`/${item.attributes?.link}`}>
                                    <ListItem onClick={() => {setOpenDrawer(false); setValue(0)}} sx={{color: 'rgba(0, 0, 0, 0.87)'}}
                                              className={value === 0 ? styles.drawerListSelected : "undefined"}
                                    >
                                        <ListItemText  disableTypography >{item.attributes?.title}</ListItemText>
                                        {item.attributes?.header_item_dropdown?.length > 0 && <ArrowDropDownIcon color={'action'} sx={{opacity: '0.9'}}/>}

                                    </ListItem>
                                </Link>
                                {
                                    item.attributes?.header_item_dropdown?.map((itemDrop: any, index: any) => (
                                        <Link style={{textDecoration: 'none'}} key={index} href={`/${itemDrop.link}`}>
                                            <ListItem sx={{marginLeft: '20px', color: 'rgba(0, 0, 0, 0.87)'}} onClick={() => {setOpenDrawer(false); setValue(0)}}
                                                      className={value === 0 ? styles.drawerListSelected : "undefined"}
                                            >
                                                <ListItemText  disableTypography>{itemDrop.title}</ListItemText>
                                            </ListItem>
                                        </Link>
                                    ))
                                }
                            </>
                        ))
                    }
                    <ListItem onClick={()=> handleClickLanguage("ro")} style ={{color: "ro" === language ? "#0795fe" : "black"}}>
                        <img alt={'ro'} src='/ro.png' className={styles.space}/>
                        <span className={styles.boldText}>RO</span></ListItem>
                    <ListItem onClick={()=> handleClickLanguage("en")} style ={{color: "en" === language ? "#0795fe" : "black"}}>
                        <img alt={'en'} src='/en.png' className={styles.space}/>
                        <span className={styles.boldText}>EN</span> </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton className={styles.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={styles.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    )

    return (
        <AppBar style={{position: 'fixed'}} position="fixed" className={styles.appbar} sx={{backgroundColor: 'white'}}>
            <div className={styles.toolbar} style={{display: 'flex', justifyContent: 'space-between'}} >
                <Link href={'/'} style={{marginTop: '5px'}}>
                    <Button disableRipple
                            onClick={() => {setOpenDrawer(false); setValue(0)}} className={styles.logoContainer}>
                        <img alt='company logo' src='/logo.png'/>
                    </Button>
                </Link>
                {matches ? drawer : tabs}
            </div>
        </AppBar>
    )
};

