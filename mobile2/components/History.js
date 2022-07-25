import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import {useCallback, useEffect, useState} from "react";
import HistoryContent from "./HistoryContent";
import { FlatList } from "react-native";
import axios from "axios";
import {api} from "../api";

let interval

export default function History() {
  const [history, setHistory] = useState([]);

  const fetchAndSaveHistory = useCallback(async () => {
    const response = await api.get('/history').catch(e => e.response)
    if (response.status === 200) {
      setHistory(response.data)
    }
  }, [])

  useEffect(() => {
    fetchAndSaveHistory()
    interval = setInterval(async () => {
      await fetchAndSaveHistory()
    }, 5000)

    return () => clearInterval(interval)
  }, [fetchAndSaveHistory])

  return (
    <View style={styles.container}>
      <Text style={styles.textHistory}>History &#8595;</Text>
      {history.map((item, idx) => {
        return <HistoryContent key={idx} level={item.level} time={item.saved_at} />;
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
