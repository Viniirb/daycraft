import { NavLink } from 'react-router-dom';
import {
  Home,
  Calendar,
  DollarSign,
  Music,
  Gamepad2,
  Heart,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAppContext } from '../../../main/config/useAppContext';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <Home size={20} />,
    color: 'var(--text-primary)'
  },
  {
    name: 'Calendário',
    path: '/calendar',
    icon: <Calendar size={20} />,
    color: 'var(--color-calendar)'
  },
  {
    name: 'Finanças',
    path: '/finance',
    icon: <DollarSign size={20} />,
    color: 'var(--color-finance)'
  },
  {
    name: 'Música',
    path: '/music',
    icon: <Music size={20} />,
    color: 'var(--color-music)'
  },
  {
    name: 'Games',
    path: '/games',
    icon: <Gamepad2 size={20} />,
    color: 'var(--color-games)'
  },
  {
    name: 'Hobbies',
    path: '/hobbies',
    icon: <Heart size={20} />,
    color: 'var(--color-hobbies)'
  }
];

export default function Sidebar() {
  const { authController } = useAppContext();
  const { user, logout } = useAuth(authController);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon-wrapper">
            <Sparkles className="logo-icon-sparkle" size={16} />
            <Calendar className="logo-icon-main" size={24} />
          </div>
          <div className="logo-text-wrapper">
            <span className="logo-text-main">DayCraft</span>
            <span className="logo-text-tagline">Organize sua vida</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
          >
            <span className="nav-icon" style={{ color: item.color }}>
              {item.icon}
            </span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <NavLink to="/settings" className="nav-item">
          <span className="nav-icon">
            <Settings size={20} />
          </span>
          <span className="nav-text">Configurações</span>
        </NavLink>

        {user && (
          <>
            <div className="user-info">
              {user?.hasPhoto ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="user-avatar"
                />
              ) : (
                <div className="user-avatar-placeholder">
                  {user?.initials}
                </div>
              )}
              <span className="user-name">
                {user?.displayName || user?.email}
              </span>
            </div>

            <button onClick={handleLogout} className="nav-item nav-item-logout">
              <span className="nav-icon">
                <LogOut size={20} />
              </span>
              <span className="nav-text">Sair</span>
            </button>
          </>
        )}
      </div>

      <style>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: var(--sidebar-width);
          height: 100vh;
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          z-index: var(--z-fixed);
          overflow-y: auto;
        }

        .sidebar-header {
          padding: var(--space-6) var(--space-6) var(--space-5);
          border-bottom: 1px solid var(--border-color);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .logo-container:hover {
          transform: translateY(-1px);
        }

        .logo-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        .logo-icon-main {
          color: #ffffff;
          z-index: 2;
        }

        .logo-icon-sparkle {
          position: absolute;
          top: 4px;
          right: 4px;
          color: #ffffff;
          opacity: 0.8;
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .logo-text-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .logo-text-main {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .logo-text-tagline {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .sidebar-nav {
          flex: 1;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          text-decoration: none;
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
          transition: all var(--transition-fast);
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          background-color: var(--bg-hover);
          color: var(--text-primary);
        }

        .nav-item-active {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .nav-item-logout {
          color: var(--accent-red);
        }

        .nav-item-logout:hover {
          background-color: rgba(247, 118, 142, 0.1);
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-text {
          flex: 1;
        }

        .sidebar-footer {
          padding: var(--space-4);
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          object-fit: cover;
        }

        .user-avatar-placeholder {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
        }

        .user-name {
          font-size: var(--text-sm);
          color: var(--text-primary);
          font-weight: var(--font-medium);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: var(--sidebar-collapsed-width);
          }

          .logo-text-wrapper,
          .nav-text,
          .user-name {
            display: none;
          }

          .logo-container {
            justify-content: center;
          }

          .nav-item {
            justify-content: center;
          }

          .user-info {
            justify-content: center;
          }
        }
      `}</style>
    </aside>
  );
}
