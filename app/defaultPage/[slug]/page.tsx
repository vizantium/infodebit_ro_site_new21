'use client'
import {makeStrapiRequest} from "@/utils/makeStrapiRequest";
import {useEffect, useState} from "react";
import parse from 'html-react-parser';
import {Grid, Typography} from "@mui/material";
import TopImage from "./../../../components/TopImage";
async function getDefaultPage(lang: string, link: string) {
    const {data} = await makeStrapiRequest.get(`/default-pages?populate=*&filters[link][$eq]=defaultPage/${link}&locale=${lang}`)

    return data
}

export default function DefaultPage ({ params }: any) {
    const [pageItems, setPageItems] = useState<any>()

    useEffect( ()  => {
        getDefaultPage(localStorage.getItem('language') || 'ro', params.slug).then((res) => {
            setPageItems(res.data[0])
        })
    }, [])


    return (
        <>
            {
                pageItems && <>
                    <TopImage/>
                    <Grid container direction="column">
                        <br /> <br />
                        <Grid item container direction="row" sx={{marginBottom: '20px'}}>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <Typography variant='h4' >
                                    {parse(String(pageItems.attributes?.title))}
                                </Typography>
                                {
                                    pageItems.attributes?.img?.data?.attributes?.url &&
                                    <img alt={'defaultImg'} src={`${process.env.NEXT_PUBLIC_CMS_URL}` + pageItems.attributes?.img?.data?.attributes?.url} style={{height: '200px', marginTop: '20px', marginBottom: '20px'}}/>
                                }
                                <Typography>
                                    {parse(String(pageItems.attributes?.text))}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                        <br/> <br/> <br/>
                    </Grid>
                </>
            }
        </>
    )
}