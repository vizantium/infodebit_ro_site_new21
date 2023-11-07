import React from 'react';
import { Grid } from '@mui/material';
import style from './TopImage.module.scss'
import Image from "next/image";


const TopImage = () => {

  return (
    <Grid item>
        <Image priority={true} width={2000} height={260} alt='topImg' src='/topImg.webp' className={style.topImage}/>
    </Grid>
  )
}

export default TopImage;