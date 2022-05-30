import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import History from "./History";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Home() {
  const [monoxideLevel, setMonoxideLevel] = useState(400);
  const [circleColor, setCircleColor] = useState("#10F500");
  const [backgroundColor, setBackgroundColor] = useState("#BFFAC1");
  const [statusMessage, setStatusMessage] = useState("Ok");
  const [pos, setPos] = React.useState(0);
  const ref = React.useRef();

  const scrollToTop = () => {
    ref.current.scrollTo({ y: 0, animated: true });
  };

  useEffect(() => {
    if (monoxideLevel < 80) {
      setCircleColor("#10F500");
      setBackgroundColor("#BFFAC1");
      setStatusMessage("Ok");
    } else if (monoxideLevel < 400 && monoxideLevel >= 80) {
      setCircleColor("#F5E600");
      setBackgroundColor("#FAEE9B");
      setStatusMessage("Alert");
    } else {
      setCircleColor("#F51701");
      setBackgroundColor("#FAB2AC");
      setStatusMessage("Dangerous");
    }
  }, [monoxideLevel]);

  return (
    <View>
      <ScrollView
        ref={ref}
        onScroll={(e) => setPos(e.nativeEvent.contentOffset.y)}
      >
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
          <Text style={styles.title}>Monoxide Detector</Text>
          <View style={[styles.circle, { borderColor: circleColor }]} />
          <Text style={styles.textCenter}>{monoxideLevel}</Text>
          <Text style={styles.textStatus}>{statusMessage}</Text>
          <History />
        </View>
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
