import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/sidebar';
import LoadingSpinner from '../components/LoadingSpinner';

const MainLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="ml-[15%] w-[85%] p-4 pl-0">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MainLayout; 