import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";

export default function HistoryContent({ level, time }) {
  const [colorStatus, setColorStatus] = useState("#10F500");
  const [statusMessage, setStatusMessage] = useState("Ok");
  useEffect(() => {
    if (level < 80) {
      setColorStatus("#10F500");
      setStatusMessage("Ok");
    } else if (level < 400 && level >= 80) {
      setColorStatus("#F5E600");
      setStatusMessage("Alert");
    } else {
      setColorStatus("#F51701");
      setStatusMessage("Dangerous");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Level:</Text> {level}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Time:</Text> {time}
        </Text>
      </View>
      <View style={styles.statusMessage}>
        <Text style={{ fontWeight: "bold" }}>{statusMessage}</Text>
        <View style={[styles.circle, { backgroundColor: colorStatus }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 5,
    width: "90%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 10,
  },
  statusMessage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 120,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
});
