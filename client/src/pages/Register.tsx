import { useEffect, useState, type ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import brandLogo from '../assets/brand.png';
import { Button } from 'antd';
import type { Account } from '../interfaces/auth.interface';
import { toast, ToastContainer } from 'react-toastify';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { createUser, getUsers } from '../apis/user.api';
import type { User } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

export default function Register() {
    const [focused, setFocused] = useState<
        'username' | 'email' | 'password' | 'confirmPassword' | null
    >(null);

    const [account, setAccount] = useState<Account>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const users = atminSelector((s) => s.user.users);

    const dispatch = atminDispatch();
    useEffect(() => {
        if (users.length === 0) dispatch(getUsers());
    }, [dispatch, users]);
    const nvg = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccount((pre) => ({ ...pre, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check empty fields
        if (
            !account.username ||
            !account.email ||
            !account.password ||
            !account.confirmPassword
        ) {
            toast.error('Please fill in all fields!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(account.email)) {
            toast.error('Invalid email format!');
            return;
        }

        // Check password not match
        if (account.password !== account.confirmPassword) {
            toast.warning('Passwords do not match!');
            return;
        }

        if (account.password.length < 8) {
            toast.error('The number of characters must be larger than 8');
            return;
        }

        if (!/^[A-Z]/.test(account.password)) {
            toast.warn('Password must start with an uppercase letter.');
            return;
        }

        if (!/\d/.test(account.password)) {
            toast.warn('Password must contain at least one number.');
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(account.password)) {
            toast.warn('Password must contain at least one special character.');
            return;
        }

        // Check username duplicate
        const duplicateUsername = users.find(
            (u) => u.account.username === account.username
        );
        if (duplicateUsername) {
            toast.error('This username is already taken!');
            return;
        }

        // Check email duplicate
        const duplicateEmail = users.find(
            (u) => u.account.email === account.email
        );
        if (duplicateEmail) {
            toast.error('This email is already registered!');
            return;
        }

        //create user
        const newUser: User = {
            account: {
                email: account.email,
                username: account.username,
                password: account.password,
            },
            avata: null,
            id: uuidv4(),
        };

        // add user
        const result = await dispatch(createUser(newUser));
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success('Account created successfully!', {
                autoClose: 1000,
                onClose: () => {
                    nvg('/login');
                    setAccount({
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                },

                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
        // Reset form
    };

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

            <ToastContainer />

            {/* Card */}
            <form
                onSubmit={handleSubmit}
                className="rounded-lg p-6 w-70 max-w-sm"
            >
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
                            value={account.username}
                            onChange={handleChange}
                            type="text"
                            name="username"
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
                            type="text"
                            name="email"
                            value={account.email}
                            onChange={handleChange}
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
                            value={account.password}
                            onChange={handleChange}
                            type="password"
                            name="password"
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
                            value={account.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onFocus={() => setFocused('confirmPassword')}
                            onBlur={() => setFocused(null)}
                            className="w-full h-12 px-3 py-2 text-gray-900 text-base placeholder-gray-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="text-center mt-3 text-sm text-gray-800 font-[400] w-58">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Click here!
                    </Link>
                </div>

                {/* Button */}
                <Button
                    type="primary"
                    className="w-70 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium h-12 rounded-md shadow-sm"
                    htmlType="submit"
                >
                    Sign up
                </Button>

                {/* Link to Login */}
            </form>

            <footer className="ml-1 text-gray-600 text-sm mt-1">
                &copy; 2025 - Rikkei Education
            </footer>
        </div>
    );
}
