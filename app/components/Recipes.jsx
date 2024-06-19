import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { mealData } from "../../constants/mealData";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

const Recipes = ({ activeCategory, categories, meals }) => {
  const filteredData = mealData.filter(
    (meal) => meal.category === activeCategory
  );

  return (
    <View style={{ marginHorizontal: 16, marginTop: 20 }}>
      <Text
        style={{
          fontSize: hp(3),
          color: "#616161",
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        Recipes
      </Text>

      {categories.length == 0 || meals.length == 0 ? null : (
        <FlatList
          data={meals}
          numColumns={2}
          renderItem={({ item, index }) => (
            <RecipeCard item={item} index={index} />
          )}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      )}
    </View>
  );
};

const RecipeCard = ({ item, index }) => {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      style={{
        flex: 1,
      }}
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(20)}
    >
      <Pressable
        style={{ paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600 text-center"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Recipes;
