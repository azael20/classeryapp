import React, { useEffect, useState } from 'react';
import { LoginScreen } from './auth/login';
import { RegisterScreen } from './auth/register';
import { Home } from './home/home';
import { createStackNavigator } from '@react-navigation/stack';
import { JoinGroup } from './FABs/joinGroup';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CreateGroup } from './FABs/createGroup';
import { colors } from '../theme/appTheme';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import useAuthServices from '../redux/services/auth_service';
import { Settings } from './FABs/settings';
import Tabs from './group/tabs/Tabs';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
          backgroundColor: '#f2f2f2',
        },
        headerTitleStyle: {
          fontSize: 14,
          color: 'grey',
          fontFamily: 'Roboto',
        },
      }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

export const HomeStackNavigator = () => {
  const dispatch = useDispatch();
  const { logout } = useAuthServices();
  const submit = () => {
    // @ts-ignore
    return dispatch(logout());
  };
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          fontSize: 25,
          color: 'white',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        options={{
          title: 'Cursos',
          headerTitleStyle: {
            fontWeight: '300',
            color: 'white',
          },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={submit}>
              <Text style={{ color: 'white' }}>Cerrar sesión</Text>
            </TouchableOpacity>
          ),
        }}
        component={Home}
      />
      <HomeStack.Screen
        name="JoinGroup"
        options={{
          title: 'Unirte a un grupo',
          headerTitleStyle: { color: 'black', fontSize: 14 },
          headerTitleAlign: 'center',
          headerShown: true,
        }}
        component={JoinGroup}
      />
      <HomeStack.Screen
        name="CreateGroup"
        options={{
          title: 'Crear un grupo',
          headerTitleStyle: { color: 'black', fontSize: 14 },
          headerTitleAlign: 'center',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Text style={{ color: 'white' }}>Crear</Text>
            </TouchableOpacity>
          ),
        }}
        component={CreateGroup}
      />
      <HomeStack.Screen
        name="Settings"
        options={{
          title: 'Perfil',
          headerTitleStyle: { color: 'black', fontSize: 14 },
          headerTitleAlign: 'center',
          headerShown: true,
        }}
        component={Settings}
      />
      <HomeStack.Screen
        name="Tabs"
        options={{
          title: 'Grupo',
          headerTitleStyle: { color: 'black', fontSize: 14 },
          headerTitleAlign: 'center',
          headerShown: true,
        }}
        component={Tabs}
      />
    </HomeStack.Navigator>
  );
};

export const RootNavigation = () => {
  let data = useSelector((state: any) => state.AuthReducers.auth);
  if (data !== null) {
    data = JSON.parse(data);
  }
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { init } = useAuthServices();

  const Init = async () => {
    await dispatch<any>(init());
    setIsLoading(false);
  };

  useEffect(() => {
    Init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary,
        }}>
        <Image
          source={require('../imgs/classery_logo.png')}
          style={{ width: 220, height: 220, bottom: 130 }}
        />
        <ActivityIndicator
          size="large"
          color={'white'}
          style={{ bottom: 60 }}
        />
        <Text style={{ color: 'white', textAlign: 'center', left: 7 }}>
          Cargando...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {data === null ? <AuthStackNavigator /> : <HomeStackNavigator />}
      </View>
    </NavigationContainer>
  );
};
