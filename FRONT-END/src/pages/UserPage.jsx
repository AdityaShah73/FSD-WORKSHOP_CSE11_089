import React from 'react'
import { Link } from 'react-router-dom';
function UserPage() {
  return (
    <div>
        <h1>USer Page</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </div>
  )
}

export default UserPage