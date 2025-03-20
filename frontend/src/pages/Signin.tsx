import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineLoading } from "react-icons/ai";
import { userContext } from "../components/UserProvider";
import { AlertContext } from "../components/AlertProvider";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const Alert = useContext(AlertContext)

  function signup() {
    if (!validInputs()) return;
    setLoading(true);
    const signup = async () => {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      setLoading(false);
      if (res.status == 201) {
        navigate("/login");
      } else if (res.status == 409) {
        Alert.alert("user allready exits");
      } else {
        Alert.alert("server error");
      }
    };
    signup();
  }
  const User = useContext(userContext);
  async function trySample() {

    Alert.alert("Note in sample data mode nothing can be edited or added you can only interact with the data allready present")

    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "test@test", password: "test" }),
    });

    if (res.status === 201) {
      const data = await res.json();
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
      User.setAccessToken(accessToken)
      User.setLoggedIn(true);
    } else {
      Alert.alert("Server Error");
    }
  }
  function validInputs() {
    if (email == "" || password == "" || cpassword == "") {
      Alert.alert("Some input fields are not filled in");
      return false;
    }
    if (!email.includes("@") || email.length <= 3) {
      Alert.alert("Invalid Email");
      return false;
    }
    if (password.length < 4) {
      Alert.alert("Password to short");
      return false;
    }
    if (password !== cpassword) {
      Alert.alert("Passwords do not match");
      return false;
    }
    return true;
  }
  return (
    <div className="m-auto flex justify-center items-center min-h-[90vh]">
      <div className="border-3 rounded-md shadow-[6px_6px_0px_#008236] p-6 bg-white flex flex-col justify-center items-center max-w-[400px] w-[80%]">
        <h1 className="text-2xl font-bold font-sans">Create an acount</h1>
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
            onChange={(e) =>
              e.target.value.length <= 35 ? setEmail(e.target.value) : ""
            }
          />
          <div className="flex justify-end">
            <p className="text-gray-700 text-xs mr-0.5 mt-0.5">
              {email.length}/35
            </p>
          </div>
          <label className="text-sm font-medium mt-0.5" htmlFor="password">
            Password
          </label>
          <input
            className="border-1 rounded-sm p-1 border-slate-400 text-sm mt-2"
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              e.target.value.length <= 35 ? setPassword(e.target.value) : ""
            }
          />
          <div className="flex justify-end">
            <p className="text-gray-700 text-xs mr-0.5 mt-0.5">
              {password.length}/35
            </p>
          </div>
          <label className="text-sm font-medium mt-0.5" htmlFor="repassword">
            Confirm Password
          </label>
          <input
            className="border-1 rounded-sm p-1 border-slate-400 text-sm mt-2"
            type="password"
            name="repassword"
            id="repassword"
            autoComplete="on"
            placeholder="Confirm your password"
            value={cpassword}
            onChange={(e) =>
              e.target.value.length <= 35 ? setCpassword(e.target.value) : ""
            }
          />
          <div className="flex justify-end">
            <p className="text-gray-700 text-xs mr-0.5 mt-0.5">
              {cpassword.length}/35
            </p>
          </div>
          <button
            type="button"
            className="bg-green-700 rounded-md mt-3 p-2 font-semibold text-white text-sm hover:cursor-pointer hover:bg-green-800 transition delay-50 duration-300 ease-in-out flex justify-center items-center gap-2 h-9"
            onClick={() => signup()}>
            <AiOutlineUserAdd style={{ display: loading ? "none" : "" }} />
            {`${loading ? " " : "Sign Up"}`}
            <AiOutlineLoading
              className="animate-spin"
              style={{ display: !loading ? "none" : "" }}
            />
          </button>
          <button
            type="button"
            className="border-1 border-slate-400 text-black rounded-md mt-3 p-2 font-semibold text-sm hover:cursor-pointer hover:bg-gray-100 transition delay-50 duration-300 ease-in-out h-9"
            onClick={() => trySample()}>
            Try With Sample Data
          </button>
          <br />
        </form>
        <p className="text-sm text-slate-500">
          Already have an acount?{" "}
          <a className="text-green-700 hover:underline" href="#/login">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
