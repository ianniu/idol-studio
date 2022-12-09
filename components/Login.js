import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase/firebase-setup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Colors } from '../styles/Styles'

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCred.user.uid)
    } catch (err) {
      Alert.alert(err.message)
      console.log(err.message)
    }
    navigation.navigate('Playlist')
  }
  return (
    <View style={styles.authContent}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={(newEmail) => setEmail(newEmail)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.label}>password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(newPass) => setPassword(newPass)}
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.button}>
        <Button title="Log In" onPress={handleLogin} />
      </View>
      <View style={styles.button}>
        <Button title="New User? Create an account" onPress={() => navigation.replace('Signup')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  authContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.black1
  },
  inputContainer: {
    marginVertical: 8
  },
  label: {
    marginBottom: 4,
    color: Colors.white1
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 16,
    borderColor: Colors.white1,
    borderWidth: 2,
    color: Colors.white1
  },
  button: {
    marginTop: 5
  }
})
