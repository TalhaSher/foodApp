import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "expo-router";
import axios from "axios";
import Loading from "../components/Loading";

const RecipeDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  let item = route.params;

  const getMealData = async (mealId) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const ingrediantsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];

    for (let i = 0; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  useEffect(() => {
    if (meal == null) {
      getMealData(item.idMeal);
    }
  });

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />
      {/* Recipe Image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: hp(53), height: hp(50), borderRadius: 53 }}
        />
      </View>

      {/* Back Button */}
      <View className="w-full absolute flex-row justify-between items-center pt-10 pl-2">
        <TouchableOpacity
          className="p-2 mt-4  rounded-full bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>

        {/* Heart Icon */}
        <TouchableOpacity
          className="p-2 mt-4 mr-2 rounded-full bg-white"
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* Meal Description */}
      {loading ? (
        <Loading size="large" className="flex-1 justify-center mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* Name and Area */}
          <View className="space-y-2">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(3) }}
            >
              {meal.strMeal}
            </Text>
            <Text
              className="font-medium flex-1 text-neutral-500"
              style={{ fontSize: hp(2) }}
            >
              {meal.strArea}
            </Text>
          </View>

          {/* misc */}
          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full justify-center items-center flex"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full justify-center items-center flex"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  3
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full justify-center items-center flex"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Calories
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full justify-center items-center flex"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>

          {/* Ingrediants */}
          <View className="space-y-4">
            <Text style={hp(1.5)} className="font-bold flex-1 text-neutral-700">
              Ingrediants
            </Text>
            <View className="space-y-2 ml-3">
              {ingrediantsIndexes(meal).map((i) => (
                <View key={i} className="flex-row space-x-4 items-center">
                  <View
                    style={{ height: hp(1.5), width: hp(1.5) }}
                    className="bg-amber-300 rounded-full"
                  />
                  <View className="flex-row space-x-2">
                    <Text className="font-extrabold text-neutral-700">
                      {meal["strMeasure" + i]}
                    </Text>
                    <Text className="font-medium text-neutral-600">
                      {meal["strIngredient" + i]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetails;
