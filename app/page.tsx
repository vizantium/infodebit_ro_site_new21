'use client'
import styles from './page.module.css'
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import {makeStrapiRequest} from "@/utils/makeStrapiRequest";
import {useEffect, useState} from "react";
import parse from "html-react-parser";

async function getHomeData (lang: string) {
    const {data} = await makeStrapiRequest.get(`/home-page?locale=${lang}`)

    return data
}

export default  function Home() {
    const [homeData, setHomeData] = useState<any>()

    useEffect(() => {
        getHomeData(localStorage.getItem('language') || 'ro').then((res) => {
            setHomeData(res)
        })

    }, [])



  return (
        <Grid className={styles.mainGrid}>
            {homeData && <Grid className={styles.homeInfo}>
                <Grid className={styles.mainText}>
                    {parse(homeData.data.attributes?.main_text)}
                </Grid>
                <Grid className={styles.gridButtons}>
                    <Link href={`/${homeData.data.attributes?.button_left_link}`}>
                        <Button className={styles.button} sx={{
                            color: '#666666', "&:hover": {
                                background: '#666666',
                                color: 'white'
                            }
                        }}>
                            {homeData.data.attributes?.button_left_text}
                        </Button>
                    </Link>
                    <Link href={`/${homeData.data.attributes?.button_right_link}`}>
                        <Button className={styles.button} sx={{
                            color: 'white', background: '#666666', "&:hover": {
                                color: "#666666"
                            }
                        }}>
                            {homeData.data.attributes?.button_right_text}
                        </Button>
                    </Link>
                </Grid>
            </Grid>}
        </Grid>
  )
}


