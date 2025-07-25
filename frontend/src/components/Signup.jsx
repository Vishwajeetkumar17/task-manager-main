// pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateUserData } from "../utils/validation";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/slice/user";
import logo from "../assets/logo.png";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {
    const error = validateUserData(formData);
    setErrorMsg(error);
    if (error.length === 0) {
      try {
        const res = await api.post('/auth/signup', formData, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });

        if (res.data && res.data.message) {
          dispatch(userLogin({
            email: formData.email,
            password: formData.password
          }));
          navigate('/home/tasks');
        }
      } catch (err) {
        console.error("Signup error:", err.response?.data || err.message);
        setErrorMsg("Signup failed. Try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full mt-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-14 w-auto" src={logo} alt="Logo" />
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Join TickTick
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-900">Name</label>
            <input type="text" name="name" onChange={handleChange} className="mt-2 px-4 py-1.5 outline-none block w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Email address <span className="text-red-500">*</span></label>
            <input type="email" name="email" required onChange={handleChange} className="mt-2 px-4 py-1.5 outline-none block w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Password <span className="text-red-500">*</span></label>
            <input type="password" name="password" required onChange={handleChange} className="mt-2 px-4 py-1.5 outline-none block w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300" />
          </div>

          <div>
            {errorMsg && <p className="text-red-600 text-sm py-3 text-center">{errorMsg}</p>}
            <button type="submit" onClick={handleSignup} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-md">Sign up</button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
