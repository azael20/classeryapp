import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../theme/appTheme';
import { Props } from '../../types/Props';
import { useDispatch } from 'react-redux';
import useAuthServices from '../../redux/services/auth_service';
import { activityStarted } from '../../redux/actions/actions';
import { LOGIN_ATTEMPT } from '../../redux/action_names/login_names';

export const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginService } = useAuthServices();

  const validate = () => {
    return email.length >= 1;
  };

  const submit = () => {
    if (validate()) {
      dispatch(activityStarted(LOGIN_ATTEMPT));
      dispatch<any>(loginService(email, password));
    } else {
      Alert.alert('Error', 'Verifica tus datos.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'always'}>
      <Image
        source={require('../../imgs/classery_logo.png')}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="grey"
          keyboardType="email-address"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="*********"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={password}
          onChangeText={value => setPassword(value)}
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.8}
        onPress={submit}>
        <Text style={styles.textButtonLogin}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createAccount}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.textButtonCreateAccount}>Crear cuenta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 15,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  title: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    borderColor: '#e3e3e3',
    borderWidth: 1,
  },
  loginButton: {
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  createAccount: {
    marginTop: 20,
    width: 200,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0)',
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textButtonLogin: {
    fontSize: 18,
    textAlign: 'center',
    color: '#57c78c',
    fontWeight: '600',
  },
  textButtonCreateAccount: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    bottom: 40,
  },
  inputContainer: {
    marginVertical: 30,
  },
});
