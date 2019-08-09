import React from "react";
import { SafeAreaView, Image, StyleSheet } from "react-native";

import logo from "../assets/logo.png";

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} />
    </SafeAreaView>
  );
}

const styles = {
  container: {}
};
