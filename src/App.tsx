import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import BreedsPage from './components/pages/BreedsPage.tsx';
import FavouritesPage from './components/pages/FavouritesPage';
import ImagesPage from './components/pages/ImagesPage';
import NotFoundPage from './components/pages/NotFoundPage';
import ScrollTop from './components/shared/ScrollTop';
import store from './store';

const queryClient = new QueryClient();

/**
 * The main application component
 *
 * Wraps the application with the Redux store, the React Query client, and the Router.
 * It also includes a ScrollTop component to scroll to the top of the page between
 * page navigations.
 *
 * NOTES:
 * - For the purpose of this app, since the heavy lifting of the fetched data is done
 *   by React Query caching, using Redux wouldn't necessarily be needed. However, I
 *   was interested in using it as, since the version that I've previously used, the
 *   toolkit was released and I wanted to see how it has evolved.
 * - Uncomment the ReactQueryDevtools to see them in the browser and inspect the cache.
 */
const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollTop />
          <Header />
          <Routes>
            <Route path="/" element={<ImagesPage />} />
            <Route path="/breeds" element={<BreedsPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Router>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
