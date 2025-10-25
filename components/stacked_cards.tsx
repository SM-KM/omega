import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function StackedCards() {


  const cards = [
    { id: 1, offset: 0, name: "Sara's Card", title: 'Credit Card', balance: 2002.00, color: '#E8E8E8', lastFour: '8933', company: 'AMERICAN\nEXPRESS', hasContactless: true },
    { id: 2, offset: 20, name: "Santander", title: 'Crypto Card', balance: 1784.20, color: '#E8F48C', lastFour: '8345', company: null, hasContactless: false },
    { id: 3, offset: 40, name: "BBVA Bancomer", title: 'Debit Card', balance: 945.78, color: '#90C8AC', lastFour: '1243', company: null, hasContactless: false, hasStripes: true },
    { id: 4, offset: 60, name: "BBVA", title: 'Internet Card', balance: 802.00, color: '#D8D8E8', lastFour: '8163', company: 'G Pay', hasContactless: false },
    { id: 5, offset: 80, name: "HSBC", title: 'Bonus Card', balance: 250.10, color: '#B4B8E8', lastFour: '7291', company: null, hasContactless: false },
  ];


  return (
    <View style={styles.container}>
      <View style={styles.cardStack}>
        {cards.map((card, index) => (
          <View
            key={card.id}
            style={[
              styles.card,
              {
                top: card.offset,
                zIndex: cards.length - index,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    marginBottom: 100,
    backgroundColor: '#f3f2f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStack: {
    width: 320,
    height: 240,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: 192,
    backgroundColor: '#CECFD1',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
