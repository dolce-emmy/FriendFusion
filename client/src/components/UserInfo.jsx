import { Link } from "react-router-dom";
import UserBasicInfo from "./UserBasicInfo";
import { useAppContext } from "../context/AppContext";
import { useThemeContext } from "../context/ThemeContext";
import ProfileIcon from "./icons/ProfileIcon";
import LocationIcon from "./icons/LocationIcon";
import OccupationIcon from "./icons/OccupationIcon";
const UserInfo = ({ user }) => {
  const { isDarkMode } = useThemeContext();
  const { user: currentUser } = useAppContext();
  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } w-full flex flex-col gap-4 rounded-2xl p-5 shadow-md`}
    >
      <div>
        <UserBasicInfo
          user={user}
          extraInfo={`${user?.friends?.length} friends`}
          extraInfoClassName={"text-sm text-neutral-500"}
          showToggleFriend
        />
      </div>

      <div
        className={`${
          isDarkMode ? "dark-border" : "light-border"
        } text-sm flex flex-col gap-2 border-b pb-4 items-start`}
      >
        <div className="text-neutral-500 flex items-center">
          <span className="text-xl w-6 h-6 inline-block">
            <LocationIcon />
          </span>
          <span className="ml-4">{user?.location ?? "Location"}</span>
        </div>

        <div className="text-neutral-500 flex items-center">
          <span className="text-xl w-6 h-6 inline-block">
            <OccupationIcon />
          </span>
          <span className="ml-4">{user?.occupation ?? "Occupation"}</span>
        </div>
        {user?._id === currentUser?._id && (
          <div className="text-neutral-500 flex items-center">
            <span className="text-xl w-6 h-6 inline-block">
              <ProfileIcon />
            </span>

            <span className="ml-4">
              <Link to="/profile">Profile</Link>
            </span>
          </div>
        )}
      </div>
      <div
        className={`${
          isDarkMode ? "dark-border" : "light-border"
        } text-sm flex flex-col gap-1 border-b pb-4`}
      >
        <div className="flex justify-between">
          <span className="text-neutral-500">Who's viewed your profile</span>
          <span>83</span>
        </div>
        <div className="text-sm flex justify-between">
          <span className="text-neutral-500">Impressions of your post</span>
          <span>2482</span>
        </div>
      </div>
      <div>
        <p className="font-bold">Social Profiles</p>
        <p>Twitter</p>
      </div>
    </div>
  );
};

export default UserInfo;
