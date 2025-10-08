import { useEffect, useState, type ChangeEvent } from 'react';
import brandLogo from '../assets/brand.png';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers } from '../apis/user.api';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { toast, ToastContainer } from 'react-toastify';
type LoginType = {
    email: string;
    password: string;
    isRemember: boolean;
};
export default function Login() {
    const [focused, setFocused] = useState<'email' | 'password' | null>(null);
    const [loading, setLoading] = useState(false);

    const [account, setAccount] = useState<LoginType>(() => {
        const dataLocal = localStorage.getItem('currentUser');
        const user = dataLocal ? JSON.parse(dataLocal) : null;

        return {
            email: user?.email || '',
            password: user?.password || '',
            isRemember: user?.isRemember || false,
        };
    });

    const users = atminSelector((s) => s.user.users);
    const dispatch = atminDispatch();
    const nvg = useNavigate();

    useEffect(() => {
        if (users.length === 0) dispatch(getUsers());
    }, [dispatch, users.length]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccount((pre) => ({ ...pre, [name]: value }));
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!account.email || !account.password) {
            toast.error('Please fill in all fields!');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const user = users.find((u) => u.account.email === account.email);

            if (!user || user.account.password !== account.password) {
                toast.error('Incorrect account or password!');
                setLoading(false);
                return;
            }

            const currentUser = {
                email: user.account.email,
                id: user.id,
                isRemember: account.isRemember,
                password: account.password,
                avata: user.avata,
                username: user.account.username,
            };

            // Lưu thông tin user
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            toast.success('Login successful!', {
                onClose: () => nvg('/home'),
                autoClose: 1200,
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <ToastContainer
                autoClose={1200}
                closeOnClick
                pauseOnHover
                draggable
            />
            <div className="flex justify-center mb-4">
                <img src={brandLogo} alt="brand" className="w-24 sm:w-40" />
            </div>

            <h1 className="text-[27px] text-gray-900 text-center mb-2 font-[400]">
                Please sign in
            </h1>

            <div className=" rounded-lg p-6 w-70 max-w-sm ">
                <form
                    onSubmit={handleLogin}
                    className="w-70 rounded-md overflow-hidden "
                >
                    <div
                        className={`border rounded-t-md bg-white ${
                            focused === 'email'
                                ? 'border-blue-400'
                                : 'border-gray-300'
                        } ${focused === 'password' ? 'border-b-blue-500' : ''}`}
                    >
                        <input
                            type="email"
                            name="email"
                            value={account.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            className="w-full h-12 px-3 py-2 text-gray-900 text-base placeholder-gray-500 focus:outline-none"
                        />
                    </div>

                    <div
                        className={`border border-t-0 rounded-b-md bg-white ${
                            focused === 'password'
                                ? 'border-blue-400'
                                : 'border-gray-300'
                        }`}
                    >
                        <input
                            type="password"
                            name="password"
                            value={account.password}
                            onChange={handleChange}
                            placeholder="Password"
                            onFocus={() => setFocused('password')}
                            onBlur={() => setFocused(null)}
                            className="w-full h-12 px-3 py-2 text-gray-900 text-base placeholder-gray-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center mt-3 ml-1">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={account.isRemember}
                            onChange={(e) =>
                                setAccount((pre) => ({
                                    ...pre,
                                    isRemember: e.target.checked,
                                }))
                            }
                            className="w-3 h-3 border border-gray-400 rounded cursor-pointer text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm text-gray-900 cursor-pointer select-none mb-0.5"
                        >
                            Remember me
                        </label>
                    </div>

                    <div className="ml-1 mt-2 text-sm text-gray-800 font-[400] w-58">
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
                        loading={loading}
                        htmlType="submit"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>
            </div>

            {/* Footer */}
            <footer className="ml-1 text-gray-600 text-sm mt-1">
                &copy; 2025 - Rikkei Education
            </footer>
        </div>
    );
}
