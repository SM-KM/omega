import StackedCards from "@/components/stacked_cards";
import Item from "@/components/transaction";
import { View, Text, StyleSheet, FlatList } from "react-native";


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    concept: "Starbucks coffee",
    card: "****5472",
    amount: 459.2,
    gone: true,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    concept: "Shein",
    card: "****8737",
    amount: 1328.2,
    gone: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    concept: "Groceries",
    amount: 328.45,
    card: "****9983",
    gone: true,
  },
  {
    id: 'a1234abc-4e56-7f89-0123-456789abcdef',
    title: 'Fourth Item',
    concept: "Netflix Subscription",
    card: "****2319",
    amount: 199.99,
    gone: true,
  },
  {
    id: 'b2345bcd-5f67-8g90-1234-567890bcdefa',
    title: 'Fifth Item',
    concept: "Uber Ride",
    card: "****8763",
    amount: 82.5,
    gone: true,
  },
  {
    id: 'c3456cde-6g78-9h01-2345-678901cdefab',
    title: 'Sixth Item',
    concept: "Amazon Purchase",
    card: "****5520",
    amount: 742.35,
    gone: false,
  },
  {
    id: 'd4567def-7h89-0i12-3456-789012defabc',
    title: 'Seventh Item',
    concept: "Spotify Premium",
    card: "****1112",
    amount: 149.0,
    gone: true,
  },
  {
    id: 'e5678ef0-8i90-1j23-4567-890123efabcd',
    title: 'Eighth Item',
    concept: "Gas Station",
    card: "****9438",
    amount: 635.8,
    gone: false,
  },
  {
    id: 'f6789f01-9j01-2k34-5678-901234fabced',
    title: 'Ninth Item',
    concept: "Apple Store",
    card: "****0045",
    amount: 21500.0,
    gone: false,
  },
  {
    id: 'g7890g12-0k12-3l45-6789-012345gbcdef',
    title: 'Tenth Item',
    concept: "Cinema Tickets",
    card: "****2901",
    amount: 290.75,
    gone: true,
  },
  {
    id: 'h8901h23-1l23-4m56-7890-123456hcdefg',
    title: 'Eleventh Item',
    concept: "Steam Purchase",
    card: "****5643",
    amount: 320.0,
    gone: true,
  },
  {
    id: 'i9012i34-2m34-5n67-8901-234567idefgh',
    title: 'Twelfth Item',
    concept: "Restaurant Bill",
    card: "****8471",
    amount: 1278.6,
    gone: false,
  },
  {
    id: 'j0123j45-3n45-6o78-9012-345678jefghi',
    title: 'Thirteenth Item',
    concept: "Gym Membership",
    card: "****2013",
    amount: 850.0,
    gone: true,
  },
  {
    id: 'k1234k56-4o56-7p89-0123-456789kfghij',
    title: 'Fourteenth Item',
    concept: "Electricity Bill",
    card: "****4720",
    amount: 912.45,
    gone: true,
  },
  {
    id: 'l2345l67-5p67-8q90-1234-567890lgijkl',
    title: 'Fifteenth Item',
    concept: "Water Service",
    card: "****6638",
    amount: 523.15,
    gone: true,
  },
  {
    id: 'm3456m78-6q78-9r01-2345-678901mhjklm',
    title: 'Sixteenth Item',
    concept: "iTunes Purchase",
    card: "****7290",
    amount: 59.9,
    gone: false,
  },
  {
    id: 'n4567n89-7r89-0s12-3456-789012nijklm',
    title: 'Seventeenth Item',
    concept: "Airbnb Booking",
    card: "****1457",
    amount: 5200.0,
    gone: false,
  },
  {
    id: 'o5678o90-8s90-1t23-4567-890123oklmno',
    title: 'Eighteenth Item',
    concept: "Bookstore Purchase",
    card: "****3125",
    amount: 234.75,
    gone: true,
  },
  {
    id: 'p6789p01-9t01-2u34-5678-901234plmnop',
    title: 'Nineteenth Item',
    concept: "Clothing Store",
    card: "****5028",
    amount: 1887.4,
    gone: false,
  },
  {
    id: 'q7890q12-0u12-3v45-6789-012345qmopqr',
    title: 'Twentieth Item',
    concept: "Taxi Ride",
    card: "****7642",
    amount: 140.0,
    gone: true,
  },
  {
    id: 'r8901r23-1v23-4w56-7890-123456rnopqr',
    title: 'Twenty-first Item',
    concept: "Flight Ticket",
    card: "****8881",
    amount: 9500.75,
    gone: false,
  },
  {
    id: 's9012s34-2w34-5x67-8901-234567sopqrs',
    title: 'Twenty-second Item',
    concept: "Hotel Stay",
    card: "****1203",
    amount: 7200.0,
    gone: true,
  },
  {
    id: 't0123t45-3x45-6y78-9012-345678tpqrst',
    title: 'Twenty-third Item',
    concept: "Car Insurance",
    card: "****9320",
    amount: 4100.6,
    gone: true,
  },
];

export default function Main() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.main_card}></View> */}
      {/* <StackedCards /> */}
      <View style={styles.balance}>
        <Text style={styles.text_balance}>$26,887.29</Text>
        <Text style={{ fontSize: 20, color: "red" }}>-$5467.2</Text>
      </View>

      <Text style={{ fontSize: 18, marginTop: 40 }}>Latest transactions</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.concept}
          amount={item.amount} gone={item.gone} card={item.card} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "15%",
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },


  balance: {
    width: "100%",
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },

  text_balance: {
    color: "#000",
    fontSize: 60,
    fontWeight: 800,
    lineHeight: 85,
  },

  main_card: {
    width: "100%",
    borderRadius: 20,
    height: 200,
    marginBottom: 0,
    opacity: 0.1,
    backgroundColor: "#4e4e4e",
  },
});
