import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>

      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-primary);
        }

        .main-content {
          margin-left: var(--sidebar-width);
          flex: 1;
          overflow-x: hidden;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: var(--sidebar-collapsed-width);
          }
        }
      `}</style>
    </div>
  );
}
