import * as React from 'react';

import {StyleSheet, View, Text, Pressable} from 'react-native';
import {
  init,
  connectWithRedirect,
  getIdToken,
  getUser,
  EarthoAuthProvider,
} from '@eartho/one-client-react-native';

const EARTHO_CLIENT_ID = 'YOUR_EARTHO_CLIENT_ID'; // change this
const EARTHO_CLIENT_SECRET = 'YOUR_EARTHO_CLIENT_SECRET'; // change this
const EARTHO_ACCESS_ID = 'YOUR_EARTHO_ACCESS_ID'; // change this

export default function App() {
  React.useEffect(() => {
    init(EARTHO_CLIENT_ID, EARTHO_CLIENT_SECRET);
  }, []);

  const onSignIn = async () => {
    try {
      await connectWithRedirect(EARTHO_ACCESS_ID).then(async response => {
        console.log('response: ' + response);
        console.log(await getIdToken());
        console.log(await getUser());
      });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 32}}>{'Details in logs output'}</Text>

      <Pressable style={styles.button} onPress={() => onSignIn()}>
        <Text style={styles.text}>{'Sign In'}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async () => {
          await connectWithRedirect(EARTHO_ACCESS_ID);
        }}>
        <Text style={styles.text}>{'connect access'}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async () => {
          console.log(await getIdToken());
        }}>
        <Text style={styles.text}>{'getIdToken'}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async () => {
          console.log(await getUser());
        }}>
        <Text style={styles.text}>{'getUser'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 5,
    width: 200,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
