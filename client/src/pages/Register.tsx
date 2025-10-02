import { useState } from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '../assets/brand.png';
import { Button } from 'antd';

export default function Register() {
    const [focused, setFocused] = useState<
        'username' | 'email' | 'password' | 'confirmPassword' | null
    >(null);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            {/* Logo */}
            <div className="flex justify-center mb-4">
                <img src={brandLogo} alt="brand" className="w-24 sm:w-40" />
            </div>

            {/* Title */}
            <h1 className="text-[27px] text-gray-900 text-center font-[400]">
                Please sign up
            </h1>

            {/* Card */}
            <div className="rounded-lg p-6 w-70 max-w-sm">
                <div className="w-70 rounded-md overflow-hidden bg-white">
                    {/* Username */}
                    <div
                        className={`border-x border-t rounded-t-md ${
                            focused === 'username'
                                ? 'border-blue-400'
                                : 'border-gray-300'
                        }`}
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            onFocus={() => setFocused('username')}
                            onBlur={() => setFocused(null)}
                            className="w-full h-12 px-3 py-2 text-gray-900 text-base placeholder-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div
                        className={`border-x border-t ${
                            focused === 'email'
                                ? 'border-blue-400'
                                : 'border-gray-300'
                        } ${focused === 'username' ? 'border-t-blue-500' : ''}`}
                    >
                        <input
                            type="email"
                            placeholder="Email address"
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            className="w-full h-12 px-3 py-2 text-gray-900 text-base placeholder-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div
                        className={`border-x border-t ${
                            focused === 'password'
                                ? 'border-blue-400'
                                : 'border-gray-300'
                        } ${focused === 'email' ? 'border-t-blue-500' : ''}`}
                    >
                        <input
                            type="password"
                            placeholder="Password"
                            onFocus={() => setFocused('password')}
                            onBlur={() => setFocused(null)}
                            className="w-full h-12 px-3 py-2 text-gray-900 text-base placeholder-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div
                        className={`border-x border-t border-b rounded-b-md ${
                            focused === 'confirmPassword'
                                ? 'border-blue-400'
                                : 'border-gray-300'
                        } ${focused === 'password' ? 'border-t-blue-500' : ''}`}
                    >
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            onFocus={() => setFocused('confirmPassword')}
                            onBlur={() => setFocused(null)}
                            className="w-full h-12 px-3 py-2 text-gray-900 text-base placeholder-gray-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="text-center mt-3 text-sm text-gray-800 font-[500] w-58">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Click here!
                    </Link>
                </div>

                {/* Button */}
                <Button
                    type="primary"
                    className="w-70 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium h-12 rounded-md shadow-sm"
                >
                    Sign up
                </Button>

                {/* Link to Login */}
            </div>

            <footer className="ml-1 text-gray-600 text-sm mt-1">
                &copy; 2025 - Rikkei Education
            </footer>
        </div>
    );
}
