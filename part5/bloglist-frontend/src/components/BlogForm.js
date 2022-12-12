const BlogForm = ({ onSubmit, titleValue, onTitleChange, authorValue, onAuthorChange, urlValue, onUrlChange}) => {

    return (
        <form onSubmit={onSubmit}>
            <div>
                title:
                <input 
                value={titleValue}
                onChange={onTitleChange}
                />
            </div>
            <div>
                author:
                <input 
                value={authorValue}
                onChange={onAuthorChange}
                />
            </div>
            <div>
                url:
                <input 
                value={urlValue}
                onChange={onUrlChange}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm
