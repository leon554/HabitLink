import { useContext, useEffect, useState } from "react";
import { userContext } from "../components/UserProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const User = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken == null) return;
    navigate("/home");
  }, []);
  
  function login() {
    setLoading(true);
    const trylogin = async () => {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      setLoading(false);
      if (res.status === 201) {
        const data = await res.json();
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);
        User.accessToken = accessToken;
        User.loggedIn = true;

        window.location.href = "/home";
      } else {
        setEmail("");
        setPassword("");
        alert("Wrong email or password");
      }
    };
    trylogin();
  }
  return (
    <div className="m-auto flex justify-center items-center min-h-[90vh]">
      <div className="border-3 rounded-md shadow-[6px_6px_0px_#008236] p-6 bg-white flex flex-col justify-center items-center max-w-[400px] w-[80%]">
        <h1 className="text-2xl font-bold font-sans">Log In</h1>
        <p className="text-sm text-slate-500">
          Start your journey to better habits today
        </p>
        <br />
        <form className="flex flex-col w-full">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="border-1 rounded-sm p-1 border-slate-400 text-sm mt-2"
            type="email"
            name="email"
            id="email"
            placeholder="Enter youre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label className="text-sm font-medium mt-5" htmlFor="password">
            Password
          </label>
          <input
            className="border-1 rounded-sm p-1 border-slate-400 text-sm mt-2"
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>  setPassword(e.target.value)}
          />
        
          <button
            className="bg-green-700 rounded-md mt-5 p-2 font-semibold text-white text-sm hover:cursor-pointer hover:bg-green-800 transition delay-50 duration-300 ease-in-out flex justify-center h-9"
            onClick={() => login()}
            type="button"
          >
            {`${loading ? " " : "Log In"}`}
            <AiOutlineLoading
              className="animate-spin"
              style={{ display: !loading ? "none" : "" }}
            />
          </button>
          <br />
        </form>
        <p className="text-sm text-slate-500">
          Dont have an acount?{" "}
          <a className="text-green-700 hover:underline" href="#/signin">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
