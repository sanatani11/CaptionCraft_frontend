import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/form.css";
import gif from "../usables/interview.gif";
const SignUp = () => {
  const [person, setPerson] = useState({
    name: "",
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
    if (person.name && person.email && person.password) {
      try {
        let result = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
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
          console.log(result);
          // Save user and token data to local storage
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("auth", JSON.stringify(result.token));

          // Redirect to the desired page
          navigate("/generate");
        } else {
          // If the response is not successful, parse error message and log it
          const error = await result.json();
          console.log("Error:", error.message);
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
          <div className="form_content">
            <div className="logo">
              <h1>CAPTIONCRAFT</h1>
            </div>
            <div className="form-control">
              <label htmlFor="name">Name : </label>
              <input
                type="text"
                id="name"
                name="name"
                value={person.name}
                onChange={handleChange}
              />
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
              <button type="submit">Sign Up</button>
            </div>
            <div className="already">
              <p>
                Already have an account? <a href="/login">Log in</a>
              </p>
            </div>
          </div>
        </form>
      </article>
    </div>
  );
};

export default SignUp;
