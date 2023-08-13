import getDomain from "@/app/lib/getDomain";

import BlogCard from "./card";

async function getData() {
    const domain = getDomain();
    const endpoint = `${domain}/api/posts`
    console.log(endpoint);
    const res = await fetch(endpoint, {cache: 'no-store'});
    if (!res.ok) {
        throw new Error("Failed to fetch API")
    }

    return res.json()    
}


export default async function Page() {
    const data = await getData();
    const items = data?.items || [];
    return (
        <main>
        <h1>Hello World Page</h1>
        <p>Posts:</p>
        {items.map((item, idx) => {
            return <BlogCard title={item.title} key={`post-${idx}`} />
        })}
        </main>
    );
}
