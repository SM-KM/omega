
// App.js
import React, { useState, useEffect } from 'react';
import { View, Button, ActivityIndicator, Text, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

export default function App() {
  const [linkToken, setLinkToken] = useState(null);
  const [showPlaid, setShowPlaid] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // 1️⃣ Request link token from backend
    axios
      .post('http://10.22.143.112:3000/create_link_token') // <- replace with your local IP
      .then((res) => setLinkToken(res.data.link_token))
      .catch(console.error);
  }, []);


  // 2️⃣ Capture public token from Plaid WebView
  const handleNavigation = async (navState: any) => {
    const url = navState.url;
    if (url.includes('public_token=')) {
      const public_token = url.split('public_token=')[1].split('&')[0];

      // 3️⃣ Exchange public token for access token
      await axios.post('http://10.22.143.112:3000/exchange_public_token', { public_token });
      setShowPlaid(false);

      // 4️⃣ Fetch accounts and transactions
      const accountsRes = await axios.get('http://10.22.143.112:3000/accounts');
      setAccounts(accountsRes.data);
      console.log(accountsRes.data);

      const transactionsRes = await axios.get('http://10.22.143.112:3000/transactions');
      setTransactions(transactionsRes.data);
    }
  };

  if (showPlaid && linkToken) {
    return (
      <WebView
        source={{
          uri: `https://cdn.plaid.com/link/v2/stable/link.html?isWebview=true&token=${linkToken}`,
        }}
        onNavigationStateChange={handleNavigation}
      />
    );
  }

  if (!linkToken) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Connect Bank or Card" onPress={() => setShowPlaid(true)} />

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Accounts:</Text>
      {/* <FlatList */}
      {/*   data={accounts} */}
      {/*   keyExtractor={(item: any) => item.account_id} */}
      {/*   renderItem={({ item }) => ( */}
      {/*     <Text>{`${item.name} - ${item.balances.current} ${item.balances.iso_currency_code}`}</Text> */}
      {/*   )} */}
      {/* /> */}

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Transactions:</Text>
      {/* <FlatList */}
      {/*   data={transactions} */}
      {/*   keyExtractor={(item: any) => item.transaction_id} */}
      {/*   renderItem={({ item }) => ( */}
      {/*     <Text>{`${item.date} - ${item.name} - ${item.amount} ${item.iso_currency_code}`}</Text> */}
      {/*   )} */}
      {/* /> */}
    </View>
  );
}

