import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/app-layout";
import MainPage from "./components/main-page";
import SignUp from "./components/sign-up";
import Login from "./components/login";
import UserPage from "./components/user-page";
import { UserProvider } from "./context/userContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/user-page",
        element: <UserPage />,
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
