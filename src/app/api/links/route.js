import { NextResponse } from "next/server";
import isValidURL from "@/app/lib/validURL";

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

    return NextResponse.json(data, {status: 201});
}