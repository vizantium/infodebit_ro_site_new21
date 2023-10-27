import React from 'react';
import {Grid, Typography} from "@mui/material";
import styles from "./Bottom.module.scss";
import {makeStrapiRequest} from "@/utils/makeStrapiRequest";
import Link from "next/link";


async function getHeaderData () {
    const {data} = await makeStrapiRequest.get(`/header-items?populate=*&locale=ro`)
    return data.data
}

async function getBottomData () {
    const {data} = await makeStrapiRequest.get(`/bottom?populate=*&locale=ro`)
    return data.data
}


export default async function Bottom () {
    const bottomData = await getBottomData()
    const headerData = await getHeaderData()

    return (
        <>
            <Grid sx={{display: 'flex', width: '100%', justifyContent: 'center', background: '##FFFEFF', minHeight: '240px', alignItems: 'center', color: '#2F2B57', flexDirection: 'column'}}>
                <div className={styles.line}/>
                <Grid container sx={{maxWidth: '1350px', paddingTop: '65px', paddingBottom: '55px', paddingLeft: '15px', paddingRight: '15px'}}>
                    <Grid sx={{paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} className={styles.rightBottom} item lg={4} xs={12}>
                        <Typography sx={{fontSize: '20px', fontWeight: 600}}>
                            {bottomData.attributes?.left.title}
                        </Typography>
                        <Typography sx={{marginTop: '13px', color: '#2F2B57', textDecoration: 'none'}}>
                            {bottomData.attributes?.left.text}
                        </Typography>
                        <Grid sx={{marginTop: '66px'}}>
                            <a rel="noopener" href={`${bottomData.attributes?.right.facebookLink === undefined ? 'https://facebook.com/infodebitromania' : bottomData.attributes?.right.facebookLink}`} target="_blank">
                                <img alt={'facebook'} src='/facebook.png' style={{width: '39px', cursor: 'pointer'}}/>
                            </a>
                            <a rel="noopener" href={`${bottomData.attributes?.right.viberLink}`} target="_blank">
                                <img alt={'viber'} src='/viber.png' style={{width: '39px', cursor: 'pointer', marginLeft: '5px'}}/>
                            </a>
                            <a rel="noopener" href={`${bottomData.attributes?.right.telegramLink}`} target="_blank">
                                <img alt={'telegram'} src='/telegram.png' style={{width: '39px', cursor: 'pointer', marginLeft: '5px'}}/>
                            </a>
                            <a rel="noopener" href={`${bottomData.attributes?.right.whatsappLink}`} target="_blank">
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
                                headerData.map((item: any, index: any) => (
                                    <Link key={index} style={{textDecoration: 'none'}} href={`/${item.attributes?.link}`}>
                                        <Typography sx={{marginTop: '13px', color: '#2F2B57', textDecoration: 'none'}} className={styles.textCenter}>
                                            {item.attributes?.title}
                                        </Typography>
                                    </Link>
                                ))
                            }

                        </Grid>
                    </Grid>
                    <Grid lg={4} xs={12} item sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end'}} className={styles.leftBottom}>
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
            </Grid>
        </>
    );
};

