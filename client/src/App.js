import React, { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Login() {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleSubmit = (creds) => {
    axios
      .post("http://localhost:4000/api/auth/login", creds)
      .then((res) => {
        console.log(res.data);
        setError("");
        setToken(res.data.token);
        setCreds({ username: "", password: "" });
      })
      .catch((err) => {
        setError("Error logging in, try again.");
        setCreds({ ...creds, password: "" });
      });
  };

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="container">
      {token ? (
        <p>
          Logged In,{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              setToken("");
            }}
          >
            logout
          </a>
        </p>
      ) : (
        <>
          <h2>Welcome, please log in</h2>
          <p>
            If you don't have an account, <Link to="/register">sign up</Link>
          </p>
          {error && <p>{error}</p>}
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(creds);
            }}
          >
            <label htmlFor="username">
              Username:
              <input
                id="username"
                name="username"
                value={creds.username}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                id="password"
                name="password"
                type="password"
                value={creds.password}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
}

function Register(props) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleSubmit = (creds) => {
    if (creds.password !== creds.password2) {
      alert("Passwords don't match");
    } else if (!creds.password || creds.password.length < 6) {
      alert("Password should be at least 6 characters");
    } else if (!creds.username || creds.username.length < 6) {
      alert("Username must be at least 6 characters");
    } else {
      axios
        .post("http://localhost:4000/api/auth/register", {
          username: creds.username,
          password: creds.password,
        })
        .then((res) => {
          console.log(res.data);
          setError("");
          setCreds({ username: "", password: "", password2: "" });
          alert("Signup successful");
          props.history.push("/");
        })
        .catch((err) => {
          setError("Error logging in, try again.");
          setCreds({ ...creds, password: "", password2: "" });
        });
    }
  };

  useEffect(() => {
    localStorage.getItem("token") && props.history.push("/");
  }, []);

  return (
    <div className="container">
      <>
        <h2>Please sign up</h2>
        <p>
          If you have an account, <Link to="/">log in</Link>
        </p>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(creds);
          }}
        >
          <label htmlFor="username">
            Username:
            <input
              id="username"
              name="username"
              value={creds.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              id="password"
              name="password"
              type="password"
              value={creds.password}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password2">
            Confirm Password:
            <input
              id="password2"
              name="password2"
              type="password"
              value={creds.password2}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </>
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </>
  );
}

export default App;
