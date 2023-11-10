'use client'
import React, {createRef, useEffect, useState} from 'react';
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
import axios from "axios";
import styles from "@/components/Bottom.module.scss";

async function getContactData (lang: string) {
    const {data} = await makeStrapiRequest.get(`/contact?locale=${lang}&populate[contact_left_phone][populate]=*`)

    return data
}

export default function Contacts() {
    // const classes = useStyles();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const [activeButton, setActiveButton] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false)
    const [contactItems, setContactItems] = useState<any>()
    const [language, setLanguage] = useState('ro')
    const recaptchaRef = createRef<any>();
    const [isSuccess, setIsSuccess] = useState(false)

    const extractPhoneNumbers = (inputString: string | null | undefined) => {
        if (!inputString) {
            return [];
        }

        const phoneRegex = /\b\d{4,}\b/g;

        const phoneNumbers = inputString.match(phoneRegex);

        return phoneNumbers || [];
    };


    function extract(str: string) {
        const email =
            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        return str.match(email);
    }

    useEffect(() => {
        setLanguage(localStorage.getItem('language') || 'ro')
        getContactData(localStorage.getItem('language') || 'ro').then((res) => {
            setContactItems(res.data)
        })

    }, [])

    function onChange() {
        setActiveButton(true);
    }

    const handleName = (e: any) => {
        if (/\d/.test(e.target.value)) {
            e.preventDefault();
        } else {
            setName(e.target.value)
        }
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
        console.log('kfoper')
        recaptchaRef.current.reset()
        setActiveButton(false)
        setError(false)
        setIsSuccess(false)
        let data = {
            name,
            email,
            subject,
            message
        }

        async function sendEmail() {
            try {
                console.log(data)
                const response = await axios.post('/api/sendEmail', JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                setIsSuccess(true)
                console.log(response.data);
            } catch (error: any) {
                setError(true)
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        }
        sendEmail()

        setActiveButton(false)
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
                                    <Typography
                                        className={style.titleContacts}
                                        sx={{marginTop: '0'}}
                                    >
                                        {parse(String(contactItems.attributes?.left))}
                                    </Typography>
                                    <Typography
                                        className={style.textContacts3}
                                        sx={{display: 'flex'}}
                                    >
                                        {contactItems.attributes?.contact_left_phone?.phone_text === undefined ? '' : parse(String(contactItems.attributes?.contact_left_phone?.phone_text))}
                                        {
                                            extractPhoneNumbers(contactItems.attributes?.contact_left_phone?.phone).map((item, index) => (
                                                <a style={{textDecoration: 'none', color: 'rgb(0, 0, 0)'}} key={index}  href={`tel:${item}`} target="_blank">
                                                    {item}{index !== extractPhoneNumbers(contactItems.attributes?.contact_left_phone?.phone).length - 1 && '/'}
                                                </a>
                                            ))
                                        }
                                        {/*<a href={`mailto:${extract(String(contactItems.attributes?.email_left))}`}*/}
                                        {/*   style={{textDecoration: "none", color: "inherit"}}>*/}
                                        {/*    {parse(String(contactItems.attributes?.email_left))}*/}
                                        {/*</a>*/}
                                    </Typography>
                                    <Typography
                                        sx={{marginTop: '20px'}}
                                        className={style.textContacts3}
                                    >
                                        <a href={`mailto:${extract(String(contactItems.attributes?.email_left))}`}
                                           style={{textDecoration: "none", color: "inherit"}}>
                                            {parse(String(contactItems.attributes?.email_left))}
                                        </a>
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
                                                       value={name} inputProps={{ maxLength: 40,
                                                pattern: '[^0-9]*'
                                            }}/>
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
                                        <Grid item className={style.textAreaGrid}>
                                            <TextareaAutosize
                                                required className={style.inputMessage} onChange={handleMessage}
                                                              value={message} minRows={12} maxLength={2000}/>
                                        </Grid>
                                        <Grid mt={1}>
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                sitekey="6LfIDK8oAAAAABL4Q505hc7pRzJXI1LOmuCrJ0jW"
                                                onChange={onChange}
                                                hl={`${language}`}
                                            />
                                        </Grid>
                                        <br/>
                                        {error &&
                                            <Alert className={style.alert} severity="error" sx={{marginBottom: '30px'}}>{language == 'ro' ? 'Error' : 'Eroare'}</Alert>}
                                        {isSuccess &&
                                            <Alert className={style.alert} severity="success" sx={{marginBottom: '30px'}}>{language == 'ro' ? 'Trimis' : 'Sent'}</Alert>}
                                        <Grid>
                                            <Button type="submit"
                                                    className={activeButton ? style.sendButton : style.sendButtonFalse}
                                                    disabled={!activeButton}>{language == 'ro' ? 'Trimite' : 'Send'}</Button>
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