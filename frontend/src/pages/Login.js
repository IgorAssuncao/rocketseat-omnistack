import React, { useState } from "react";
import "./Login.css";

import api from "../services/api";

import logo from "../assets/logo.svg";

export default function Login(props) {
  const [username, setUsername] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/devs", {
      username
    });

    const { _id } = response.data;

    props.history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholer="Enter your GitHub User"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}
