import React, { useState } from 'react';
import Header from './Header.jsx';

const Alert = () => {
    const [alert, setAlert] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Alert submitted:', alert);
        setAlert('');
    };

    //     return (
    //         <>
    //             <Header />
    //             <div className='relative'>
    //                 <form
    //                     className='absolute right-0 top-full bg-white rounded-lg shadow-md p-4 mt-2 mt-[40px]'
    //                     style={{ left: '50%', transform: 'translateX(-50%)' }}
    //                 >
    //                     <div className='mb-2'>
    //                         <label
    //                             htmlFor='name'
    //                             className='block text-gray-700 font-medium mb-1'
    //                         >
    //                             Name:
    //                         </label>
    //                         <input
    //                             type='text'
    //                             id='name'
    //                             name='name'
    //                             className='w-full border-gray-400 border rounded py-2 px-3'
    //                         />
    //                     </div>
    //                     <div className='mb-2'>
    //                         <label
    //                             htmlFor='message'
    //                             className='block text-gray-700 font-medium mb-1'
    //                         >
    //                             Message:
    //                         </label>
    //                         <textarea
    //                             id='message'
    //                             name='message'
    //                             className='w-full border-gray-400 border rounded py-2 px-3'
    //                         ></textarea>
    //                     </div>
    //                     <button
    //                         type='submit'
    //                         className='bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-3'
    //                     >
    //                         Create
    //                     </button>
    //                 </form>
    //             </div>
    //         </>
    //     );
    // };

    // export default Alert;

    return (
      <>
        <Header />
        <div className="relative">
          <form
            className="absolute right-0 border border-gray-200 rounded-md p-4 hover:border-blue-500 hover:shadow-lg mt-[150px]"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            <div className="mb-2">
              <label htmlFor="name" className="text-xl font-bold mb-4">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border-gray-400 border rounded py-2 px-3"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="message" className="text-xl font-bold mb-4">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full border-gray-400 border rounded py-2 px-3"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-3"
            >
              Create
            </button>
          </form>
        </div>
      </>
    );
};

export default Alert;
