import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

type Action = {
  label: string;
  icon: React.ElementType;
  path: string;
  color?: string;
};

export default function QuickActionsCompact({ actions, onNavigate }: { actions: Action[]; onNavigate: (path: string) => void; }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? actions : actions.slice(0, 4);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {visible.map((a) => (
          <button
            key={a.label}
            onClick={() => onNavigate(a.path)}
            className={`flex items-center gap-2 rounded-full border border-white/5 bg-[#1a1a1a] px-3 py-2 text-sm transition-all hover:bg-[#222222] ${a.color || ''}`}
          >
            <a.icon className="h-4 w-4 text-gray-300" />
            <span className="hidden md:inline-block text-gray-300">{a.label}</span>
          </button>
        ))}

        {actions.length > 4 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 flex items-center gap-2 rounded-full border border-white/5 bg-[#111111] px-3 py-2 text-sm text-gray-300 transition-all hover:bg-[#222222]"
            title={expanded ? 'Mostrar menos' : 'Ver mais'}
          >
            {expanded ? 'Menos' : 'Mais'}
            <ArrowRight className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.path)}
              className={`group flex items-center gap-3 rounded-lg border border-white/5 bg-[#1a1a1a] p-3 text-left transition-all duration-300 hover:bg-[#222222] ${a.color || ''}`}
            >
              <a.icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white" />
              <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-white">{a.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
