import { Link } from 'react-router-dom';
import UserBasicInfo from './UserBasicInfo';
import { useAppContext } from '../context/AppContext';
import ProfileIcon from '../icons/ProfileIcon';
import LocationIcon from '../icons/LocationIcon';
import OccupationIcon from '../icons/OccupationIcon';
const UserInfo = ({ user }) => {
    const { user: currentUser } = useAppContext();
    return (
        <div className='w-full flex flex-col gap-4 bg-neutral-800 rounded-2xl p-5'>
            <div>
                <UserBasicInfo
                    user={user}
                    extraInfo={`${user?.friends?.length} friends`}
                    extraInfoClassName={'text-sm text-neutral-400'}
                    showToggleFriend
                />
            </div>

            <div className='text-sm flex flex-col gap-2 border-b border-neutral-700 pb-4 items-start'>
                <div className='text-neutral-400 flex items-center'>
                    <span className='text-xl w-6 h-6 inline-block'>
                        <LocationIcon />
                    </span>
                    <span className='ml-4'>{user?.location ?? 'Location'}</span>
                </div>

                <div className='text-neutral-400 flex items-center'>
                    <span className='text-xl w-6 h-6 inline-block'>
                        <OccupationIcon />
                    </span>
                    <span className='ml-4'>
                        {user?.occupation ?? 'Occupation'}
                    </span>
                </div>
                {user?._id === currentUser?._id && (
                    <div className='text-neutral-400 flex items-center'>
                        <span className='text-xl w-6 h-6 inline-block'>
                            <ProfileIcon />
                        </span>

                        <span className='ml-4'>
                            <Link to='/profile'>Profile</Link>
                        </span>
                    </div>
                )}
            </div>
            <div className='text-sm flex flex-col gap-1 border-b border-neutral-700 pb-4'>
                <div className='flex justify-between'>
                    <span className='text-neutral-400'>
                        Who's viewed your profile
                    </span>
                    <span>83</span>
                </div>
                <div className='text-sm flex justify-between'>
                    <span className='text-neutral-400'>
                        Impressions of your post
                    </span>
                    <span>2482</span>
                </div>
            </div>
            <div>
                <p className='font-bold'>Social Profiles</p>
                <p>Twitter</p>
            </div>
        </div>
    );
};

export default UserInfo;
