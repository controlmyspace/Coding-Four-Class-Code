import { Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router";
import { useRecipes } from "@/providers/RecipeProvider";
import RecipeView from "@/components/Recipe";

export default function Recipe(){
	const params = useLocalSearchParams();
	const recipes = useRecipes();
	const data = recipes.find((item) => {
		return item.name === params.recipe;
	});

	return <RecipeView recipe={data} />;
}