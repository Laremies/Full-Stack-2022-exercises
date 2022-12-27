import { Alert } from "react-bootstrap"

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <Alert variant={notification.type}>
      {notification.message}
    </Alert>
  )
}

export default Notification
