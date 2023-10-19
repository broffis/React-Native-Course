import { CATEGORIES, MEALS } from "../data/dummy-data";
import { useEffect, useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({ navigation, route }) {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  // useEffect(() => {
  //   const categoryTitle = CATEGORIES.find((cat) => cat.id === catId).title;
  //   navigation.setOptions({ title: categoryTitle });
  // }, [catId, navigation]);

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((cat) => cat.id === catId).title;
    navigation.setOptions({ title: categoryTitle });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
