import React from 'react';
import { useAuth, UserRole } from './AuthProvider';
import LoginForm from './LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  requiredPermission 
}) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return <LoginForm />;
  }

  // Check role requirement
  if (requiredRole && userProfile.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700/50">
          <div className="text-red-400 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-400 mb-6">
            You don't have permission to access this resource.
          </p>
          <p className="text-sm text-slate-500">
            Required role: <span className="text-blue-400 font-medium">{requiredRole}</span><br />
            Your role: <span className="text-green-400 font-medium">{userProfile.role}</span>
          </p>
        </div>
      </div>
    );
  }

  // Check permission requirement
  if (requiredPermission) {
    const { hasPermission } = useAuth();
    if (!hasPermission(requiredPermission)) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700/50">
            <div className="text-red-400 text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-white mb-4">Insufficient Permissions</h1>
            <p className="text-slate-400 mb-6">
              You don't have the required permission to access this feature.
            </p>
            <p className="text-sm text-slate-500">
              Required permission: <span className="text-blue-400 font-medium">{requiredPermission}</span>
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;