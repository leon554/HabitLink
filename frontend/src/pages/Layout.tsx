import { Navbar } from "../components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userContext } from "../components/UserProvider";

export function Layout() {
  const User = useContext(userContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken == null) { return;}

    const fecthHabits = async () => {
      const loginRes = await User.login(refreshToken);
      if (!loginRes.loggedIn) {navigate("/signin"); return; }

      const res = await getHabitRes(loginRes!.accessToken);
      if (res.status == 200) {
        const data = await res.json()
        User.setHabits([...data]);
        const currentPath = location.pathname
        if(currentPath == "/" || currentPath == "/login" || currentPath == "/signup"){
          navigate("/home")
        }

      }else{
        alert("Server error")
      }
    };
    fecthHabits();
  }, [])
  useEffect(()=>{
    const protectedPaths = ["/home", "/log", "/newhabit"]
    const pathToDirectToHome = ["/", "/signin", "/login"]

    if(User.loggedIn && pathToDirectToHome.includes(location.pathname)){
      navigate("/home")
    }
    if(!User.loggedIn && protectedPaths.includes(location.pathname) && localStorage.getItem("refreshToken") == null){
      navigate("/")
    }

  }, [location.pathname, User.loggedIn])
  async function getHabitRes(accessToken: string) {
    return await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/habits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
