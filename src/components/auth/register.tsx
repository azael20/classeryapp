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
import RNPickerSelect from 'react-native-picker-select';
import { colors } from '../../theme/appTheme';
import { Props } from '../../types/Props';
import { useDispatch } from 'react-redux';
import useAuthServices from '../../redux/services/auth_service';
import { activityStarted } from '../../redux/actions/actions';
import { REGISTER_ATTEMPT } from '../../redux/action_names/login_names';

function validate_email(text: string) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(text);
}

export const RegisterScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { registerService } = useAuthServices();

  const validate = () => {
    return (
      name.length > 0 &&
      lastname.length > 0 &&
      validate_email(email) &&
      role.length > 0 &&
      password.length > 0
    );
  };

  const submit = () => {
    if (validate()) {
      dispatch(activityStarted(REGISTER_ATTEMPT));
      dispatch<any>(registerService(name, lastname, email, password, role));
    } else {
      Alert.alert('Error', 'Verifica que tus credenciales están correctas.');
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ justifyContent: 'center', paddingTop: 95 }}>
      <Image
        source={require('../../imgs/classery_logo_without_title.png')}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="grey"
          keyboardType="email-address"
          value={name}
          onChangeText={value => setName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido(s)"
          placeholderTextColor="grey"
          value={lastname}
          onChangeText={value => setLastName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="grey"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <View
          style={{
            backgroundColor: '#e8e8e8',
            borderRadius: 10,
            marginVertical: 5,
          }}>
          <RNPickerSelect
            style={{
              placeholder: {
                color: 'grey',
              },
            }}
            placeholder={{
              label: 'Ocupación...',
              color: 'grey',
            }}
            onValueChange={value => setRole(value)}
            items={[
              { label: 'Maestro', value: 'Maestro' },
              { label: 'Alumno', value: 'Alumno' },
            ]}
          />
        </View>
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
        style={styles.createAccountButton}
        activeOpacity={0.8}
        onPress={submit}>
        <Text style={styles.textButtonLogin}>Crear cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}>
        <Text style={styles.textButtonCreateAccount}>Atrás</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    borderColor: '#e3e3e3',
    borderWidth: 1,
  },
  createAccountButton: {
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 20,
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
    height: 140,
    alignSelf: 'center',
  },
  inputContainer: {
    marginVertical: 20,
  },
});
