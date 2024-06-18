import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const Welcome = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => (ring1padding.value = ring1padding.value + hp(5)), 100);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* Logo Name With Rings */}
      <Animated.View
        className="bg-white/20 rounded-full "
        style={{ padding: ring1padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full "
          style={{ padding: ring2padding }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title  */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest "
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-medium text-white tracking-widest "
          style={{ fontSize: hp(2) }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
};

export default Welcome;
