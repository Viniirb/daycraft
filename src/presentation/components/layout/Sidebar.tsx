import { NavLink } from 'react-router-dom';
import { CalendarDays, CircleDollarSign, Library, LogOut } from 'lucide-react';
import { useAppContext } from '../../../main/config/useAppContext';
import { useAuth } from '../../hooks/useAuth';

interface NavItemProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function NavItem({ to, icon: Icon, children }: NavItemProps) {
  const baseClasses =
    'flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 transition-all duration-200';
  const activeClasses = 'bg-gray-700 text-white font-medium';
  const hoverClasses = 'hover:bg-gray-700 hover:text-white';

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : hoverClasses}`
      }
    >
      <Icon className="h-5 w-5" />
      {children}
    </NavLink>
  );
}

export default function Sidebar() {
  const { authController } = useAppContext();
  const { user, logout } = useAuth(authController);

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto bg-gray-800 p-4">
      <div className="mb-8 flex items-center gap-3 px-3">
        <h1 className="text-2xl font-bold text-blue-400">DayCraft</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem to="/" icon={CalendarDays}>
          Calendário
        </NavItem>
        <NavItem to="/finance" icon={CircleDollarSign}>
          Finanças
        </NavItem>
        <NavItem to="/hobbies" icon={Library}>
          Hobbies
        </NavItem>
      </nav>

      <div className="mt-auto border-t border-gray-700 pt-4">
        <div className="mb-4 flex items-center gap-3 rounded-md p-2">
          {user?.hasPhoto ? (
            <img
              src={user.photoURL}
              alt="Foto do usuário"
              className="h-9 w-9 rounded-full"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-600 text-sm font-medium text-gray-300">
              {user?.initials}
            </div>
          )}
          <span className="truncate text-sm font-medium text-gray-200">
            {user?.displayName || user?.email}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-300 transition-all duration-200 hover:bg-red-600 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
