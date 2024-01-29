import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BackgroundImage from '../images/BackgroundImage.jpg';


function Register() {
const [name, setName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/register', { name, email, password })
    .then((result) => {
        console.log(result);
        alert('Registration successful');
        navigate("/login");
    })
    .catch((err) => console.log(err));
};

return (
    <div>
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100" style={{ 
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover', // cover the entire width and height
                height: '100vh', // full height
                width: '100vw' // full width
            }}>
        <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="name">
                <strong>Name</strong>
            </label>
            <input
                type="text"
                placeholder="Enter your names"
                autoComplete="off"
                name="name"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
            />
            </div>

            <div className="mb-3">
            <label htmlFor="email">
                <strong>Email</strong>
            </label>
            <input
                type="email"
                placeholder="Enter your email address"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="mb-3">
            <label htmlFor="password">
                <strong>Password</strong>
            </label>
            <input
                type="password"
                placeholder="Enter your password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
            </button>
        </form>
        <p><i>Already have an account?</i></p>
        <Link to="/login">
            <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
            </button>
        </Link>
        </div>
    </div>
    </div>
);
}

export default Register;
