import { Music as MusicIcon, ExternalLink, Clock, Play } from 'lucide-react';

export default function Music() {
  return (
    <div className="music-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <MusicIcon size={32} className="page-icon" />
            Música
          </h1>
          <p className="page-subtitle">
            Conecte sua conta do Spotify para ver suas playlists e estatísticas
          </p>
        </div>
      </div>

      <div className="integration-card">
        <div className="integration-icon">
          <MusicIcon size={48} />
        </div>
        <h2 className="integration-title">Integração com Spotify</h2>
        <p className="integration-description">
          Conecte sua conta do Spotify para visualizar suas playlists, músicas mais ouvidas,
          artistas favoritos e estatísticas de escuta.
        </p>

        <button className="btn btn-spotify" disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Conectar com Spotify (Em Breve)
        </button>

        <div className="features-preview">
          <h3 className="features-title">Recursos Disponíveis</h3>
          <div className="features-grid">
            <div className="feature-item">
              <Play size={20} className="feature-icon" />
              <div>
                <p className="feature-name">Playlists</p>
                <p className="feature-desc">Visualize suas playlists favoritas</p>
              </div>
            </div>
            <div className="feature-item">
              <Clock size={20} className="feature-icon" />
              <div>
                <p className="feature-name">Estatísticas</p>
                <p className="feature-desc">Tempo de escuta e top músicas</p>
              </div>
            </div>
            <div className="feature-item">
              <MusicIcon size={20} className="feature-icon" />
              <div>
                <p className="feature-name">Artistas</p>
                <p className="feature-desc">Seus artistas mais ouvidos</p>
              </div>
            </div>
            <div className="feature-item">
              <ExternalLink size={20} className="feature-icon" />
              <div>
                <p className="feature-name">Player Integrado</p>
                <p className="feature-desc">Ouça direto no DayCraft</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .music-container {
          padding: var(--space-8);
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: var(--space-8);
        }

        .header-content {
          max-width: 800px;
        }

        .page-title {
          font-size: var(--text-3xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
          margin-bottom: var(--space-2);
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .page-icon {
          color: var(--color-music);
        }

        .page-subtitle {
          font-size: var(--text-lg);
          color: var(--text-secondary);
        }

        .integration-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: var(--space-12);
          text-align: center;
        }

        .integration-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto var(--space-6);
          border-radius: var(--radius-full);
          background: rgba(187, 154, 247, 0.2);
          color: var(--color-music);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .integration-title {
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
          margin-bottom: var(--space-3);
        }

        .integration-description {
          font-size: var(--text-base);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto var(--space-8);
          line-height: var(--leading-relaxed);
        }

        .btn-spotify {
          background: #1DB954;
          color: white;
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-md);
          font-weight: var(--font-semibold);
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-spotify:hover:not(:disabled) {
          background: #1ed760;
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-spotify:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .features-preview {
          margin-top: var(--space-12);
          padding-top: var(--space-8);
          border-top: 1px solid var(--border-color);
        }

        .features-title {
          font-size: var(--text-xl);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          margin-bottom: var(--space-6);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-6);
          text-align: left;
        }

        .feature-item {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .feature-icon {
          color: var(--color-music);
          flex-shrink: 0;
        }

        .feature-name {
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          margin-bottom: var(--space-1);
        }

        .feature-desc {
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
