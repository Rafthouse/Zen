import { Link, NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useI18n } from '@/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

/**
 * The single page frame: a quiet header (title + favorites + language + theme),
 * a generously-padded main column, and nothing else. Every screen renders into
 * <main>. The skip link and <main> landmark support keyboard / screen readers.
 */
export default function Layout({ children }: { children: ReactNode }) {
  const { t } = useI18n();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        {t('nav.home')}
      </a>

      <header className="app-header">
        <Link to="/" className="brand" aria-label={t('app.title')}>
          {t('app.title')}
        </Link>

        <nav className="header-actions" aria-label={t('nav.home')}>
          <NavLink to="/favorites" className="text-link">
            {t('nav.favorites')}
          </NavLink>
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </header>

      <main id="main" className="app-main" tabIndex={-1}>
        {children}
      </main>

      <footer className="app-footer">
        <span>{t('app.tagline')}</span>
      </footer>
    </div>
  );
}
