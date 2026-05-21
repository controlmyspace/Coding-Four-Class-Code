import { Tabs } from "expo-router";
import { Button } from "react-native";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  const addNewRecipe = () => {
    router.navigate("/modal");
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recipes',
          headerRight: () => <Button title="New" onPress={addNewRecipe} />
        }}
      />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
    </Tabs>
  );
}
