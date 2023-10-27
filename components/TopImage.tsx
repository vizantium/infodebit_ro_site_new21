import React from 'react';
import { Grid } from '@mui/material';
import style from './TopImage.module.scss'


const TopImage = () => {

  return (
    <Grid item>
        <img alt='topImg' src='/topImg.jpg' className={style.topImage}/>
    </Grid>
  )
}

export default TopImage;