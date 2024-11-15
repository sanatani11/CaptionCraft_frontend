import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gif from "../usables/eye_cover.gif";
import "../CSS/form.css";

const LogIn = () => {
  const [person, setPerson] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (person.email && person.password) {
      try {
        let result = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check if the response is successful
        if (result.ok) {
          // Parse response data
          result = await result.json();

          // Check if login was successful
          if (!result.message) {
            // Save user and token data to local storage
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("auth", JSON.stringify(result.token));

            // Redirect to the desired page
            navigate("/");
          } else {
            console.log(result.message);
            // Redirect to login page if login was unsuccessful
            navigate("/login");
          }
        } else {
          // If the response is not successful, log error message
          console.log("Error:", result.statusText);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    } else {
      console.log("Please enter all the values");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  return (
    <div className="formPage">
      <article>
        <div className="gif">
          <img className="gif_image" src={gif} alt="image" />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div classnmae="form_content">
            <div className="logo">
              <h1>CAPTIONCRAFT</h1>
            </div>
            <div className="form-control">
              <label htmlFor="email">Email : </label>
              <input
                type="email"
                id="email"
                name="email"
                value={person.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={person.password}
                onChange={handleChange}
              />
            </div>
            <div className="button-container">
              <button type="submit">Login</button>
            </div>
            <div className="already">
              <p>
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
            </div>
          </div>
        </form>
      </article>
    </div>
  );
};

export default LogIn;
