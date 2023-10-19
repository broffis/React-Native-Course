import { createContext, useMemo, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  function addFavorite(id) {
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((item) => item !== id)
    );
  }

  const memoizedValue = useMemo(() => {
    return {
      ids: favoriteMealIds,
      addFavorite,
      removeFavorite,
    };
  }, [favoriteMealIds]);

  //   const value = {
  //     ids: favoriteMealIds,
  //     addFavorite,
  //     removeFavorite,
  //   };

  return (
    <FavoritesContext.Provider value={memoizedValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
