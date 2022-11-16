const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    })
    return sum
}

const favoriteBlog = (blogs) => {
    let fav = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > fav.likes) {
            fav = blog
        }
    })
    return fav
}

const mostLikes = (blogs) => {
    const authors = []
    blogs.forEach(blog => {
        const index = authors.map(x => x.author).indexOf(blog.author)
        if (index != -1) {
            authors[index].likes += blog.likes
        } else {
            authors.push(
                {
                    author: blog.author,
                    likes: blog.likes
                })
        }
    })
    
    authors.sort((a, b) => b.likes - a.likes)
    return authors[0]
}

const mostBlogs = (blogs) => {
    const authors = []
    blogs.forEach(blog => {
        const index = authors.map(author => author.author).indexOf(blog.author)
        if (index != -1) {
            authors[index].blogs += 1
        } else {
            authors.push(
                {
                    author: blog.author,
                    blogs: 1
                })
        }
    })

    authors.sort((a, b) => b.blogs - a.blogs)
    return authors[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}