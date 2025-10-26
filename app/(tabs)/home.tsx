import Item from '@/components/transaction';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_HEIGHT = 240;
const CARD_WIDTH = SCREEN_WIDTH * 0.85;
const SPACING = 0;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    concept: 'Starbucks coffee',
    card: '****5472',
    amount: 459.2,
    gone: true,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    concept: 'Shein',
    card: '****8737',
    amount: 1328.2,
    gone: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    concept: 'Groceries',
    amount: 328.45,
    card: '****9983',
    gone: true,
  },
];

const cards = [
  { id: 1, name: "Sara's Card", title: 'Credit Card', gone: 569.4, balance: 2002.0, color: '#31cb79ff', lastFour: '8933', company: 'AMERICAN\nEXPRESS', hasContactless: true },
  { id: 2, name: 'Santander', title: 'Crypto Card', gone: 2984.3, balance: 1784.2, color: '#e83f2cff', lastFour: '8345', company: null, hasContactless: false },
  { id: 3, name: 'BBVA Bancomer', title: 'Debit Card', gone: 0, balance: 945.78, color: '#4250ceff', lastFour: '1243', company: null, hasContactless: false, hasStripes: true },
  { id: 4, name: 'BBVA', title: 'Internet Card', gone: 2038.3, balance: 802.0, color: '#4250ceff', lastFour: '8163', company: 'G Pay', hasContactless: false },
  { id: 5, name: 'HSBC', title: 'Bonus Card', gone: 394.3, balance: 250.1, color: '#e83f2cff', lastFour: '7291', company: null, hasContactless: false },
  { id: 6, name: '', title: 'Internet Card', gone: 15420.3, balance: 16410.55, color: '#C8A8D8', lastFour: '8187', company: null, hasContactless: false },
  { id: 7, name: '', title: 'Card', gone: 983.4, balance: 16544.77, color: '#E8A8C8', lastFour: '1234', company: null, hasContactless: false },
  { id: 8, name: '', title: 'Credit Card', gone: 345.3, balance: 2002.0, color: '#31cb79ff', lastFour: '8933', company: 'AMERICAN\nEXPRESS', hasContactless: true },
  { id: 9, name: '', title: 'Crypto Card', gone: 3453.3, balance: 1784.2, color: '#E8F48C', lastFour: '8345', company: null, hasContactless: false },
  { id: 10, name: '', title: 'Debit Card', gone: 0, balance: 945.78, color: '#90C8AC', lastFour: '1243', company: null, hasContactless: false, hasStripes: true },
  { id: 11, name: '', title: 'Internet Card', gone: 342.3, balance: 802.0, color: '#D8D8E8', lastFour: '8163', company: 'G Pay', hasContactless: false },
  { id: 12, name: '', title: 'Bonus Card', gone: 3452, balance: 250.1, color: '#B4B8E8', lastFour: '7291', company: null, hasContactless: false },
  { id: 13, name: '', title: 'Internet Card', gone: 349.2, balance: 16410.55, color: '#C8A8D8', lastFour: '8187', company: null, hasContactless: false },
  { id: 14, name: '', title: 'Card', gone: 232.34, balance: 16544.77, color: '#E8A8C8', lastFour: '1234', company: null, hasContactless: false },
];

