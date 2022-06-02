import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {
  activityFinished,
  activityStarted,
  setError,
} from '../actions/actions';
import { LOGIN_ATTEMPT, REGISTER_ATTEMPT } from '../action_names/login_names';
import { useDispatch } from 'react-redux';

const useAuthServices = () => {
  const dispatch = useDispatch();

  const init = () => {
    return async () => {
      const token = await AsyncStorage.getItem('data');
      console.log(token, 'TOKEEEEEEEN');
      if (token !== null) {
        console.log('token fetched');
        dispatch({
          type: 'LOGIN',
          payload: token,
        });
      }
    };
  };

  const loginService = (email: string, password: string) => {
    return async () => {
      fetch('http://192.168.100.4:3000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(async (res: any) => {
          dispatch(activityFinished(LOGIN_ATTEMPT));
          const data = await res.json();
          if (res.status === 200) {
            await AsyncStorage.setItem('data', JSON.stringify(data));
            dispatch({
              type: 'LOGIN',
              payload: JSON.stringify(data),
            });
          } else {
            Alert.alert('Error', data);
          }
        })
        .catch((e: any) => {
          Alert.alert('Error', e);
          setError('Ha ocurrido un error.');
          return null;
        });
    };
  };

  const registerService = (
    name: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
  ) => {
    return async () => {
      fetch('http://192.168.100.4:3000/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastname,
          email,
          password,
          role,
        }),
      })
        .then(async (res: any) => {
          dispatch(activityFinished(REGISTER_ATTEMPT));

          const data = await res.json();
          if (res.status === 401) {
            Alert.alert('Error', data);
          }
          if (res.status === 200) {
            await AsyncStorage.setItem('data', JSON.stringify(data));
            dispatch({
              type: 'REGISTER',
              payload: JSON.stringify(data),
            });
          }
        })
        .catch((e: any) => {
          Alert.alert('Error', e);
          setError('Ha ocurrido un error.');
          return null;
        });
    };
  };

  const logout = () => {
    return async () => {
      await AsyncStorage.clear();
      dispatch({
        type: 'LOGOUT',
      });
    };
  };
  return {
    init,
    loginService,
    registerService,
    logout,
  };
};

export default useAuthServices;
