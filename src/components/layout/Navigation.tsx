import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useRedux';

/**
 * Navigation component for the main navigation
 *
 * - Shows the links to the main pages of the app: Home, Breeds and Favourites.
 * - Favourites link is displayed as heart icon and shows the count of the current
 *   favourite images.
 */
const Navigation = () => {
  const favouritesCount = useAppSelector((state) => state.favourites.images.length);

  return (
    <nav className="navigation" aria-label="main navigation">
      <ul>
        <li>
          <NavLink to="/" title="home" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/breeds"
            title="breeds"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Breeds
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favourites"
            title="favourites"
            aria-label="favourites"
            className={({ isActive }) => (isActive ? 'icon active' : 'icon')}
          >
            {({ isActive }) => (
              <>
                <FontAwesomeIcon icon={isActive ? faHeartSolid : faHeart} />
                {favouritesCount > 0 && (
                  <span className="count" aria-label="favourite count">
                    ({favouritesCount})
                  </span>
                )}
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
