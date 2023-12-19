import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/components/Header";
import Bottom from "@/components/Bottom";
import {ThemeProvider} from '@mui/material/styles';
import theme from '../components/Theme';
import Head from "next/head";
import Script from "next/script";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Biroul de credit Infodebit',
  description: 'Biroul de credit Infodebit',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    //comment google tag for test version
  return (
      <html lang="en">

      {/*<Script id="google-tag-manager" strategy="afterInteractive">*/}
      {/*    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':*/}
      {/*          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],                */}
      {/*          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=                */}
      {/*          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);*/}
      {/*          })(window,document,'script','dataLayer','GTM-5P4HLS4P');`}*/}
      {/*</Script>*/}
      <Head>
          <link rel="preload" href="public/topImg.webp" as="image" />
          <link rel="preload" href="components/TopImage.module.scss" as="style"/>
          <link rel="preload" href="app/contacts/Contacts.module.scss" as="style"/>
      </Head>
      <body className={inter.className}>
      <ThemeProvider theme={theme}>
              <Header/>
              {children}
        <Bottom/>
      </ThemeProvider>
      {/*<noscript*/}
      {/*    dangerouslySetInnerHTML={{*/}
      {/*        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5P4HLS4P" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,*/}
      {/*    }}*/}
      {/*/>*/}
      </body>
    </html>
  )
}
