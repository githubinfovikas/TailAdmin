import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import SidebarIcon from '../components/SidebarIcon';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // inner width se screen check kiya hu
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState); 
  };

  useEffect(() => {
    setSidebarOpenIcon(!sidebarOpen); 
  }, [sidebarOpen]);

  const [sidebarOpenIcon, setSidebarOpenIcon] = useState(!sidebarOpen); 
  return ( 
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {sidebarOpen && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        <div className='hidden sm:block'>
          {sidebarOpenIcon && (
            <SidebarIcon sidebarOpen={sidebarOpenIcon} setSidebarOpen={setSidebarOpenIcon} />
          )}
        </div>
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
