import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../theme/appTheme';
import { useDispatch, useSelector } from 'react-redux';
import useGroupServices from '../../redux/services/groups_service';
import { useNavigation } from '@react-navigation/native';

export const JoinGroup = () => {

  const navigation = useNavigation();
  const [code, setCode] = useState<any>();
  const dispatch = useDispatch();
  const userData = JSON.parse(
    useSelector((state: any) => state.AuthReducers.auth),
  );
  const { joinGroup } = useGroupServices();

  const submit = () => {
    if (code.toString().length > 0) {
      dispatch<any>(joinGroup(userData.id, parseInt(code, 10)));
      // @ts-ignore
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Introduce un código');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontWeight: 'bold' }}>Accediste como</Text>
      <View style={styles.accountContainer}>
        <Image
          source={require('../../imgs/avatar.png')}
          style={styles.accountImage}
        />
        <View style={styles.accountInfo}>
          <Text style={{ color: 'black' }}>
            {userData.name + ' ' + userData.lastname}
          </Text>
          <Text style={{ color: 'grey', fontSize: 12 }}>{userData.email}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          marginTop: 20,
          borderColor: '#b4b4b4',
        }}
      />
      <Text style={styles.instructions}>
        Pidele a tu profesor el codigo de la clase y, luego, ingrésalo aquí.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Código de la clase"
        placeholderTextColor="grey"
        autoFocus={true}
        value={code}
        onChangeText={(value: string) => setCode(value)}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={submit}>
        <Text style={styles.textButton}>Unirme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  accountContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  accountImage: {
    width: 30,
    height: 30,
  },
  accountInfo: {
    marginLeft: 10,
  },
  instructions: {
    color: 'black',
    marginTop: 15,
    fontSize: 14,
  },
  input: {
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    top: 20,
    width: 200,
    height: 50,
    backgroundColor: '#38cc94',
    borderRadius: 100,
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
