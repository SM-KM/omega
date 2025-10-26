import { StyleSheet, Text, View } from "react-native";

export default function Item({
  title,
  amount,
  gone,
  card,
  name
}: {
  title: string;
  amount: number;
  gone: boolean;
  card: string;
  name: string
}) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.card}>{card} {name}</Text>
      </View>

      {/* signo y color según gone */}
      <Text style={[styles.amount, gone ? styles.amount_gone : styles.amount_in]}>
        {gone ? "-" : "+"}${amount.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    fontSize: 13,
    color: "#6B7280",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
  },
  amount_gone: {
    color: "red", // 🔴 gastos
  },
  amount_in: {
    color: "green", // 🟢 ingresos
  },
});
