import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex mx-auto h-screen items-center justify-center p-4">
      <div className="grid justify-items-center space-y-4">
        <h1 className="text-2xl md:text-5xl lg:text-8xl font-sans font-semibold lg:font-bold  lg:font-mono text-green-500">
          Welcome to Grading System
        </h1>
        <Link
          to="student"
          className="px-3 py-2 bg-gray-50 md:text-gray-500 md:hover:text-gray-700 border text-lg md:text-xl lg:text-2xl text-gray-600 font-mono font-medium hover:shadow-lg rounded-md w-fit"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
