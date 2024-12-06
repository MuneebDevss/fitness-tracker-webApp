import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    // Implement social login logic
    console.log(`Logging in with ${provider}`);
  };

  return (
    <>
      <div>
        <button
          onClick={() => handleSocialLogin('google')}
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <FaGoogle className="h-5 w-5 mr-2" />
          Google
        </button>
      </div>
      <div>
        <button
          onClick={() => handleSocialLogin('facebook')}
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <FaFacebook className="h-5 w-5 mr-2" />
          Facebook
        </button>
      </div>
      <div>
        <button
          onClick={() => handleSocialLogin('apple')}
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          Apple
        </button>
      </div>
    </>
  );
};

export default SocialLogin;