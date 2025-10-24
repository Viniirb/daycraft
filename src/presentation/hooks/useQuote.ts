import { useEffect, useState, useCallback } from 'react';

type Quote = {
  content: string;
  author: string;
};

const AUTHORS = [
  'Albert Einstein',
  'Isaac Newton',
  'Richard Feynman',
  'Carl Sagan',
  'Ada Lovelace',
  'Alan Turing',
  'Marie Curie'
];

export function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForAuthor = useCallback(async (author: string) => {
    try {
      const resp = await fetch(`https://api.quotable.io/random?author=${encodeURIComponent(author)}`);
      if (!resp.ok) throw new Error('No quote');
      const data = await resp.json();
      return { content: data.content, author: data.author } as Quote;
    } catch (e) {
      console.debug('quote author fetch failed', e);
      return null;
    }
  }, []);

  const fetchRandom = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      for (let i = 0; i < AUTHORS.length; i++) {
        const idx = Math.floor(Math.random() * AUTHORS.length);
        const result = await fetchForAuthor(AUTHORS[idx]);
        if (result) {
          setQuote(result);
          setLoading(false);
          return;
        }
      }

      const resp = await fetch('https://api.quotable.io/random?tags=science|technology');
      if (!resp.ok) throw new Error('No quote');
      const data = await resp.json();
      setQuote({ content: data.content, author: data.author });
    } catch (e) {
  console.debug('quote fetch failed', e);
      setError('Não foi possível carregar citação');
    } finally {
      setLoading(false);
    }
  }, [fetchForAuthor]);

  useEffect(() => {
    fetchRandom();
  }, [fetchRandom]);

  return { quote, loading, error, refresh: fetchRandom };
}
