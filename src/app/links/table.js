
'use client'
import useWR from 'swr'
import LinksCreateForm from './createForm'
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function LinksHTMLTable() {
    const endpoint = "/api/links"
    const {data, error, isLoading, mutate} = useWR(endpoint, fetcher)
    
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    
    const didSubmit = (newItem) => {
        mutate()
    }

    return (<>
    <LinksCreateForm didSubmit={didSubmit} />
        <table>
        <tbody>
        {data && data.map((link, idx) => {
            return <tr key={`link-item-${link.id}-${idx}`}>
                <td>{link.id}</td>
                <td>{link.url}</td>
                </tr>
        })}
        </tbody>
    </table>
    </>
    )

}
