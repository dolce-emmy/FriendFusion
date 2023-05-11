import { useAppContext } from "../context/AppContext";

 const UserInfo = () => {
    const {user} = useAppContext();
    return (
      <div className="w-full flex flex-col gap-4 bg-neutral-800 rounded-2xl p-5">
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
          <div className="text-neutral-400 flex items-center">
            <span className="text-xl w-6 h-6 inline-block">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </span>
            <span className="ml-4">{user?.location ?? "Location"}</span>
          </div>

          <div className="text-neutral-400 flex items-center">
            <span className="text-xl w-6 h-6 inline-block">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>
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