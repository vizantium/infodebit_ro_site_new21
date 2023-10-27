import React from "react";
import {makeStrapiRequest} from "@/utils/makeStrapiRequest";
import {notFound} from "next/navigation";

async function getDefaultPage(link: string) {
    const {data} = await makeStrapiRequest.get(`/default-pages?populate=*&filters[link][$eq]=defaultPage/${link}`)

    return data
}

export default async function DefaultPageLayout({children, params}: { children: React.ReactNode, params: any }) {
    const pageData = await getDefaultPage(params.slug)

    if (pageData.data.length < 1) {
        return notFound()
    }

    return (
       <div>
           {children}
       </div>
    )
}