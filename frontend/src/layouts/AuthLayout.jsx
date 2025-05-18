import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] bg-white rounded-lg shadow-lg overflow-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default AuthLayout; 