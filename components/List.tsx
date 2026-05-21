import { FlatList, View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export function List({items}){
	return (
		<FlatList
      data={items}
      renderItem={({item}) => <Item title={item.name} />}
    />
	);
}

function Item({title}){
	const styles = StyleSheet.create({
    item: {
      padding: 10,
      width: "100%",
      borderColor: "#aaaaaa",
      borderWidth: 1,
      backgroundColor: "white"
    },
    title: {
      fontSize: 20,
      width: "100%"
    },
  });

	return (
    <View style={styles.item}>
      <Link href={`/recipes/${title}`}>
        <Text style={styles.title}>{title}</Text>
      </Link>
    </View>
  );
}
