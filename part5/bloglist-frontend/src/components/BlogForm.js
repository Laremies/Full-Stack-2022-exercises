import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle = e => {
        setTitle(e.target.value)
    }
    
    const handleAuthor = e => {
        setAuthor(e.target.value)
    }

    const handleUrl = e => {
        setUrl(e.target.value)
    }

    const addBlog = e => {
        e.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    
    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input 
                value={title}
                onChange={handleTitle}
                id='title'
                />
            </div>
            <div>
                author:
                <input 
                value={author}
                onChange={handleAuthor}
                id='author'
                />
            </div>
            <div>
                url:
                <input 
                value={url}
                onChange={handleUrl}
                id='url'
                />
            </div>
            <button type="submit" id='create_blog'>create</button>
        </form>
    )
}

export default BlogForm
