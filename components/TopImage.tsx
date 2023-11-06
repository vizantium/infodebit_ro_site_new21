import React from 'react';
import { Grid } from '@mui/material';
import style from './TopImage.module.scss'
import Image from "next/image";


const TopImage = () => {

  return (
    <Grid item>
        <Image width={2000} height={260} alt='topImg' src='/topImg.jpg' className={style.topImage}/>
    </Grid>
  )
}

export default TopImage;