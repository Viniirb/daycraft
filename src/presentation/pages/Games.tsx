import { Gamepad2, Trophy, Clock, TrendingUp } from 'lucide-react';

export default function Games() {
  return (
    <div className="games-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <Gamepad2 size={32} className="page-icon" />
            Games
          </h1>
          <p className="page-subtitle">
            Conecte suas contas de gaming para acompanhar seu progresso e estatísticas
          </p>
        </div>
      </div>

      <div className="platforms-grid">
        {/* Steam */}
        <div className="platform-card">
          <div className="platform-header">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="platform-logo">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
            </svg>
            <h3 className="platform-name">Steam</h3>
          </div>
          <p className="platform-description">
            Acompanhe sua biblioteca, conquistas e tempo jogado
          </p>
          <button className="btn btn-platform" disabled>
            Conectar Steam (Em Breve)
          </button>
        </div>

        {/* PlayStation */}
        <div className="platform-card">
          <div className="platform-header">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="platform-logo">
              <path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-1.151.636 0 .794.396.794 1.151v10.546l4.028-1.692V6.688c0-2.021-1.168-3.742-3.607-3.742-1.995 0-3.18 1.306-3.924 2.65zm-3.924 8.26v7.77l3.924 1.261v-7.77L5.061 10.856zm19.939 4.486c-1.995 0-3.18-1.306-3.924-2.65V23.94l3.915-1.261V11.133c0-.69.304-1.151.794-1.151.636 0 .794.396.794 1.151v10.546l4.028 1.692V11.133c0-2.021-1.168-3.742-3.607-3.742z"/>
            </svg>
            <h3 className="platform-name">PlayStation</h3>
          </div>
          <p className="platform-description">
            Visualize seus troféus e jogos da biblioteca PSN
          </p>
          <button className="btn btn-platform" disabled>
            Conectar PSN (Em Breve)
          </button>
        </div>

        {/* Xbox */}
        <div className="platform-card">
          <div className="platform-header">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="platform-logo">
              <path d="M4.102 21.033A11.947 11.947 0 0 0 12 24a11.96 11.96 0 0 0 7.902-2.967c1.67-1.481 2.88-3.409 3.443-5.498.586-2.114.578-4.362-.016-6.482-.584-2.067-1.677-3.893-3.125-5.23A11.975 11.975 0 0 0 12 0c-2.93 0-5.686 1.058-7.902 2.967C2.428 4.448 1.218 6.376.655 8.465c-.586 2.114-.578 4.362.016 6.482.584 2.067 1.677 3.893 3.125 5.23a11.95 11.95 0 0 0 .306.856zm15.848-5.24c-.21-.393-1.04-1.787-2.527-3.275-1.487-1.488-2.88-2.317-3.273-2.527.393-.21 1.786-1.04 3.273-2.527 1.487-1.488 2.317-2.882 2.527-3.275a9.384 9.384 0 0 1 1.912 5.812 9.38 9.38 0 0 1-1.912 5.792zm-7.95-13.742c1.163 0 2.297.188 3.366.556-.21.393-1.04 1.787-2.527 3.275-1.488 1.487-2.883 2.317-3.276 2.527-.21-.393-1.04-1.787-2.527-3.275C5.55 3.647 4.157 2.818 3.764 2.607A9.355 9.355 0 0 1 12 2.051zM2.051 12c0-2.087.645-4.03 1.76-5.625.392.21 1.786 1.04 3.274 2.527 1.488 1.488 2.318 2.882 2.528 3.275-.21.393-1.04 1.787-2.527 3.275-1.488 1.487-2.882 2.317-3.275 2.527A9.38 9.38 0 0 1 2.051 12zm5.139 7.949c.21-.393 1.04-1.787 2.527-3.275 1.488-1.488 2.883-2.317 3.276-2.527.392.21 1.786 1.04 3.274 2.527 1.487 1.488 2.317 2.882 2.527 3.275a9.355 9.355 0 0 1-5.604 1.76 9.359 9.359 0 0 1-5.604-1.76z"/>
            </svg>
            <h3 className="platform-name">Xbox Live</h3>
          </div>
          <p className="platform-description">
            Veja seu Gamerscore e conquistas do Xbox
          </p>
          <button className="btn btn-platform" disabled>
            Conectar Xbox (Em Breve)
          </button>
        </div>
      </div>

      {/* Features Preview */}
      <div className="features-section">
        <h2 className="features-heading">Recursos Disponíveis</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Gamepad2 size={24} />
            </div>
            <h3 className="feature-title">Biblioteca de Jogos</h3>
            <p className="feature-description">
              Visualize todos os seus jogos em um só lugar
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Trophy size={24} />
            </div>
            <h3 className="feature-title">Conquistas & Troféus</h3>
            <p className="feature-description">
              Acompanhe seu progresso e desbloqueios
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Clock size={24} />
            </div>
            <h3 className="feature-title">Tempo Jogado</h3>
            <p className="feature-description">
              Estatísticas detalhadas de tempo de jogo
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={24} />
            </div>
            <h3 className="feature-title">Estatísticas</h3>
            <p className="feature-description">
              Gráficos e insights sobre seus hábitos gaming
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .games-container {
          padding: var(--space-8);
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: var(--space-8);
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
          color: var(--color-games);
        }

        .page-subtitle {
          font-size: var(--text-lg);
          color: var(--text-secondary);
        }

        .platforms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-6);
          margin-bottom: var(--space-12);
        }

        .platform-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          text-align: center;
          transition: all var(--transition-base);
        }

        .platform-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--border-color-light);
        }

        .platform-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .platform-logo {
          color: var(--text-primary);
        }

        .platform-name {
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
        }

        .platform-description {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-bottom: var(--space-6);
          line-height: var(--leading-relaxed);
        }

        .btn-platform {
          width: 100%;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          font-weight: var(--font-medium);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-platform:hover:not(:disabled) {
          background: var(--bg-hover);
          border-color: var(--color-games);
        }

        .btn-platform:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .features-section {
          padding-top: var(--space-8);
          border-top: 1px solid var(--border-color);
        }

        .features-heading {
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
          margin-bottom: var(--space-8);
          text-align: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-6);
        }

        .feature-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          text-align: center;
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto var(--space-4);
          border-radius: var(--radius-md);
          background: rgba(122, 162, 247, 0.2);
          color: var(--color-games);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-title {
          font-size: var(--text-lg);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          margin-bottom: var(--space-2);
        }

        .feature-description {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
        }

        @media (max-width: 640px) {
          .platforms-grid,
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
