import { Link, Outlet } from "react-router-dom";

const StudentIndex = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl text-teal-500 font-semibold uppercase">
        Student protal
      </h1>
      <Link
        to={"enroll/new"}
        className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer text-blue-500 hover:text-rose-500"
      >
        Enroll a new Course
      </Link>
      <Outlet />
    </div>
  );
};

export default StudentIndex;
