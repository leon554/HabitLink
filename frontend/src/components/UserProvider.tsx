import React, { createContext, useState } from "react";

export interface CompletionType {
  data: number;
  date: string;
  id: string;
}
export interface HabitType {
  habitName: string;
  color: string;
  numeric: boolean;
  _id: string;
  completions: CompletionType[];
}
interface loginReturnType {
  loggedIn: boolean;
  accessToken: string;
}
export interface UserType {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  id: string | null;
  setId: (id: string) => void;
  email: string | null;
  setEmail: (email: string) => void;
  habits: HabitType[] | null;
  setHabits: (habits: HabitType[]) => void;
  login: (refreshToken: string) => Promise<loginReturnType> | loginReturnType;
  timeAccesTokenCreated: number | null;
}

const initialUserValues: UserType = {
  loggedIn: false,
  setLoggedIn: () => null,
  accessToken: null,
  setAccessToken: () => null,
  id: null,
  setId: () => null,
  email: null,
  setEmail: () => null,
  habits: null,
  setHabits: () => null,

  login: () => {
    return { loggedIn: false, accessToken: "" };
  },
  timeAccesTokenCreated: null,
};

export const userContext = createContext<UserType>(initialUserValues);

interface Props {
  children: React.ReactNode;
}
export default function UserProvider(props: Props) {
  const [loggedIn, setLoggedIn] = useState(initialUserValues.loggedIn);
  const [accessToken, setAccessToken] = useState(initialUserValues.accessToken);
  const [id, setId] = useState(initialUserValues.id);
  const [email, setEmail] = useState(initialUserValues.email);
  const [habits, setHabits] = useState(initialUserValues.habits);
  const [timeAccesTokenCreated, setTimeAccesTokenCreated] = useState(
    initialUserValues.timeAccesTokenCreated
  );
  const AccesTokenRefreshTime = 10 * 60 * 1000;

  async function login(refreshToken: string) {
    if (timeAccesTokenCreated != null) {
      if (Date.now() - timeAccesTokenCreated <= AccesTokenRefreshTime) {
        return { loggedIn: true, accessToken: accessToken };
      }
    }
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });
    if (res.status == 200) {
      const data = await res.json();
      setAccessToken(data.accessToken);
      setLoggedIn(true);
      setTimeAccesTokenCreated(Date.now());
      return { loggedIn: true, accessToken: data.accessToken };
    } else {
      return { loggedIn: false, accessToken: "" };
    }
  }
  return (
    <userContext.Provider
      value={{
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        id: id,
        setId: setId,
        email: email,
        setEmail: setEmail,
        habits: habits,
        setHabits: setHabits,
        login: login,
        timeAccesTokenCreated: timeAccesTokenCreated,
      }}>
      {props.children}
    </userContext.Provider>
  );
}
