import { NextResponse } from "next/server";

export async function POST(){
     
    return NextResponse.json({items: [ 
        {id: 1, title: 'Hello World'},
    ] });
       
}