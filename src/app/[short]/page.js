import { getShortLinkRecord } from "@/app/lib/db";
import {notFound, redirect} from "next/navigation"


export default async function ShortPage({params}) {
    const {short} = params
    if (!short) {
        notFound() // 404
    }
    const [record] = await getShortLinkRecord(short)
    
    if (!record) {
        notFound() // 404
    }

    const {url} = record

    if (!url) {
        notFound() // 404
    }

    redirect(url, "push")
}