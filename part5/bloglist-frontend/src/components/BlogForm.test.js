import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm calls callback func with right info', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const component = render(<BlogForm createBlog={createBlog} />)

    const createButton = component.getByText('create')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author') 
    const urlInput = component.container.querySelector('#url')
    
    await user.type(titleInput, 'title')
    await user.type(authorInput, 'author')
    await user.type(urlInput, 'url')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({"author": "author", "title": "title", "url": "url"})
})
