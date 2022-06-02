import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SpeedDial } from 'react-native-elements';
import { colors } from '../../theme/appTheme';
import { Props } from '../../types/Props';
import { useSelector } from 'react-redux';
import useGroupServices from '../../redux/services/groups_service';

export const Home = ({ navigation }: Props) => {

  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const { getGroups } = useGroupServices();
  const [isLoading, setIsLoading] = useState(true);
  const userData = JSON.parse(
    useSelector((state: any) => state.AuthReducers.auth),
  );

  useEffect(() => {
    getGroups().then((res: any) => {
      setGroups(res);
      setIsLoading(false);
    });
  }, []);

  const Main = () => {
    if (isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={30} />
        </View>
      );
    } else {
      if (groups !== null) {
        return (
          <FlatList
            data={groups}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() =>
                  getGroups().then((res: any) => {
                    setGroups(res);
                    setIsLoading(false);
                  })
                }
              />
            }
            contentContainerStyle={{ paddingTop: 15 }}
            renderItem={renderItem}
            // keyExtractor={item => item.id.toString()}
            numColumns={1}
            showsVerticalScrollIndicator={false}
          />
        );
      } else {
        return (
          <ScrollView
            refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() =>
                getGroups().then((res: any) => {
                  setGroups(res);
                  setIsLoading(false);
                })
              }
            />}
            contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 70}}>
            <Text style={{ color: '#444' }}>
              Aún no te has unido a ningún grupo.
            </Text>
          </ScrollView>
        );
      }
    }
  };

  const getColor = () => {
    return (
      'hsl(' +
      360 * Math.random() +
      ',' +
      (50 + 81 * Math.random()) +
      '%,' +
      (85 + 10 * Math.random()) +
      '%)'
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Tabs', {item})}
        activeOpacity={1}
        style={{ ...styles.itemContainer, backgroundColor: '#00d0ff' }}>
        <Text style={styles.nombreCurso} numberOfLines={1}>
          {item.name}
        </Text>
        <Text numberOfLines={3} style={styles.descripcionCurso}>
          {item.description}
        </Text>
        <Text style={styles.grupoCurso}>Grupo: {item.classroom}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      {userData.role === 'Maestro' ? (
        <SpeedDial
          color={colors.primary}
          style={{ zIndex: 1 }}
          isOpen={open}
          icon={{ name: 'settings', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}>
          <SpeedDial.Action
            color={colors.primary}
            icon={{ name: 'person', color: '#fff' }}
            title="Perfil"
            onPress={() => navigation.navigate('Settings')}
          />
          <SpeedDial.Action
            color={colors.primary}
            icon={{ name: 'add', color: '#fff' }}
            title="Crear grupo"
            onPress={() => navigation.navigate('CreateGroup')}
          />
        </SpeedDial>
      ) : (
        <SpeedDial
          color={colors.primary}
          style={{ zIndex: 1 }}
          isOpen={open}
          icon={{ name: 'settings', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}>
          <SpeedDial.Action
            color={colors.primary}
            icon={{ name: 'person', color: '#fff' }}
            title="Perfil"
            onPress={() => navigation.navigate('Settings')}
          />
          <SpeedDial.Action
            color={colors.primary}
            icon={{ name: 'add', color: '#fff' }}
            title="Unirte a un grupo"
            onPress={() => navigation.navigate('JoinGroup')}
          />
        </SpeedDial>
      )}
      <View style={styles.container}>
        <Text style={styles.title}>Hola, {userData.name}!</Text>
        <Main />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
    backgroundColor: 'white',
  },
  itemContainer: {
    borderRadius: 10,
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 5,
    elevation: 3,
    paddingHorizontal: 20,
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: 'black',
    left: 10,
    top: 5,
  },
  nombreCurso: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descripcionCurso: {
    color: 'grey',
  },
  grupoCurso: {
    marginTop: 10,
    color: 'black',
  },
  alumnosCurso: {
    color: 'black',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
