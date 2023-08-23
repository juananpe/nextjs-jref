import { NextResponse } from "next/server";
import isValidURL from "@/app/lib/validURL";
import {addLink} from "@/app/lib/db";

import {getMinLinks} from '@/app/lib/db'

export async function GET(request){
    const linksResponse = await getMinLinks()
    console.log(linksResponse )
    return NextResponse.json(linksResponse, {status: 200});
}

export async function POST(request){
    // using standard form data
    // const formData = await request.formData()
    // console.log(formData)

    const contentType = await request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 415 })
    }
    const data = await request.json()
    const url  = data?.url
    console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
    const validURL = await isValidURL(url, ['localhost','jref.io', process.env.NEXT_PUBLIC_VERCEL_URL])
    if (!validURL) {
        return NextResponse.json({ error: `Invalid URL ${url}`}, { status: 400 })   
    }
    const dbResponse = await addLink(url)
    return NextResponse.json(dbResponse, {status: 201});
}