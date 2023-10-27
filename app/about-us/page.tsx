'use client'
import {Grid, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import TopImage from "../../components/TopImage";
import {makeStrapiRequest} from "@/utils/makeStrapiRequest";
import parse from "html-react-parser";
import style from './AboutUs.module.scss'


async function getAboutUsData (lang: string) {
    const {data} = await makeStrapiRequest.get(`/about-us?locale=${lang}`)

    return data
}
export default function AboutUs() {
    const [aboutUsItems, setAboutUsItems] = useState<any>()

    useEffect(() => {
        getAboutUsData(localStorage.getItem('language') || 'ro').then((res) => {
            setAboutUsItems(res.data)
        })
    }, [])


    return (
        <>
            <TopImage/>
            {
                aboutUsItems && <Grid container direction="column">
                    <br /> <br />
                    <Grid item container direction="row" sx={{marginBottom: '20px'}}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Typography variant='h4' className={style.about}
                                        dangerouslySetInnerHTML={{
                                            __html: `${aboutUsItems?.attributes?.title}`
                                        }}
                            >
                            </Typography>
                            <br/>
                            <Typography
                            >
                                {parse(String(aboutUsItems?.attributes?.text))}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <br/> <br/> <br/>
                </Grid>
            }
        </>
    )
}