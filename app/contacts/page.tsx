'use client'
import React, {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import {Alert, Grid, Typography} from '@mui/material';
import ReCAPTCHA from "react-google-recaptcha";
import starImg from "../assets/star.png";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import useMediaQuery from '@mui/material/useMediaQuery';
import style from './Contacts.module.scss'
import Button from "@mui/material/Button";
import TopImage from "../../components/TopImage";
import {makeStrapiRequest} from "@/utils/makeStrapiRequest";
import parse from "html-react-parser";
import * as emailjs from "@emailjs/browser";


async function getContactData (lang: string) {
    const {data} = await makeStrapiRequest.get(`/contact?locale=${lang}`)

    return data
}

export default function Contacts() {
    // const classes = useStyles();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const [verified, setVerified] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false)
    const [contactItems, setContactItems] = useState<any>()
    const [language, setLanguage] = useState('ro')

    useEffect(() => {
        setLanguage(localStorage.getItem('language') || 'ro')
        getContactData(localStorage.getItem('language') || 'ro').then((res) => {
            setContactItems(res.data)
        })

    }, [])

    function onChange() {
        setVerified(true);
    }

    const handleName = (e: any) => {
        setName(e.target.value)
    }
    const handleEmail = (e: any) => {
        setEmail(e.target.value)
    }
    const handleSubject = (e: any) => {
        setSubject(e.target.value)
    }
    const handleMessage = (e: any) => {
        setMessage(e.target.value)
    }

    const formSubmit = async (e: any) => {
        e.preventDefault()
        setError(false)
        let data = {
            name: name,
            email: email,
            subject: subject,
            message: message
        }
        emailjs.send('service_tk6bisj', 'template_bz4wr5c', data, 'xSDtHUimPcXfbQTtH')
            .then((result) => {
                console.log(result);
            }, (error) => {
                console.log(error);
            });
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
    }

    return (
        <>
            {
                contactItems && <>
                    <TopImage/>
                    <React.Fragment>
                        <br/> <br/> <br/>
                        <Grid container direction="row">
                            <Grid item xs={11} md={5} lg={4}>
                                <Grid item container direction="column" ml={matchesMD ? 4 : 25} xs={10.5} sm={30}>
                                    <Typography variant="h5" className={style.titleContacts}>{parse(String(contactItems.attributes?.title_left))}</Typography>
                                    <br/> <br/>
                                    <Typography
                                        className={style.titleContacts}
                                        sx={{marginTop: '0'}}
                                        dangerouslySetInnerHTML={{
                                            __html: `${contactItems.attributes?.credit_history_left}`
                                        }}
                                    ></Typography>
                                    <br/>
                                    <Typography
                                        className={style.textContacts2}
                                        sx={{marginTop: '16px'}}
                                        dangerouslySetInnerHTML={{
                                            __html: `${contactItems.attributes?.social_headquarters_left}`
                                        }}
                                    >
                                    </Typography>
                                    <br/>
                                    <Typography
                                        sx={{marginTop: '20px'}}
                                        dangerouslySetInnerHTML={{
                                            __html: `${contactItems.attributes?.cui_left}`
                                        }}
                                    ></Typography>
                                    <Typography
                                        sx={{marginTop: '0'}}
                                        dangerouslySetInnerHTML={{
                                            __html: `${contactItems.attributes?.cif_left}`
                                        }}
                                    ></Typography>
                                    <br/>
                                    <Typography
                                        sx={{marginTop: '20px'}}
                                        className={style.textContacts3}
                                    >
                                        <a href="mailto:info@infodebit.ro"
                                           style={{textDecoration: "none", color: "inherit"}} dangerouslySetInnerHTML={{
                                            __html: `${contactItems.attributes?.email_left}`
                                        }}></a>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid className={style.gridInputs} item sx={{marginLeft: '50px'}}>
                                <Grid item container direction="column" ml={matchesMD ? 4 : 20}
                                      mt={matchesMD ? 3 : "undefined"}
                                      xs={2}>
                                    <form onSubmit={formSubmit}>
                                        <Grid item container sx={{fontWeight: 'bold'}} >
                                            <Grid sx={{marginTop: '0', marginBottom: '0'}} item><label htmlFor="name" dangerouslySetInnerHTML={{
                                                __html: `${contactItems.attributes?.name_input}`
                                            }}
                                            ></label></Grid>
                                            <Grid sx={{marginLeft: '5px'}} item mt={-1.2}><img alt={'starImg'} src='/starImg.png'/></Grid>
                                        </Grid>
                                        <Grid item>
                                            <TextField required type="text" className={style.inputStyle}
                                                       onChange={handleName}
                                                       value={name} inputProps={{ maxLength: 40 }}/>
                                        </Grid>
                                        <br/>
                                        <Grid item container sx={{fontWeight: 'bold'}}>
                                            <Grid   item><label htmlFor="name" dangerouslySetInnerHTML={{
                                                __html: `${contactItems.attributes?.email_input}`
                                            }}
                                            ></label></Grid>
                                            <Grid sx={{marginLeft: '5px'}} item mt={-1.2}><img alt={'starImg'} src='/starImg.png'/></Grid>
                                        </Grid>
                                        <Grid item >
                                            <TextField type="email" required className={style.inputStyle}
                                                       onChange={handleEmail}
                                                       value={email} inputProps={{ maxLength: 40 }}/>
                                        </Grid>
                                        <br/>
                                        <Grid item container sx={{fontWeight: 'bold'}}>
                                            <Grid  item><label htmlFor="name" dangerouslySetInnerHTML={{
                                                __html: `${contactItems.attributes?.subject_input}`
                                            }}
                                            ></label></Grid>
                                            <Grid sx={{marginLeft: '5px'}} item mt={-1.2}><img alt={'starImg'} src='/starImg.png'/></Grid>
                                        </Grid>
                                        <Grid item >
                                            <TextField required type="text" className={style.inputStyle}
                                                       onChange={handleSubject}
                                                       value={subject} inputProps={{ maxLength: 80 }}/>
                                        </Grid>
                                        <br/>
                                        <Grid item container sx={{fontWeight: 'bold'}}>
                                            <Grid  item><label htmlFor="name" dangerouslySetInnerHTML={{
                                                __html: `${contactItems.attributes?.message_input}`
                                            }}
                                            ></label></Grid>
                                            <Grid sx={{marginLeft: '5px'}} item mt={-1.2}><img alt={'starImg'} src='/starImg.png'/></Grid>
                                        </Grid>
                                        <Grid item >
                                            <TextareaAutosize
                                                required className={style.inputMessage} onChange={handleMessage}
                                                              value={message} minRows={12} maxLength={2000}/>
                                        </Grid>
                                        <Grid mt={1}>
                                            <ReCAPTCHA
                                                sitekey="6LfIDK8oAAAAABL4Q505hc7pRzJXI1LOmuCrJ0jW"
                                                onChange={onChange}
                                                hl={`en`}
                                            />
                                        </Grid>
                                        <br/>
                                        {error &&
                                            <Alert severity="error" sx={{marginBottom: '30px'}}>Error, check console
                                                log</Alert>}
                                        <Grid>
                                            <Button type="submit"
                                                    className={verified ? style.sendButton : style.sendButtonFalse}
                                                    disabled={!verified}>{language == 'ro' ? 'Trimite' : 'Send'}</Button>
                                        </Grid>
                                        <br/> <br/>
                                    </form>
                                </Grid>
                            </Grid>
                            <iframe title={'map'} style={{width: "100%", height: "400px"}}
                                    src="https://maps.google.com/maps?q=Delea%20Veche%20Street,%20nr.24,%20Bucuresti,%20DV24&t=k&z=15&ie=UTF8&iwloc=&output=embed"
                            ></iframe>
                        </Grid>
                    </React.Fragment>
                </>
            }
        </>
    )
}