export default function CardCarousel() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / (CARD_HEIGHT + SPACING));
    setFocusedIndex(index);
  };

  const openDrawer = (card: any) => {
    setSelectedCard(card);
    setIsDrawerVisible(true);
    Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, damping: 20 }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, { toValue: SCREEN_HEIGHT, duration: 300, useNativeDriver: true }).start(() => {
      setIsDrawerVisible(false);
      setSelectedCard(null);
    });
  };

  return (
    <View style={styles.container}>
      {/* Botón Add Card fijo (no hace acción) */}
      <TouchableOpacity style={styles.addCardBtn} activeOpacity={0.8} onPress={() => {}}>
        <Text style={styles.addCardText}>Add Card</Text>
      </TouchableOpacity>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        snapToInterval={CARD_HEIGHT + 10}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ justifyContent: 'center', width: '100%', height: 120 }}>
          <Text
            style={{
              top: 0,
              position: 'absolute',
              color: '#8D04AC',
              fontSize: 50,
              height: 120,
              lineHeight: 40,
              fontWeight: '800',
            }}
          >
            {'\n'}
            <Text>Your cards</Text>
          </Text>
        </View>

        {cards.map((card, index) => {
          const inputRange = [
            (index - 1) * (CARD_HEIGHT + SPACING),
            index * (CARD_HEIGHT + SPACING),
            (index + 1) * (CARD_HEIGHT + SPACING),
          ];

          const scale = scrollY.interpolate({ inputRange, outputRange: [0.85, 1, 0.88] });
          const opacity = scrollY.interpolate({ inputRange, outputRange: [0.7, 1, 0.7] });
          const translateY = scrollY.interpolate({ inputRange, outputRange: [-20, 0, 20] });

          const isFocused = focusedIndex === index;
          return (
            <TouchableOpacity key={card.id} activeOpacity={0.9} onPress={() => openDrawer(card)}>
              <Animated.View
                style={[
                  styles.card,
                  {
                    backgroundColor: card.color,
                    transform: [{ scale }, { translateY }],
                    opacity,
                    zIndex: isFocused ? 999 : index,
                    elevation: isFocused ? 16 : 8,
                  },
                ]}
              >
                {/* Card Header */}
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardTitle}>{card.name}</Text>
                  <View style={styles.chip} />
                </View>

                {/* Decorative Stripes for Debit Card */}
                {card.hasStripes && (
                  <View style={styles.decorativeLines}>
                    <View style={[styles.line, { width: 100 }]} />
                    <View style={[styles.line, { width: 80 }]} />
                    <View style={[styles.line, { width: 60 }]} />
                  </View>
                )}

                {/* Company Logo */}
                {card.company && (
                  <View style={styles.companyContainer}>
                    <Text style={styles.companyText}>{card.company}</Text>
                  </View>
                )}

                {/* Balance */}
                <View style={styles.balanceContainer}>
                  <Text style={styles.balanceSymbol}>$</Text>
                  <Text style={styles.balanceAmount}>{Math.floor(card.balance).toLocaleString()}</Text>
                  <Text style={styles.balanceCents}>.{(card.balance % 1).toFixed(2).split('.')[1]}</Text>
                </View>

                {/* Card Number */}
                <View style={styles.cardFooter}>
                  <Text style={styles.cardNumber}>{index === 0 ? '6358' : '2221'} .... .... {card.lastFour}</Text>
                  {card.hasContactless && (
                    <View style={styles.contactless}>
                      <Text style={styles.contactlessIcon}>))))</Text>
                    </View>
                  )}
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>

      {/* Bottom Drawer */}
      <Modal visible={isDrawerVisible} transparent animationType="none" onRequestClose={closeDrawer}>
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.drawer, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.handle} />

                {selectedCard && (
                  <>
                    <Text style={styles.drawerTitle}>{selectedCard.name || selectedCard.title}</Text>
                    <Text style={styles.drawerSubtitle}>{selectedCard.title}</Text>

                    <View style={styles.drawerBalance}>
                      <Text style={styles.drawerBalanceLabel}>Current Balance</Text>
                      <Text style={styles.drawerBalanceAmount}>${selectedCard.balance.toFixed(2)}</Text>
                      <Text style={{ color: 'red', fontSize: 14, fontWeight: '600' }}>
                        -${selectedCard.gone.toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.drawerCardNumber}>
                      <Text style={styles.drawerLabel}>Card Number</Text>
                      <Text style={styles.drawerValue}>•••• •••• •••• {selectedCard.lastFour}</Text>
                    </View>

                    <Text style={{ fontSize: 18, marginTop: 20 }}>Latest transactions</Text>
                    <FlatList
                      data={DATA}
                      renderItem={({ item }) => (
                        <Item title={item.concept} amount={item.amount} gone={item.gone} card={item.card} />
                      )}
                      keyExtractor={(item) => item.id}
                    />
                  </>
                )}

                <TouchableOpacity style={styles.closeButton} onPress={closeDrawer}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Botón "Add Card" fijo
  addCardBtn: {
    position: 'absolute',
    top: 50, // ajusta si usas SafeArea/StatusBar
    left: 20,
    zIndex: 20,
    backgroundColor: 'rgba(141, 4, 172, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  addCardText: {
    color: '#8D04AC',
    fontWeight: '700',
    fontSize: 16,
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scrollContent: {
    paddingVertical: CARD_HEIGHT / 2,
    paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    marginBottom: SPACING,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chip: {
    width: 50,
    height: 40,
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    opacity: 0.6,
  },
  decorativeLines: {
    position: 'absolute',
    top: 60,
    right: 40,
    gap: 8,
  },
  line: {
    height: 4,
    backgroundColor: '#2D5F4C',
    opacity: 0.4,
    marginBottom: 8,
  },
  companyContainer: {
    position: 'absolute',
    top: '25%',
    right: '90%',
  },
  companyText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#333',
    textAlign: 'right',
    lineHeight: 13,
    letterSpacing: 0.5,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  balanceSymbol: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginTop: 12,
    marginRight: 4,
  },
  balanceAmount: {
    fontSize: 64,
    fontWeight: '700',
    color: '#333',
    letterSpacing: -2,
  },
  balanceCents: {
    fontSize: 28,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
    marginLeft: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
    letterSpacing: 1.5,
  },
  contactless: { opacity: 0.6 },
  contactlessIcon: { fontSize: 24, color: '#333', transform: [{ rotate: '90deg' }] },

  // Drawer Styles
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  drawer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    minHeight: 400,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  drawerTitle: { fontSize: 28, fontWeight: '700', marginBottom: 4, color: '#111827' },
  drawerSubtitle: { fontSize: 16, color: '#6b7280', marginBottom: 24 },
  drawerBalance: { backgroundColor: '#F5F5F5', padding: 20, borderRadius: 12, marginBottom: 20 },
  drawerBalanceLabel: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  drawerBalanceAmount: { fontSize: 36, fontWeight: '700', color: '#111827' },
  drawerCardNumber: { marginBottom: 24 },
  drawerLabel: { fontSize: 14, color: '#6b7280', marginBottom: 6 },
  drawerValue: { fontSize: 18, fontWeight: '600', color: '#111827' },
  drawerActions: { gap: 12, marginBottom: 20 },
  actionButton: { backgroundColor: '#3b82f6', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  actionButtonSecondary: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#e5e7eb' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  actionButtonTextSecondary: { color: '#374151' },
  closeButton: { backgroundColor: '#ef4444', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
