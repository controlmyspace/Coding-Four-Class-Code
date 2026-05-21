import { createContext, useReducer, useContext, useEffect } from "react";
import { File, Paths } from 'expo-file-system';

const initialRecipes = [
  {
    name: "Pancakes",
    description: "This easy American pancake recipe makes really light and fluffy pancakes that are great for making a special weekend brunch from scratch. Try adding a large handful of fresh blueberries to the batter before cooking.",
    image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/fluffyamericanpancak_74828_16x9.jpg",
    ingredients: [
      "135g/4¾oz plain flour",
      "1 tsp baking powder",
      "½ tsp salt",
      "2 tbsp caster sugar",
      "130ml/4½fl oz milk",
      "1 large egg, lightly beaten",
      "2 tbsp melted butter (allowed to cool slightly), plus extra for cooking"
    ],
    instructions: [
      "Sift the flour, baking powder, salt and caster sugar into a large bowl. In a separate bowl or jug, lightly whisk together the milk and egg, then whisk in the melted butter.",
      "Pour the milk mixture into the flour mixture and, using a fork, beat until you have a smooth batter. Any lumps will soon disappear with a little mixing. Let the batter stand for a few minutes.",
      "Heat a non-stick frying pan over a medium heat and add a knob of butter. When it's melted, add a ladle of batter (or two if your frying pan is big enough to cook two pancakes at the same time). It will seem very thick but this is how it should be.",
      "Wait for about 3 minutes until the top of the pancake begins to bubble, and the edges begin to set. Flip it over and cook for another two minutes until both sides are golden brown and the pancake has risen to about 1cm/½in thick. If the pancake is too dark, reduce the heat slightly for the next round.",
      "Repeat until all the batter is used up. You can keep the pancakes warm in a low oven, but they taste best fresh out the pan.",
      "Serve with lashings of real maple syrup and extra butter, if you like."
    ]
  },
  {
    name: "French Toast",
		description: "This recipe shows you how to make French toast with a classic recipe topped with yoghurt and fresh berries, but you can mix it up with whatever you fancy. It’s totally versatile, so make it yours."
  },
  {
    name: "Cookies",
    description: ""
  }
];

const file = new File(Paths.document, 'data.json');
if (!file.exists) {
	// Create the file if it does not already exist
	file.create();
}
const fileContents = file.textSync();
if (!fileContents) {
	// Fill the file with initial recipes
	file.write(JSON.stringify(initialRecipes));
}
// file.delete()

const recipesFromFile = JSON.parse(file.textSync());

const RecipesContext = createContext(null);
const RecipesDispatchContext = createContext(null);

export function useRecipes(){
  return useContext(RecipesContext);
}

export function useRecipesDispatch(){
  return useContext(RecipesDispatchContext);
}

const recipesReducer = (recipes, action) => {
  if(action.type === "add"){
    // Add new recipe
		const newRecipes = [
			...recipes,
			action.data
		];
    // Write new recipe to file
		file.write(JSON.stringify(newRecipes));

    return newRecipes;
  }else if(action.type === "edit"){
    // Edit recipe
  }else if(action.type === "delete"){
    // Delete recipe
	} else if (action.type === "initialize") {
		return action.data;
  }
};

export function RecipesProvider({children}){
  const [recipes, dispatch] = useReducer(
    recipesReducer,
    recipesFromFile
	);

  // Server request implementation
	// const getServerRecipes = async () => {
	// 	const res = await fetch("http://localhost:3000/recipes");
	// 	const data = await res.json();
	// 	dispatch({
	// 		type: "initialize",
	// 		data
	// 	});
	// };

	// useEffect(() => {
	// 	getServerRecipes();
	// });

  return (
    <RecipesContext value={recipes}>
      <RecipesDispatchContext value={dispatch}>
        {children}
      </RecipesDispatchContext>
    </RecipesContext>
  );
}

