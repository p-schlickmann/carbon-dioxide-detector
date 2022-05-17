import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import HistoryContent from "./HistoryContent";
import { FlatList } from "react-native";

export default function History() {
  const [history, setHistory] = useState([
    {
      id: 1,
      level: 988,
      time: "today",
    },
    {
      id: 2,
      level: 1240,
      time: "today",
    },
    {
      id: 3,
      level: 2540,
      time: "today",
    },
    {
      id: 4,
      level: 988,
      time: "today",
    },
    {
      id: 5,
      level: 1240,
      time: "today",
    },
    {
      id: 6,
      level: 2540,
      time: "today",
    },
    {
      id: 7,
      level: 988,
      time: "today",
    },
    {
      id: 8,
      level: 1240,
      time: "today",
    },
    {
      id: 9,
      level: 2540,
      time: "today",
    },
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.textHistory}>History &#8595;</Text>
      {history.map((item) => {
        return <HistoryContent level={item.level} time={item.time} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 200,
    marginBottom: 80,
  },
  textHistory: {
    fontWeight: "bold",
    fontSize: 40,
  },
});
