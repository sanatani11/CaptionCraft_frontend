import "./App.css";
import Nav from "./components/nav";
import Footer from "./components/footer";
import SignUp from "./components/signUp";
import LogIn from "./components/LogIn";
import Update from "./components/Update";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import GenerateHashTags from "./components/GenerateHashtags";
import Landing from "./page/Landing";
import Profile from "./components/Profile";
import CheckoutPage from "./components/CheckOut";
import PrivateComponent from "./components/PrivateComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<PrivateComponent />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/generate" element={<AddProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/generateHashtags" element={<GenerateHashTags />} />
            <Route path="/product/:id" element={<Update />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/profile/checkout" element={<CheckoutPage />} />
            <Route path="/logout" element={<h1>logout</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/home" element={<Landing />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
