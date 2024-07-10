
import React, { useState } from 'react';
import { login } from 'services/user';

export default function Login(props) {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    service: props.organization.name
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
  };

  return (
    <>
      <br />
      <br />
      <form class="formulaire" onSubmit={handleSubmit}>
        <div>
          <input type="text" name="login" onChange={handleChange} placeholder="Login" />
        </div>
        <div>
          <input type="password" name="password" onChange={handleChange} placeholder="Password" />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </>
  )
}