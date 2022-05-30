import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";

export default function ScrollToTopButton({ position, scrollToTop }) {
  const [isEnabled, setIsEnabled] = useState(true);
  useEffect(() => {
    position >= 256 ? setIsEnabled(true) : setIsEnabled(false);
  }, [position]);
  return (
    <View style={styles.container}>
      {isEnabled && (
        <Pressable style={styles.button} onPress={scrollToTop}>
          <Text style={styles.arrow}>&#8593;</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  button: {
    backgroundColor: "rgba(200, 200, 200, 0.8)",
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 80,
  },
  arrow: {
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: "bold",
    fontSize: 30,
  },
});
