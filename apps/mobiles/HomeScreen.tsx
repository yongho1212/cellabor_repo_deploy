import React from 'react';
import {View, Text, Button} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {authState} from './authState';

const HomeScreen: React.FC = () => {
  const auth = useRecoilValue(authState);
  const setAuthState = useSetRecoilState(authState);

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <View style={{padding: 16}}>
      {auth.isAuthenticated ? (
        <View>
          <Text>환영합니다, {auth.user?.email}</Text>
          <Button title="로그아웃" onPress={handleLogout} />
        </View>
      ) : (
        <Text>로그인이 필요합니다.</Text>
      )}
    </View>
  );
};

export default HomeScreen;
