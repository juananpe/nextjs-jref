'use client'

import useWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function GitHubProfile() {
    const myGitHubRepoProfile = "https://api.github.com/repos/juananpe/nextjs-jref"
    const {data, error, isLoading} = useWR(myGitHubRepoProfile, fetcher)
    
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    
    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>
            👀 {data.subscribers_count}
            </strong>
            <strong>
            ⭐️   {data.stargazers_count}
            </strong>
            <strong>
            🍴  {data.forks_count} 
            </strong>
        </div>
    )

}