import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box1}></View>
      <View style={styles.box2}></View>
      <View style={styles.box3}></View>
      <View style={styles.box4}></View>
      <View style={styles.box5}></View>
    </View>
  )
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    backgroundColor: 'red',
    height: 250,
  },
  box2: {
    backgroundColor: 'green',
    height: 250,
  },
  box3: {
    backgroundColor: 'blue',
    height: 250,
  },
  box4: {
    backgroundColor: 'orange',
    height: 250,
  },
  box5: {
    backgroundColor: 'purple',
    height: 250,
  },
})