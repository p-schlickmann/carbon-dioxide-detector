import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import History from "./History";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Home() {
  const [monoxideLevel, setMonoxideLevel] = useState(950);
  const [circleColor, setCircleColor] = useState("#118a7e");
  const [backgroundColor, setBackgroundColor] = useState("#3baea0");
  const [statusMessage, setStatusMessage] = useState("Ok");
  const [pos, setPos] = React.useState(0);
  const ref = React.useRef();

  const scrollToTop = () => {
    ref.current.scrollTo({ y: 0, animated: true });
  };

  useEffect(() => {
    if (monoxideLevel < 1000) {
      setCircleColor("#118a7e");
      setBackgroundColor("#3baea0");
      setStatusMessage("Ok");
    } else if (monoxideLevel < 2000 && monoxideLevel >= 1000) {
      setCircleColor("#eb5033");
      setBackgroundColor("#ff9d00");
      setStatusMessage("Alert");
    } else {
      setCircleColor("#8a0f0f");
      setBackgroundColor("#c22828");
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
