import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { styles } from './modal';


export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text>This is a modal</Text>
      <Link href="/" dismissTo style={styles.link}>
        <Text>Go to home screen</Text>
      </Link>
    </View>
  );
}

