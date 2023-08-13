"use client";

import { useState } from "react";

export default function LinksCreateForm() {

    const [results, setResults] = useState(null);

  const handleForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const JSONData = JSON.stringify(data);
    const endpoint = "/api/links";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONData,
    };

    const res = await fetch(endpoint, options);
    const result = await res.json();
    console.log(result);
    setResults(result);
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <input
          type="text"
          defaultValue="https://vercel.com/juanan/nextjs-jref/deployments"
          placeholder="Your URL to shorten"
          name="url"
        />
        <button type="submit">Shorten</button>
      </form>
        {results && JSON.stringify(results)} 
    </>
  );
}
