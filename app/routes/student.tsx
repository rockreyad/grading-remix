import { Outlet } from "@remix-run/react";
import Navigation from "~/components/ui/Navigation";

const StudentRoute = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default StudentRoute;
