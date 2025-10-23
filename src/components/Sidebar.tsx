import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import { CalendarDays, CircleDollarSign, Library, LogOut } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NavItem({ to, icon: Icon, children }: any) {
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
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth);
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
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Foto do usuário"
              className="h-9 w-9 rounded-full"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-600 text-sm font-medium text-gray-300">
              {user?.email?.[0].toUpperCase()}
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