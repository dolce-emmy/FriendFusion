import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from './Header.jsx';

const Comment = ({ toggleCommentForm }) => {
    const [formData, setFormData] = useState({
        question1: '',
        question2: '',
        question3: '',
    });

    const [isNightMode, setIsNightMode] = useState(false);

    const handleToggleNightMode = () => {
        // Handle night mode toggle functionality here
        setIsNightMode(!isNightMode);
        const body = document.querySelector('body');
        body.classList.toggle('night-mode');
    };

    const { user } = useAppContext();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        toggleCommentForm();
    };

    return (
        <>
            <Header />
            <div className='flex justify-center items-center h-screen mt-[-80px]'>
                <div className='w-96 bg-white shadow-lg rounded-lg'>
                    <div className='p-4 border-b'>
                        <h2 className='text-xl font-medium'>Add Comment</h2>
                    </div>
                    <form className='p-4' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label
                                className='block text-gray-700 font-bold mb-2'
                                htmlFor='question1'
                            >
                                How Can we Help You?
                            </label>
                            <input
                                className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                                type='text'
                                name='question1'
                                id='question1'
                                placeholder='Your Comments'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                className='block text-gray-700 font-bold mb-2'
                                htmlFor='question2'
                            >
                                How Can we Improve
                            </label>
                            <input
                                className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                                type='text'
                                name='question2'
                                id='question2'
                                placeholder='Your Comments'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                className='block text-gray-700 font-bold mb-2'
                                htmlFor='message'
                            >
                                Details
                            </label>
                            <textarea
                                className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                                name='message'
                                id='message'
                                placeholder='Enter your message'
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex justify-end pt-4'>
                            <button
                                className='px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2'
                                onClick={toggleCommentForm}
                            >
                                Cancel
                            </button>
                            <button
                                className='px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400'
                                type='submit'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Comment;
