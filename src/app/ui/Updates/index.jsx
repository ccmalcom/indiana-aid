export default async function Updates() {
    const data = await fetch('https://api.vercel.app/blog')
    const posts = await data.json()
    return (
      <p>Coming soon</p>
    )
  }