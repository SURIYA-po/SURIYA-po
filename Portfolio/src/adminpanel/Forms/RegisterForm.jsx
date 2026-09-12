import React, { useState } from "react";
import "../css/RegisterForm.css";

import userService from "../services/userService";


export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    avatar: "",
  });
  
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();

  data.append("name", form.name);
  data.append("email", form.email);
  data.append("password", form.password);
  data.append("role", form.role);

  if (form.avatar) {
    data.append("avatar", form.avatar);
  }

  

    userService.create(data)
    .then((response) => {
      // Success handling
    })
    .catch((error) => {
      // Error handling
    });
  

  //handling backend logic here 
};

  return (
    <div className="register-overlay">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
<div className="input-group">
  <label>Avatar</label>
  <input
    type="file"
    name="avatar"
    accept="image/*"
    onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
  />
</div>

        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
