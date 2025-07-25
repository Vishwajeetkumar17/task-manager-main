import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LuCalendarDays } from "react-icons/lu";
import Today from "./Today";
import { logOut } from "../redux/slice/user";
import Description from "./Description";

const Home = () => {
  const dispatch = useDispatch();

  // ✅ Get user from Redux state
  const user = useSelector((state) => state.userData.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    document.location.href = "/";
  };

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1 w-60 h-screen px-4 py-4 bg-gray-100 bg-opacity-50 border-r">
        <div className="flex justify-between">
          <div className="group py-1 w-fit px-1 text-sm rounded flex gap-1 cursor-pointer items-center hover:bg-gray-200">
            {/* ✅ Show dynamic name */}
            <p className="font-medium pl-1">
              {user?.name || "User"}
            </p>
            <span className="group-hover:text-black text-gray-700">
              <IoChevronDown />
            </span>
          </div>

          <button
            className="px-3 py-1 text-sm bg-gray-200 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="py-2 text-sm ">
          <ul className="text-gray-800">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base rounded-lg hover:bg-gray-200"
              >
                <span className="text-lg">
                  <LuCalendarDays />
                </span>
                <span className="ml-2 text-sm">Today</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-r col-span-3">
        <Today />
      </div>

      <div className="col-span-2">
        <Description />
      </div>
    </div>
  );
};

export default Home;
