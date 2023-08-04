async function getData() {
    const endpoint = "http://localhosts:3000/api/posts";
    const res = await fetch(endpoint);
    if (!res.ok) {
        throw new Error("Failed to fetch API");
    }
    return res.json();
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
