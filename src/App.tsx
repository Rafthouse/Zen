import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from '@/i18n';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { FlowProvider } from '@/flow/FlowContext';
import Layout from '@/components/Layout';
import Home from '@/screens/Home';
import Flow from '@/screens/Flow';
import Results from '@/screens/Results';
import KoanView from '@/screens/KoanView';
import Favorites from '@/screens/Favorites';

/**
 * Provider order, outermost first:
 *   ThemeProvider     — paints <html data-theme> before anything renders.
 *   I18nProvider      — language + translation helpers used everywhere.
 *   FavoritesProvider — localStorage-backed list of kept teachings.
 *   FlowProvider      — the four answers the user gives during the flow.
 *
 * We use HashRouter (not BrowserRouter) on purpose: GitHub Pages serves static
 * files and has no server-side rewrite, so deep links like /koan/empty_cup would
 * 404 on refresh under BrowserRouter. The "#" keeps all routing client-side and
 * makes the build path-independent. See README for the full rationale.
 */
export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <FavoritesProvider>
          <FlowProvider>
            <HashRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/flow" element={<Flow />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/koan/:id" element={<KoanView />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </HashRouter>
          </FlowProvider>
        </FavoritesProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
