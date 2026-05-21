import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import { useRecipesDispatch } from "@/providers/RecipeProvider";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync } from "expo-image-picker";
import { Image } from "expo-image";

export default function RecipeForm() {
	const router = useRouter();
  const closeModal = () => {
    router.back();
  };

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);

	const navigation = useNavigation();
	navigation.setOptions({
		title: "New Recipe",
    headerLeft: () => <Button onPress={closeModal} title="Close" />,
    headerRight: () => <Button onPress={addNewRecipe} title="Add" />
  });

  const pickImage = async () => {
  	const permissionResult = await requestMediaLibraryPermissionsAsync();

  	if(!permissionResult.granted){
  		Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
  	}

  	let result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      exif: true,
      quality: 1
    });

    console.log(result);

    if(result.canceled){
    	console.log("User did not choose an image");
    	return;
    }

    setImage(result.assets[0].uri);
  };

	const dispatch = useRecipesDispatch();
  const addNewRecipe = () => {
    dispatch({
      type: "add",
      data: {
        name: name,
        description: description,
        image: image
      }
    });
    closeModal();
  };

	return (
		<View style={styles.container}>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Name</Text>
				<TextInput
					style={styles.input}
					placeholder="Insert name..."
					value={name}
					onChangeText={setName}
				/>
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Description</Text>
				<TextInput
					style={styles.input}
					placeholder="Insert description..."
					value={description}
					onChangeText={setDescription}
				/>
			</View>

			<View>
				<Text style={styles.label}>Image</Text>
				<Button
					title={"Choose an image"}
					onPress={pickImage}
				/>
				{ image &&
					<Image
						source={{uri: image}}
						style={styles.image}
					/>
				}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 20
  },
  input: {
    fontSize: 15,
    paddingVertical: 5
  },
  image: {
  	resizeMode: "cover",
		aspectRatio: 16/9
  }
});