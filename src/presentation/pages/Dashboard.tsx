import { Plus, Calendar, DollarSign, Music, Gamepad2, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../main/config/useAppContext';
import { useAuth } from '../hooks/useAuth';
import { useEvents } from '../hooks/useEvents';
import QuoteCard from '../components/QuoteCard';
import QuickActionsCompact from '../components/QuickActionsCompact';

export default function Dashboard() {
  const navigate = useNavigate();
  const { authController, eventController } = useAppContext();
  const { user } = useAuth(authController);
  const { events, loading } = useEvents(eventController, user?.id);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const upcomingEvents = events
    .filter(event => new Date(event.start) >= new Date())
    .slice(0, 5);

  const stats = [
    {
      label: 'Eventos',
      value: events.length.toString(),
      change: `${upcomingEvents.length} próximos`,
      icon: Calendar,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      delay: '0ms'
    },
    {
      label: 'Despesas',
      value: 'R$ 0',
      change: 'Este mês',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      delay: '100ms'
    },
    {
      label: 'Música',
      value: '0h',
      change: 'Esta semana',
      icon: Music,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      delay: '200ms'
    },
    {
      label: 'Games',
      value: '0h',
      change: 'Esta semana',
      icon: Gamepad2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      delay: '300ms'
    },
  ];

  const quickActions = [
    { label: 'Novo Evento', icon: Calendar, path: '/calendar', color: 'hover:border-yellow-500/50' },
    { label: 'Nova Despesa', icon: DollarSign, path: '/finance', color: 'hover:border-green-500/50' },
    { label: 'Playlists', icon: Music, path: '/music', color: 'hover:border-purple-500/50' },
    { label: 'Meus Jogos', icon: Gamepad2, path: '/games', color: 'hover:border-blue-500/50' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Welcome Section - Animated */}
        <div className="mb-12 space-y-6 animate-slide-down">
          <div>
            <h1 className="mb-3 text-5xl font-bold tracking-tight text-white">
              {getGreeting()}, {user?.displayName || user?.email?.split('@')[0]}! 👋
            </h1>
            <p className="text-xl text-gray-400">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <h1 className="mb-3 text-5xl font-bold tracking-tight text-white">
                {getGreeting()}, {user?.displayName || user?.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-xl text-gray-400">
                {new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-start justify-end">
              <div className="w-full max-w-xs">
                <QuoteCard />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group animate-slide-up rounded-lg border border-white/5 bg-[#111111] p-6 transition-all duration-300 hover:border-white/10"
              style={{ animationDelay: stat.delay }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="mb-1 text-sm text-gray-400">{stat.label}</p>
                  <p className="mb-2 text-3xl font-bold text-white">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <TrendingUp size={12} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`rounded-lg ${stat.bgColor} p-3 transition-transform group-hover:scale-110`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="animate-slide-in rounded-lg border border-white/5 bg-[#111111] p-8" style={{ animationDelay: '400ms' }}>
            <h2 className="mb-6 text-xl font-semibold text-white">Ações Rápidas</h2>
            <QuickActionsCompact actions={quickActions} onNavigate={(p) => navigate(p)} />
          </div>

          <div className="animate-slide-in rounded-lg border border-white/5 bg-[#111111] p-8" style={{ animationDelay: '500ms' }}>
            <h2 className="mb-6 text-xl font-semibold text-white">Próximos Eventos</h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white"></div>
                <p className="mt-4 text-sm text-gray-400">Carregando eventos...</p>
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="group flex items-center gap-4 rounded-lg border border-white/5 bg-[#1a1a1a] p-4 transition-all duration-300 hover:border-white/10 hover:bg-[#222222]"
                    style={{
                      animation: 'slideIn 0.3s ease-out',
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'backwards'
                    }}
                  >
                    <div
                      className="h-12 w-1 rounded-full"
                      style={{ backgroundColor: event.backgroundColor }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-white">{event.title}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(event.start).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: event.backgroundColor + '20',
                        color: event.backgroundColor
                      }}
                    >
                      {event.extendedProps.typeLabel}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-white/5 p-6">
                  <Calendar className="h-12 w-12 text-gray-600" />
                </div>
                <p className="mb-4 text-gray-400">Nenhum evento próximo</p>
                <button
                  onClick={() => navigate('/calendar')}
                  className="group flex items-center gap-2 rounded-lg border border-white bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:bg-gray-200"
                >
                  <Plus size={16} />
                  Criar Evento
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
