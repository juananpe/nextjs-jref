
export default function LinksCreateHtmlForm() {

  return (
    <>
      <form action="/api/links/" method="POST">
        <input
          type="text"
          defaultValue="https://vercel.com/juanan/nextjs-jref/deployments"
          placeholder="Your URL to shorten"
          name="url"
        />
        <button type="submit">Shorten</button>
      </form>
    </>
  );
}
