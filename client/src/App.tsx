import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/app-layout";
import MainPage from "./components/main-page";
import SignUp from "./components/sign-up";
import Login from "./components/login";
import UserPage from "./components/user-page";
import { UserProvider } from "./context/userContext";
import VotePage from "./components/vote-page";
import CreateVote from "./components/create-vote";
import { MessageProvider } from "./context/errorContext";

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
      {
        path: "/votes/:id",
        element: <VotePage />,
      },
      {
        path: "/create-vote",
        element: <CreateVote />,
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserProvider>
        <MessageProvider>
        <RouterProvider router={router} />
        </MessageProvider>
      </UserProvider>
    </>
  );
}

export default App;
