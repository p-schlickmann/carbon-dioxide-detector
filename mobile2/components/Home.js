import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import {useCallback, useEffect, useState} from "react";
import { ScrollView } from "react-native";
import History from "./History";
import ScrollToTopButton from "./ScrollToTopButton";
import {api} from "../api";
import {useMonoxide} from "../hooks";

let interval

export default function Home() {
  const [monoxideLevel, setMonoxideLevel] = useState(0);
  const [status, setStatus] = useState('')
  const [pos, setPos] = React.useState(0);
  const ref = React.useRef();

  const [backgroundColor, circleColor, statusMessage] = useMonoxide(status)

  const scrollToTop = () => {
    ref.current.scrollTo({ y: 0, animated: true });
  };

  const setCarbonMonoxideLevels = useCallback(async () => {
    const response = await api.get('/').catch(e => e.response)
    if (response.status === 200) {
      setMonoxideLevel(response.data.monoxide_level)
      setStatus(response.data.status)
    }
  }, [])

  useEffect(() => {
    setCarbonMonoxideLevels()
    interval = setInterval(async () => {
      await setCarbonMonoxideLevels()
    }, 5000)

    return () => clearInterval(interval)
  }, [setCarbonMonoxideLevels])

  console.log('oi')

  return (
    <View>
      <ScrollView
        ref={ref}
        onScroll={(e) => setPos(e.nativeEvent.contentOffset.y)}
      >
        {status ? <View style={[styles.container, { backgroundColor: backgroundColor }]}>
          <Text style={styles.title}>Monoxide Detector</Text>
          <View style={[styles.circle, { borderColor: circleColor }]} />
          <Text style={styles.textCenter}>{monoxideLevel}</Text>
          <Text style={styles.textStatus}>{statusMessage}</Text>
          <History />
        </View> : <></> }

      </ScrollView>
      <ScrollToTopButton scrollToTop={scrollToTop} position={pos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  circle: {
    height: 300,
    width: 300,
    borderRadius: 1000,
    borderWidth: 20,
    marginTop: 80,
  },
  textCenter: {
    color: "black",
    position: "absolute",
    top: 320,
    paddingBottom: 20,
    fontWeight: "bold",
    fontSize: 40,
  },
  textStatus: {
    color: "black",
    position: "absolute",
    top: 320,
    paddingTop: 50,
    fontWeight: "bold",
    fontSize: 25,
  },
  title: {
    marginTop: 80,
    fontWeight: "bold",
    fontSize: 35,
  },
});
