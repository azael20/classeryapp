import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useGroupServices from '../../redux/services/groups_service';

export const Persons = ({ route }: any) => {
  const { group_id } = route.params;

  const { usersByGroup } = useGroupServices();
  const [users, setUsers] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    usersByGroup(group_id).then((res: any) => {
      console.log('AAAAAAA');
      setUsers(res);
      console.log('EEEEEEE');
      setIsLoading(false);
    });
  }, []);

  const renderItemTeacher = ({ item }: any) => {
    if (item.role === 'Maestro') {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../imgs/avatar.png')}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <View
            style={{ marginVertical: 5, flex: 1, justifyContent: 'center' }}>
            <Text style={{ color: '#444' }}>
              {item.name} {item.lastname}
            </Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      );
    }
  };

  const renderItemUsers = ({ item }: any) => {
    if (item.role === 'Alumno') {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../imgs/avatar.png')}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <View
            style={{
              height: 60,
              marginVertical: 5,
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={40} color={'#38cc94'} />
        </View>
      ) : (
        <>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#444' }}>
            Maestro
          </Text>
          <View
            style={{
              marginTop: 4,
              borderBottomWidth: 0.4,
              borderColor: '#adadad',
            }}
          />
          <View style={{ marginBottom: 50 }}>
            {/*@ts-ignore*/}
            <FlatList data={users} renderItem={renderItemTeacher} />
          </View>
          <View style={{ marginBottom: 50 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#444' }}>
              Alumnos
            </Text>
            <View
              style={{
                marginTop: 4,
                borderBottomWidth: 0.4,
                borderColor: '#adadad',
              }}
            />
            {/*@ts-ignore*/}
            <FlatList data={users} renderItem={renderItemUsers} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
