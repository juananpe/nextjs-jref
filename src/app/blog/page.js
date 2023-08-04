import getDomain from "@/app/lib/getDomain";

// fetch catching options
// revalidate: n seconds
// force-cache
// no-store

async function getData() {
    const domain = getDomain();
    const endpoint = `${domain}/api/posts`
    const res = await fetch(endpoint, {
                                            next: {revalidate: 10}
                                        });
    if (!res.ok) {
        throw new Error("Failed to fetch API")
    }

    if (res.headers.get("content-type") !== "application/json") {
        return {items: []}
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
            return <li key={`post-${idx}`}>{item.title}</li>
        })}
        </main>
    );
}
