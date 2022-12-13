const LoginForm = ({ onSumbit, nameValue, passwordValue, onNameChange, onPasswordChange }) => {
    return (
        <form onSubmit={onSumbit}>
            <div>
                username
                <input
                type="text"
                value={nameValue}
                name="Username"
                onChange={onNameChange}
                id='username'
                />
            </div>
            <div>
                password
                <input
                type="password"
                value={passwordValue}
                name="Password"
                onChange={onPasswordChange}
                id='password'
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm
