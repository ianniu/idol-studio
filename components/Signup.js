import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase/firebase-setup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Colors } from '../styles/Styles'
import { addPlaylistToDB } from '../firebase/firestore'

export default function Signup({ navigation }) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmpassword, setConfirmPassword] = useState(null)

  const handleSignup = async () => {
    // some check here
    if (password.length < 6) {
      Alert.alert('The password needs to be minimum 6 characters')
      return
    }
    if (password !== confirmpassword) {
      Alert.alert("The password and confirmed password don't match")
      return
    }
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const playlistData = {
        name: 'My favorite',
        musicContent: []
      }
      await addPlaylistToDB(playlistData)
    } catch (err) {
      console.log(err)
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
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(newPass) => setPassword(newPass)}
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(newPass) => setConfirmPassword(newPass)}
        value={confirmpassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Register" onPress={handleSignup} />
      <Button title="Already Registered? Login" onPress={() => navigation.replace('Login')} />
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
  }
})
