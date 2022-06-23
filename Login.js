import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

async function sendText(phoneNumber)
{
  console.log("Phone Number:", phoneNumber);
  await fetch("https://dev.stedi.me/twofactorlogin/"+phoneNumber,
  {
    method: "POST",
    headers:
    {
      "content-type":"application/text"
    }
  })
}

const getToken = async ({oneTimePassword, phoneNumber}) =>
{
  console.log("This should log you in")
  const tokenResponse = await fetch("https://dev.stedi.me/twofactorlogin",
  {
    method: "POST",
    headers:
    {
      "content-type":"application/json"
    },
    body:JSON.stringify({oneTimePassword, phoneNumber})
  });

  const tokenResponseString = await tokenResponse.text();
  console.log(tokenResponseString);
}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="123-456-7890"
        placeholderTextColor="#D3D3D3"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1 1 1 uhhh... 1"
        placeholderTextColor="#D3D3D3"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{getToken({phoneNumber, oneTimePassword})}}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{marginTop:100},
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },


});

export default Login;