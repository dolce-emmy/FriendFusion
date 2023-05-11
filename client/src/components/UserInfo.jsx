import { useAppContext } from "../context/AppContext";

 const UserInfo = () => {
    const {user} = useAppContext();


    return (
      <div className="flex flex-col gap-4 max-w-xs bg-neutral-800 rounded-lg p-5">
        <div className="flex gap-4 items-center border-b border-neutral-700 pb-4">
          <span className="block rounded-full max-w-[60px] h-full overflow-hidden">
            <img
              src={
                user?.profilePicture?.url || "https://placehold.co/60x60/png"
              }
              alt={user?.firstName}
            />
          </span>
          <div className="flex flex-col items-start">
            {user?.firstName && (
              <span className="font-bold text-xl">
                <span className="mr-1">{user?.firstName}</span>
                <span>{user?.lastName}</span>
              </span>
            )}
            <span className="text-sm text-neutral-400">
              {user?.friends?.length} friends
            </span>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-2 border-b border-neutral-700 pb-4 items-start">
          <div className="text-neutral-400">
            <span className="text-xl w-6 h-6 inline-block">
              <i className="fas fa-light fa-location-dot"></i>
            </span>
            <span className="ml-4">{user?.location ?? "Location"}</span>
          </div>

          <div className="text-neutral-400">
            <span className="text-xl w-6 h-6 inline-block">
              <i className="fas fa-light fa-suitcase"></i>
            </span>
            <span className="ml-4">{user?.occupation ?? "Occupation"}</span>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-1 border-b border-neutral-700 pb-4">
          <div className="flex justify-between">
            <span className="text-neutral-400">Who's viewed your profile</span>
            <span>83</span>
          </div>
          <div className="text-sm flex justify-between">
            <span className="text-neutral-400">Impressions of your post</span>
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

export default UserInfo