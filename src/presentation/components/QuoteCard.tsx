import { RefreshCw } from 'lucide-react';
import { useQuote } from '../hooks/useQuote';

export default function QuoteCard() {
  const { quote, loading, error, refresh } = useQuote();

  return (
    <div className="w-full max-w-sm rounded-lg border border-white/5 bg-[#0f1720] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {loading ? (
            <p className="text-sm text-gray-400">Carregando...</p>
          ) : error ? (
            <p className="text-sm text-red-400">{error}</p>
          ) : quote ? (
            <>
              <p className="mb-2 text-sm italic text-gray-100">“{quote.content}”</p>
              <p className="text-xs text-gray-400">— {quote.author}</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">Sem citação disponível</p>
          )}
        </div>
        <button
          onClick={refresh}
          title="Nova citação"
          className="ml-2 flex h-8 w-8 items-center justify-center rounded bg-white/5 text-gray-300 transition-colors hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
