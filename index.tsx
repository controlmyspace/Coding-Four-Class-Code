import {
  View
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { List } from "@/components/List";
import { useRecipes } from "@/providers/RecipeProvider";

export default function Index() {
  const list = useRecipes();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: "100%"
          }}
        >
          <List items={list} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
