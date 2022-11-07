const Notification = ({ message, error }) => {
    if (message === null) {
      return null
    }

    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (error) notificationStyle.color = 'red'
    
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

export default Notification