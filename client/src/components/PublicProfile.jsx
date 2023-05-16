import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const PublicProfile = () => {
    let { id } = useParams();
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const {
        firstName,
        lastName,
        email,
        mobile,
        birthday,
        location,
        occupation,
        image,
    } = user;
    console.log(userPosts);

    useEffect(() => {
        api.get(`/users/${id}`).then((res) => {
            setUser(res.data.data);
        });

        api.get(`/posts/user/${id}`).then((res) => {
            setUserPosts(res.data.data);
        });
    }, []);
    return (
        <div className='h-full p-8'>
            <div className='bg-neutral-800 rounded-lg shadow-xl pb-8'>
                <div className='w-full h-[250px]'>
                    <img
                        src='https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg'
                        className='w-full h-full rounded-tl-lg rounded-tr-lg'
                    />
                </div>
                <div className='flex flex-col items-center -mt-20'>
                    <img
                        src={image?.url}
                        className='w-40 border-4 border-neutral-700 border-neutral-600 rounded-full'
                    />
                    <div className='flex items-center space-x-2 mt-2'>
                        <p className='text-2xl'>
                            {firstName} {lastName}
                        </p>
                        <span
                            className='bg-blue-500 rounded-full p-1'
                            title='Verified'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='text-gray-100 h-2.5 w-2.5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='4'
                                    d='M5 13l4 4L19 7'
                                ></path>
                            </svg>
                        </span>
                    </div>
                    <p className='text-neutral-400'>{email}</p>
                    <p className='text-sm text-neutral-400'>{occupation}</p>
                    <p className='text-sm text-neutral-400'>{location}</p>
                    <p className='text-sm text-neutral-400'>{birthday}</p>
                    <p className='text-sm text-neutral-400'>{mobile}</p>
                </div>
                <div className='flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2'>
                    <div className='flex items-center space-x-4 mt-2'>
                        <button className='flex items-center bg-indigo-700 hover:bg-indigo-600 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                            >
                                <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z'></path>
                            </svg>
                            <span>Add Friend</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
