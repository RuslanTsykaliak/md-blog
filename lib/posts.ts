import fs from 'fs';
import path from 'path'
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'blogposts')

// Function to get sorted blog post data
export function getSortedPostsData() {
    // Get file names under /blogposts directory
    const fileNames = fs.readdirSync(postsDirectory)
    
    // Map each file name to a blog post object
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" extension from file name to get the ID
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file content as a string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        const blogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
        }

        // Combine the parsed data with the post ID
        return blogPost
    })

    // Sort the blog posts by date in descending order
    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
}

// Function to get blog post data by ID
export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Process the markdown content to HTML using remark and html plugins
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)

    // Convert the processed content to a string
    const contentHtml = processedContent.toString()

    const blogPostWithHTML = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHtml,
    }

    // Combine the parsed data with the HTML content
    return blogPostWithHTML
}
