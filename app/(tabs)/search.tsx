import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { List } from "@/components/List";
import { useState } from "react";
import { useRecipes } from "@/providers/RecipeProvider";

export default function Search(){
  const list = useRecipes();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredList = searchTerm === "" ? [] : list.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const styles = StyleSheet.create({
    textInput: {
      paddingHorizontal: 20,
      paddingVertical: 10
    },
    view: {
      display: "flex",
      height: "100%"
    },
    list: {
      height: "90%"
    }
  });

	return (
		<View style={styles.view}>
      <List items={filteredList} style={styles.list}/>
			<TextInput
        placeholder="Search recipe..."
        style={styles.textInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" />
		</View>
	);
}
