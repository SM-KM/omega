import { View, Text, StyleSheet } from "react-native";

export default function Item({ title, amount, gone, card }:
  {
    title: string, amount: number,
    gone: boolean, card: string
  }) {
  return (<View>
    <View style={styles.item}>
      <View>
        <Text style={{ fontSize: 16 }}>{title}</Text>
        <Text>{card}</Text>
      </View>
      <Text style={gone ? styles.amount_gone : styles.amount_in}> {gone ? "-" : "+"}
        {amount}</Text>
    </View >
  </View>);
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amount_gone: {
    color: "red",
    fontSize: 16
  },

  amount_in: {
    color: "green",
    fontSize: 16
  },


})
