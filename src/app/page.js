import Image from 'next/image'
import { getSessionUser } from './lib/session'

export default async function Home() {
  const user = await getSessionUser()
  console.log(`user: ${user}`)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
      <h1>jref.io is coming soon!</h1>
    </main>
  )
}
