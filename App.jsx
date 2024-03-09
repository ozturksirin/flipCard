import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function App() {
  const rotate = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 500 }),
        },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 500 }),
        },
      ],
    };
  });

  const handleFlip = () => {
    rotate.value = rotate.value ? 0 : 1;
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleFlip()}
        style={[styles.cardFrontBody, styles.card]}>
        <Animated.View
          style={[styles.cardFrontBody, styles.card, frontAnimatedStyle]}>
          <Text style={styles.text}>Front</Text>
        </Animated.View>
        <Animated.View
          style={[styles.cardBackBody, styles.card, backAnimatedStyle]}>
          <Text style={styles.text}>Back</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const wWidth = Dimensions.get("window").width;
const wHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  cardFrontBody: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#64676e",
    width: wWidth * 0.8,
    height: wHeight * 0.6,
    borderRadius: 10,
  },
  cardArea: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  cardBackBody: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#64676e",
    width: wWidth * 0.8,
    height: wHeight * 0.5,
    borderRadius: 10,
  },
});
