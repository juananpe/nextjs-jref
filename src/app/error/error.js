'use client'

import { useEffect } from "react"

export default function Error({ error, reset }) {
    useEffect(() => {
        console.log("Error is:", error)
    }, [error])

    const retryRequest = () => {
        reset()
    }

    return (<div>
        <h2>Something went wrong on purpose!</h2>
        <button onClick={retryRequest}>Retry</button>
        </div>)
}