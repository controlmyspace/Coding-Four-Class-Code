import { useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { Image } from "expo-image";
import Animated, { useSharedValue, withSpring, withDelay } from "react-native-reanimated";

export default function RecipeView({ recipe }) {
	const opacity = useSharedValue(0);

	useEffect(() => {
		opacity.value = withDelay(
			500,
			withSpring(1, {
				duration: 2000
			})
		);
	});

	return (
		<ScrollView>
			<Animated.View
				style={{
					opacity: opacity
				}}
			>
				<Image
					style={{
						resizeMode: "cover",
						aspectRatio: 16/9
					}}
					source={recipe.image ?
						{ uri: recipe.image} :
						require("@/assets/images/placeholder-400x300.png")
					}
				/>
			</Animated.View>

			<View style={{
				padding: 25
			}}>
				<Text>{recipe.description}</Text>

				<View style={{
					paddingTop: 20
				}}>
					<Text style={{
						fontWeight: "bold",
						fontSize: 20
					}}>Ingredients</Text>
					{
						recipe.ingredients && recipe.ingredients.map((ingredient, i) => {
							return <Text
								style={{
									paddingBottom: 5,
									paddingTop: 5
								}}
								key={i}
							>{ingredient}</Text>
						})
					}
				</View>

				<View style={{
					paddingTop: 20
				}}>
					<Text style={{
						fontWeight: "bold",
						fontSize: 20
					}}>Instructions</Text>
					{
						recipe.instructions && recipe.instructions.map((instruction, i) => {
							return (
								<View
									style={{
										paddingBottom: 5,
										paddingTop: 5
									}}
									key={i}
								>
									<Text style={{fontWeight: "bold"}}>Step {i+1}</Text>
									<Text>{instruction}</Text>
								</View>
							)
						})
					}
				</View>
			</View>
		</ScrollView>
	);
}
