'use client'
import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import styles from "./Bottom.module.scss";
import {makeStrapiRequest} from "@/utils/makeStrapiRequest";
import Link from "next/link";


async function getHeaderData () {
    const {data} = await makeStrapiRequest.get(`/header-items?populate=*&filters[show_in_bottom]=true`)
    return data.data
}

async function getBottomData (lang: string) {
    const {data} = await makeStrapiRequest.get(`/bottom?populate=*&locale=${lang}`)
    return data.data
}


export default function Bottom () {
    const [bottomData, setBottomData] = useState<any>()
    const [headerData, setHeaderData] = useState<any>()
    const [lang, setLang] = useState('')
    useEffect(() => {
        setLang(localStorage.getItem('language') || 'ro')
        getBottomData(localStorage.getItem('language') || 'ro').then((res) => {
            setBottomData(res)
            console.log(res)
        })
        getHeaderData().then((res) => {
            console.log(res)
            setHeaderData(res)
        })
    }, [])

    return (
        <>

            <Grid sx={{display: 'flex', width: '100%', justifyContent: 'center', background: '##FFFEFF', minHeight: '240px', alignItems: 'center', color: '#2F2B57', flexDirection: 'column'}}>
                <div className={styles.line}/>
                {
                    bottomData && <Grid container sx={{maxWidth: '1350px', paddingTop: '65px', paddingBottom: '55px', paddingLeft: '15px', paddingRight: '15px'}}>
                        <Grid sx={{paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} className={styles.rightBottom} item lg={4} xs={12}>
                            <Typography sx={{fontSize: '20px', fontWeight: 600}}>
                                {bottomData.attributes?.left.title}
                            </Typography>
                            <Typography sx={{marginTop: '13px', color: '#2F2B57', textDecoration: 'none'}}>
                                {bottomData.attributes?.left.text}
                            </Typography>
                            <Link className={styles.leftLink} href={`/${bottomData.attributes?.left.termeni_link}`} target="_blank">
                                {bottomData.attributes?.left.termeni_name}
                            </Link>
                            <Link className={styles.leftLink} href={`/${bottomData.attributes?.left.policyCookie_link}`} target="_blank">
                                {bottomData.attributes?.left.policyCookie_name}
                            </Link>
                            <Link className={styles.leftLink} href={`${bottomData.attributes?.left.anpc_link}`} target="_blank">
                                {bottomData.attributes?.left.anpc_name}
                            </Link>
                            <Grid sx={{marginTop: '26px'}}>
                                <a rel="noopener" href={`${bottomData.attributes?.left.facebookLink === undefined ? 'https://facebook.com/infodebitromania' : bottomData.attributes?.right.facebookLink}`} target="_blank">
                                    <img alt={'facebook'} src='/facebook.png' style={{width: '39px', cursor: 'pointer'}}/>
                                </a>
                                <a rel="noopener" href={`${bottomData.attributes?.left.viberLink}`} target="_blank">
                                    <img alt={'viber'} src='/viber.png' style={{width: '39px', cursor: 'pointer', marginLeft: '5px'}}/>
                                </a>
                                <a rel="noopener" href={`${bottomData.attributes?.left.telegramLink}`} target="_blank">
                                    <img alt={'telegram'} src='/telegram.png' style={{width: '39px', cursor: 'pointer', marginLeft: '5px'}}/>
                                </a>
                                <a rel="noopener" href={`${bottomData.attributes?.left.whatsappLink}`} target="_blank">
                                    <img alt={'whatsapp'} src='/whatsapp.png' style={{width: '39px', cursor: 'pointer', marginLeft: '5px'}}/>
                                </a>
                            </Grid>
                        </Grid>
                        <Grid lg={4} xs={12} item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                            <Grid sx={{display: 'flex', flexDirection: 'column'}} >
                                <Typography sx={{fontSize: '20px', fontWeight: 600}} className={styles.textContact}>
                                    {bottomData.attributes?.center.title}
                                </Typography>
                                {
                                   headerData && headerData.map((item: any, index: any) => (
                                        <Link key={index} style={{textDecoration: 'none'}} href={`/${item.attributes?.link}`}>
                                            <Typography sx={{marginTop: '13px', color: '#2F2B57', textDecoration: 'none'}} className={styles.textCenter}>
                                                {lang === 'ro' ? item.attributes?.title_RO : item.attributes?.title_EN}
                                            </Typography>
                                        </Link>
                                    ))
                                }

                            </Grid>
                        </Grid>
                        <Grid lg={4} xs={12} item sx={{display: 'flex', flexDirection: 'column',  alignItems: 'flex-end'}} className={styles.leftBottom}>
                            <Grid>
                                <Typography sx={{ fontSize: '20px', fontWeight: 600}} className={styles.textContact}>
                                    {bottomData.attributes?.right.title}
                                </Typography>
                                <Typography sx={{marginTop: '15px', marginBottom: '15px'}} className={styles.textCenter}>
                                    {bottomData.attributes?.right.address}
                                </Typography>
                                <a style={{color: 'rgb(47, 43, 87)', textDecoration: 'none', fontFamily: 'Roboto, Helvetica, Arial, sans-serif'}} className={styles.textCenter} href={`mailto:${bottomData.attributes?.right.email}`}>
                                    {bottomData.attributes?.right.email}
                                </a>
                                <Typography sx={{marginTop: '15px'}} className={styles.textCenter}>
                                    {bottomData.attributes?.right.time}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </>
    );
};

