import { useState } from 'react';
import brandLogo from '../assets/brand.png';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function Login() {
    const [focused, setFocused] = useState<'email' | 'password' | null>(null);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            {/* Logo */}
            <div className="flex justify-center mb-4">
                <img src={brandLogo} alt="brand" className="w-24 sm:w-40" />
            </div>

            {/* Title */}
            <h1 className="text-[27px] text-gray-900 text-center mb-2 font-[400]">
                Please sign in
            </h1>

            {/* Card */}
            <div className=" rounded-lg p-6 w-70 max-w-sm ">
                <div className="w-70 rounded-md overflow-hidden bg-white">
                    {/* Email */}
                    <div
                        className={`border rounded-t-md ${
                            focused === 'email'
                                ? 'border-blue-400'
                                : 'border-gray-300'
                        } ${focused === 'password' ? 'border-b-blue-500' : ''}`}
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
                        className={`border border-t-0 rounded-b-md ${
                            focused === 'password'
                                ? 'border-blue-400'
                                : 'border-gray-300'
                        }`}
                    >
                        <input
                            type="password"
                            placeholder="Password"
                            onFocus={() => setFocused('password')}
                            onBlur={() => setFocused(null)}
                            className="w-full h-12 px-3 py-2 text-gray-900 text-base placeholder-gray-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center mt-3 ml-1">
                    <input
                        type="checkbox"
                        id="remember"
                        className="w-3 h-3 border border-gray-400 rounded cursor-pointer text-blue-600 focus:ring-blue-500"
                    />
                    <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-gray-900 cursor-pointer select-none mb-0.5"
                    >
                        Remember me
                    </label>
                </div>

                {/* Link */}
                <div className="ml-1 mt-2 text-sm text-gray-800 font-[500] w-58">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Click here!
                    </Link>
                </div>

                {/* Button */}
                <Button
                    type="primary"
                    className="w-70 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium h-12 rounded-md shadow-sm"
                >
                    Sign in
                </Button>
            </div>

            {/* Footer */}
            <footer className="ml-1 text-gray-600 text-sm mt-1">
                &copy; 2025 - Rikkei Education
            </footer>
        </div>
    );
}
