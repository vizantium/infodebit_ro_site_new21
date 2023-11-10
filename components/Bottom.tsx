'use client'
import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import styles from "./Bottom.module.scss";
import {makeStrapiRequest} from "@/utils/makeStrapiRequest";
import Link from "next/link";
import parse from "html-react-parser";


async function getBottomData(lang: string) {
    const {data} = await makeStrapiRequest.get(`/bottom?populate[left][populate]=bottom_left_icons.icon&populate[left][populate]=bottom_left_icons_big.icon&populate[right][populate]=bottom_right_icons.icon&populate[left][populate]=bottom_left&populate[center][populate]=bottom_center&populate[right][populate]=bottom_right&locale=${lang}`)
    return data.data
}


export default function Bottom() {
    const [bottomData, setBottomData] = useState<any>()
    const [lang, setLang] = useState('')
    useEffect(() => {
        setLang(localStorage.getItem('language') || 'ro')
        getBottomData(localStorage.getItem('language') || 'ro').then((res) => {
            setBottomData(res)
        })
    }, [])

    const extractPhoneNumbers = (inputString: string | null | undefined) => {
        if (!inputString) {
            return [];
        }

        const phoneRegex = /\b\d{4,}\b/g;

        const phoneNumbers = inputString.match(phoneRegex);

        return phoneNumbers || [];
    };


    return (
        <>

            <Grid sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                background: '##FFFEFF',
                minHeight: '240px',
                alignItems: 'center',
                color: '#2F2B57',
                flexDirection: 'column'
            }}>
                <div className={styles.line}/>
                {
                    bottomData && <Grid container sx={{
                        maxWidth: '1350px',
                        paddingTop: '65px',
                        paddingBottom: '55px',
                        paddingLeft: '15px',
                        paddingRight: '15px'
                    }}>
                        <Grid sx={{paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
                              className={styles.rightBottom} item lg={4} xs={12}>
                            <Typography sx={{fontSize: '20px', fontWeight: 600}}>
                                {bottomData.attributes?.left.title}
                            </Typography>
                            {
                                bottomData && bottomData.attributes?.left?.bottom_left?.map((item: any, index: any) => (
                                    item.type == 'string' ? <Typography key={index} className={styles.leftLink}>
                                            {item.text}
                                        </Typography>
                                        : <Link key={index} className={styles.leftLink} href={`${item.link}`} target="_blank">
                                            {item.text}
                                        </Link>
                                ))
                            }
                            <Grid sx={{marginTop: '26px'}}>
                                {
                                    bottomData && bottomData.attributes?.left?.bottom_left_icons?.map((item: any, index: any) => (
                                        item.link === null ? <img key={index} alt={'img'}
                                                                  src={'http://localhost:1337' + item.icon?.data?.attributes?.url}
                                                                  style={{
                                                                      maxWidth: '500px',
                                                                      maxHeight: '200px',
                                                                      marginRight: '5px'
                                                                  }}/> :
                                            <a key={index} rel="noopener" href={`${item.link === undefined ? '' : item.link}`}
                                               target="_blank">
                                                <img alt={'img'}
                                                     src={'http://localhost:1337' + item.icon?.data?.attributes?.url} style={{
                                                    cursor: 'pointer',
                                                    maxWidth: '500px',
                                                    maxHeight: '200px',
                                                    marginRight: '5px'
                                                }}/>
                                            </a>

                                    ))
                                }
                            </Grid>
                            <Grid sx={{marginTop: '26px'}} className={styles.icons}>
                                {
                                    bottomData && bottomData.attributes?.left?.bottom_left_icons_big?.map((item: any, index: any) => (
                                        item.link === null ? <img key={index} alt={'img'}
                                                                  src={'http://localhost:1337' + item.icon?.data?.attributes?.url}
                                                                  style={{
                                                                      maxWidth: '500px',
                                                                      maxHeight: '200px',
                                                                      marginRight: '8px'
                                                                  }}/> :
                                            <a key={index} rel="noopener" href={`${item.link === undefined ? '' : item.link}`}
                                               target="_blank">
                                                <img alt={'img'}
                                                     src={'http://localhost:1337' + item.icon?.data?.attributes?.url} style={{
                                                    maxWidth: '500px',
                                                    maxHeight: '200px',
                                                    cursor: 'pointer',
                                                    marginRight: '8px'
                                                }}/>
                                            </a>

                                    ))
                                }
                            </Grid>
                        </Grid>
                        <Grid lg={4} xs={12} item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography sx={{fontSize: '20px', fontWeight: 600}} className={styles.textContact}>
                                    {bottomData.attributes?.center.title}
                                </Typography>
                                {
                                    bottomData && bottomData.attributes?.center?.bottom_center?.map((item: any, index: any) => (
                                        item.type == 'string' ? <Typography key={index} className={styles.leftLink}>
                                                {item.text}
                                            </Typography>
                                            :
                                            <Link key={index} className={styles.leftLink} href={`${item.link}`} target="_blank">
                                                {item.text}
                                            </Link>
                                    ))
                                }

                            </Grid>
                        </Grid>
                        <Grid lg={4} xs={12} item
                              sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingLeft: '20px'}}
                              className={styles.leftBottom}>
                            <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography sx={{fontSize: '20px', fontWeight: 600}} className={styles.textContact}>
                                    {bottomData.attributes?.right.title}
                                </Typography>
                                {
                                    bottomData && bottomData.attributes?.right?.bottom_right?.map((item: any, index: any) => (
                                        item.type == 'string' ? <Typography key={index} className={styles.leftLink}>
                                                {item.text}
                                            </Typography>
                                            : item.type == 'email' ?
                                                <a key={index} className={styles.leftLink} href={`mailto:${item.text}`}
                                                   target="_blank">
                                                    {item.text}
                                                </a> : item.type == 'phone' ? <div className={styles.leftLink}>
                                                    {item.text}
                                                    {
                                                        extractPhoneNumbers(item.link).map((itemNum, index) => (
                                                            <a className={styles.leftLink} style={{textDecoration: 'none', color: 'rgb(0, 0, 0)'}} key={index}
                                                               href={`tel:${item}`} target="_blank">
                                                                {itemNum}{index !== extractPhoneNumbers(item.link).length - 1 && '/'}
                                                            </a>
                                                        ))
                                                    }
                                                    </div> : <Link key={index} className={styles.leftLink} href={`${item.link}`}
                                                                  target="_blank">
                                                    {item.text}
                                                </Link>
                                    ))
                                }
                                <div style={{marginTop: '15px'}}/>
                                {
                                    bottomData && bottomData.attributes?.right?.bottom_right_icons?.map((item: any, index: any) => (
                                        item.link === null ? <img key={index} alt={'img'}
                                                                  src={'http://localhost:1337' + item.icon?.data?.attributes?.url}
                                                                  style={{
                                                                      maxWidth: '400px',
                                                                      maxHeight: '200px',
                                                                      marginRight: '8px'
                                                                  }}/> :
                                            <a key={index} rel="noopener" href={`${item.link === undefined ? '' : item.link}`}
                                               target="_blank">
                                                <img alt={'img'}
                                                     src={'http://localhost:1337' + item.icon?.data?.attributes?.url} style={{
                                                    maxWidth: '400px',
                                                    maxHeight: '200px',
                                                    cursor: 'pointer',
                                                    marginRight: '8px'
                                                }}/>
                                            </a>

                                    ))
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </>
    );
};

