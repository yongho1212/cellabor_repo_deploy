import React, {useState} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
// import {firebase} from './firebase';
import {useSetRecoilState} from 'recoil';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {authState} from './authState';
import Typography from '@repo/ui/src/components/Typography/Typography';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function googleLogin() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {id, user} = await GoogleSignin.signIn();
      console.log(id.user);
    } catch (err) {
      console.log(err);
    }
  }

  // Recoil 상태 업데이트 함수
  const setAuthState = useSetRecoilState(authState);

  const gid =
    '249009639394-gp467256jk4m54sd2v3446r9m2doij8p.mobiles.googleusercontent.com';

  const handleLogin = async () => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // 로그인 성공 시, Recoil 상태 업데이트
      setAuthState({
        isAuthenticated: true,
        user,
      });

      Alert.alert('로그인 성공', '환영합니다!');
    } catch (error) {
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
      {/* 빌드 때문에 임시 박음 */}
      <Typography variant={'ptd_b_20'}>
        내 스타일과 비슷한 메이트를 만나볼까요?
      </Typography>
      <Button title="로그인" onPress={handleLogin} />
      <Button title="googlde" onPress={googleLogin} />
    </View>
  );
};

export default LoginScreen;
