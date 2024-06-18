import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Welcome = () => {
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* Logo Name With Rings */}
      <View className="bg-white/20 rounded-full " style={{ padding: hp(5.5) }}>
        <View className="bg-white/20 rounded-full " style={{ padding: hp(5) }}>
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </View>
      </View>

      {/* title  */}
      <View className="flex items-center space-y-2">
        <Text className="font-bold text-white tracking-widest text-6xl">
          Foody
        </Text>
        <Text className="font-medium text-white tracking-widest text-lg">
          Food is always right
        </Text>
      </View>
    </View>
  );
};

export default Welcome;
