const UserAvatar = ({ avatar, className }) => {
  const defaultPicture = 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'

  return (
    <img
      src={(avatar && avatar !== null && avatar !== '') ? (avatar instanceof Blob ? URL.createObjectURL(avatar) : 'http://localhost:3000' + avatar) : defaultPicture}
      alt='dp'
      className={`h-full h-full${className}`} />
  )
}

export default UserAvatar
