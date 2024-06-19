import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

const Categories = ({ activeCategory, handleChangeCategory, categories }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category, index) => {
          let isActive = activeCategory == category.strCategory;
          let activeClassButton = isActive ? " bg-amber-400" : " bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
              onPress={() => handleChangeCategory(category.strCategory)}
            >
              <View className={"p-[6px] rounded-full" + activeClassButton}>
                <Image
                  className="rounded-full"
                  source={{ uri: category.strCategoryThumb }}
                  style={{ height: hp(6), width: hp(6) }}
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
