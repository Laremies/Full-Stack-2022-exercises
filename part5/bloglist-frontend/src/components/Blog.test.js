import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 1,
    }

    const { container } = render(
        <Blog blog={blog} upvote={jest.fn()} user={'user'} remove={jest.fn()} />
    )

    expect(container).toHaveTextContent('title')
    expect(container).toHaveTextContent('author')
    expect(container).not.toHaveTextContent('url')
    expect(container).not.toHaveTextContent(1)
    expect(container).not.toHaveTextContent('user')
})

test('renders everything when view button pressed', async () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 1,
        user: 'user'
    }
    const u = {
        name: 'user',
        username: 'user'
    }

    const element = render(
        <Blog blog={blog} upvote={jest.fn()} user={u} remove={jest.fn()} />
    )

    const user = userEvent.setup()
    const button = element.getByText('view')
    await user.click(button)

    expect(element.container).toHaveTextContent('title')
    expect(element.container).toHaveTextContent('author')
    expect(element.container).toHaveTextContent('url')
    expect(element.container).toHaveTextContent(1)
})

test('like button works correctly', async () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 1,
        user: 'user'
    }
    const u = {
        name: 'user',
        username: 'user'
    }

    const like = jest.fn()

    render(
        <Blog blog={blog} upvote={like} user={u} remove={jest.fn()} />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(like.mock.calls).toHaveLength(2)
})
