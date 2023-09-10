import { getPostData, getSortedPostsData } from '@/lib/posts'
import React from 'react'
import { notFound } from 'next/navigation'
import getFormattedDate from '@/lib/getFormattedDate'
import Link from 'next/link'

export function generateStaticParams() {

  const posts = getSortedPostsData()

  // Generate static parameters for each post
  return posts.map(post => ({
    postId: post.id,
  }))
}

// Function to generate metadata for the post page
export function generateMetadata({ params }: { params: { postId: string } }) {
  // Get sorted posts data
  const posts = getSortedPostsData()
  const { postId } = params

  // Find the post with the specified ID
  const post = posts.find(post => post.id === postId)

  // If the post is not found, return a title indicating "Post Not Found"
  if (!post) return {
    title: 'Post Not Found',
  }

  // Return the title of the found post
  return {
    title: post.title,
  }
}

// Default function for the Post page component
export default async function Post({ params }: { params: { postId: string } }) {
  // Get sorted posts data
  const posts = getSortedPostsData()
  const { postId } = params

  // Check if a post with the specified ID exists
  if (!posts.find(post => post.id === postId)) {
    // If not, navigate to the Not Found page
    notFound()
  }

  // Get the title, date, and HTML content of the post
  const { title, date, contentHtml } = await getPostData(postId)

  // Format the date
  const pubDate = getFormattedDate(date)

  return (
    <main className='px-6 prose prose-xl prose-slate dark:prose-invert mx-auto'>
      <h1 className='text-3xl mt-4 mb-0'>{title}</h1>
      <p className='mt-0'>{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <Link href='/'>Back to home</Link>
        </p>
      </article>
    </main>
  )
}
