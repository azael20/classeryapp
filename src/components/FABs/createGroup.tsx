import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../theme/appTheme';
import useGroupServices from '../../redux/services/groups_service';
import { useDispatch, useSelector } from 'react-redux';

export const CreateGroup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [classroom, setClassroom] = useState('');
  const [description, setDescription] = useState('');
  const { createGroupService } = useGroupServices();
  const dispatch = useDispatch();

  const userData = JSON.parse(
    useSelector((state: any) => state.AuthReducers.auth),
  );

  const validate = () => {
    return name.length > 0 && classroom.length > 0 && description.length > 0;
  };

  const submit = () => {
    if (validate()) {
      dispatch<any>(
        createGroupService(name, classroom, description, userData.id),
      );
      // @ts-ignore
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Llena todos los campos para crear el grupo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Pidele a tu profesor el codigo de la clase y, luego, ingrésalo aquí.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del curso"
        placeholderTextColor="grey"
        autoFocus={true}
        value={name}
        onChangeText={(value: any) => setName(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="No. grupo"
        placeholderTextColor="grey"
        value={classroom}
        onChangeText={(value: any) => setClassroom(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción del curso"
        placeholderTextColor="grey"
        value={description}
        onChangeText={(value: any) => setDescription(value)}
      />
      <TouchableOpacity
        style={styles.createAccount}
        activeOpacity={0.8}
        onPress={submit}>
        <Text style={styles.textButtonCreateAccount}>Crear grupo</Text>
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
  createAccount: {
    marginTop: 20,
    width: 200,
    height: 50,
    backgroundColor: colors.primary,
    borderColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textButtonCreateAccount: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});
