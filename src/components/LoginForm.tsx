import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, Users, CheckCircle } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { createAllDemoUsers } from '../utils/createDemoUsers';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [creatingUsers, setCreatingUsers] = useState(false);
  const [usersCreated, setUsersCreated] = useState(false);
  
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDemoUsers = async () => {
    setCreatingUsers(true);
    setError('');
    
    try {
      const result = await createAllDemoUsers();
      
      if (result.created.length > 0 || result.existing.length > 0) {
        setUsersCreated(true);
        setError('');
        // Show success message
        setTimeout(() => {
          setUsersCreated(false);
        }, 5000);
      } else if (result.errors.length > 0) {
        setError(`Failed to create users: ${result.errors[0].error}`);
      }
    } catch (error: any) {
      setError(`Error creating demo users: ${error.message}`);
    } finally {
      setCreatingUsers(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl mb-4">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">CRM Admin Login</h1>
          <p className="text-slate-400">Sign in to access the admin panel</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <span className="text-red-300 text-sm">{error}</span>
          </div>
        )}

        {/* Success Message */}
        {usersCreated && (
          <div className="bg-green-900/50 border border-green-500/50 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            <span className="text-green-300 text-sm">Demo users created successfully! You can now login.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              <Mail className="h-4 w-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              <Lock className="h-4 w-4 inline mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200 pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:from-slate-600 disabled:to-slate-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
          <h3 className="text-sm font-medium text-slate-300 mb-3">Demo Credentials:</h3>
          
          <div className="space-y-2 text-xs text-slate-400">
            <div>
              <strong className="text-blue-400">Administrator:</strong> admin@digitalmetrics.com / admin123
            </div>
            <div>
              <strong className="text-green-400">CRM Manager:</strong> manager@digitalmetrics.com / manager123
            </div>
            <div>
              <strong className="text-yellow-400">Sales:</strong> sales@digitalmetrics.com / sales123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;