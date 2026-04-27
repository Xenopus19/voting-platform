import { Outlet } from "react-router-dom";
import Header from "./header";
import Message from "./message";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 flex flex-col items-center px-25 ">
        <div className="w-full max-w-4xl mx-auto min-h-screen bg-white shadow-2xl flex flex-col z-10">
          <main className="flex-grow p-6 md:p-10">
            <Message/>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
