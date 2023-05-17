import React from 'react';
import UserInfo from './UserInfo';
import Header from './Header';
import PostForm from './PostForm';
import PostList from './PostList';
import { useAppContext } from '../context/AppContext';

const Home = () => {
    const { user, posts } = useAppContext();
    return (
        <div>
            <Header />
            <div className='w-5/6 mx-auto flex flex-col md:flex-row items-start gap-6 mt-10'>
                <div className='w-full md:w-4/12 lg:w-3/12 lg:max-w-xs'>
                    <UserInfo user={user} />
                </div>

                <div className='w-full md:w-8/12 lg:w-6/12 lg:max-w-xl'>
                    <PostForm />
                    <PostList posts={posts} />
                </div>
                <div className='w-full md:hidden lg:block lg:w-3/12 lg:max-w-xs'>
                    {/* TODO: advertisements, friends list */}
                </div>
            </div>
            {/* Footer */}
        </div>
    );
};

export default Home;
