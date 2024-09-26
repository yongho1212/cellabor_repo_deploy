import React, {useState} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import {firebase} from './firebase';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      // Firebase 인증을 통해 이메일과 비밀번호로 회원가입
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('회원가입 성공', '환영합니다!');
    } catch (error) {
      // 에러 메시지를 처리하고 화면에 표시
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <View style={{padding: 16}}>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 12,
          padding: 8,
        }}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 12,
          padding: 8,
        }}
        secureTextEntry
      />
      {errorMessage && (
        <Text style={{color: 'red', marginBottom: 12}}>{errorMessage}</Text>
      )}
      <Button title="회원가입" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
