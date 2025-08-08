import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    if (!agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    try {
      await register(name, email, password);
      toast.success('Registration successful');
      navigate('/');
    } catch (err) {
      // Error is handled by the Auth Context
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Create a new account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={validatePassword}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {passwordError && (
                <p className="mt-1 text-xs text-red-600">{passwordError}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or register with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign up with Google</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm6.691 13.933c-.399 2.028-1.893 3.673-3.903 4.369-1.971.693-4.186.384-5.971-.831-1.796-1.224-2.891-3.243-2.891-5.468 0-3.308 2.666-6.006 5.95-6.076a6.43 6.43 0 0 1 5.16 2.608 6.3 6.3 0 0 1 1.188 5.397h-8.67v-1.881h4.76a2.97 2.97 0 0 0-.678-1.755 3.26 3.26 0 0 0-2.423-1.133 3.4 3.4 0 0 0-2.431 1.007 3.4 3.4 0 0 0 0 4.8 3.4 3.4 0 0 0 2.431 1.007c1.122 0 2.162-.548 2.793-1.465l1.694 1.428z" />
                  </svg>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign up with Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign up with Apple</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.783 2C14.163 2 15.142 2.587 15.862 2.958c0.614 0.324 1.156 0.344 1.512 0.344 0.09 0 0.144 0 0.151 0 0.095 0.008 0.149 0.015 0.149 0.015s-0.09 0.277-0.238 0.714c-0.148 0.436-0.387 1.053-0.675 1.471-0.493 0.721-1.187 0.75-1.453 0.757H15.29c-0.432 0-0.916-0.215-1.546-0.562-0.536-0.296-1.151-0.664-1.886-0.664a3.65 3.65 0 0 0-1.562 0.371c-0.683 0.322-1.226 0.855-1.584 1.633 0.062-0.008 0.122-0.015 0.183-0.015 1.208 0 2.073 0.664 2.727 1.234 0.711 0.619 1.228 1.179 2.1 1.179 0.883 0 1.367-0.514 2.093-1.082 0.579-0.452 1.261-0.985 2.186-1.157v1.822c-0.755 0.164-1.256 0.59-1.826 1.066-0.717 0.592-1.526 1.26-2.818 1.26-1.286 0-2.101-0.655-2.794-1.233-0.585-0.485-1.055-0.905-1.667-0.984v5.12c0 2.517-2.033 4.551-4.551 4.551S0 20.517 0 18c0-2.516 2.033-4.55 4.55-4.55 0.49 0 0.966 0.079 1.413 0.222V8.396c0-0.828 0.108-1.568 0.356-2.241 0.241-0.66 0.615-1.261 1.1-1.765 0.484-0.505 1.064-0.9 1.735-1.183A5.487 5.487 0 0 1 12.783 2zM4.55 15.035c-1.645 0-2.966 1.322-2.966 2.965a2.96 2.96 0 0 0 2.966 2.966c1.643 0 2.965-1.323 2.965-2.966 0-1.644-1.322-2.965-2.965-2.965z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;