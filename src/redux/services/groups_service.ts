import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { activityFinished, setError } from '../actions/actions';
import { LOGIN_ATTEMPT } from '../action_names/login_names';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGroupServices = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(
    useSelector((state: any) => state.AuthReducers.auth),
  );
  const createGroupService = (
    name: string,
    classroom: string,
    description: string,
    user_id: number,
  ) => {
    return async () => {
      fetch('http://192.168.100.4:3000/createGroup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          classroom,
          description,
          user_id,
        }),
      })
        .then(async (res: any) => {
          const data = await res.json();
          if (res.status === 200) {
            dispatch({
              type: 'GROUP',
              payload: JSON.stringify(data),
            });
          } else {
            Alert.alert('Error', data);
          }
        })
        .catch((e: any) => {
          Alert.alert('Error', e.message);
          return null;
        });
    };
  };

  const getGroups = (): Promise<any> => {
    return fetch(`http://192.168.100.4:3000/myGroups?user_id=${userData.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          if (data.length === 0) {
            return null;
          } else {
            dispatch({
              type: 'GETGROUP',
              payload: JSON.stringify(data),
            });
            return data;
          }
        }
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
  };

  const usersByGroup = (value: any): Promise<any> => {
    return fetch(`http://192.168.100.4:3000/usersByGroup?id=${value}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          if (data.length === 0) {
            return null;
          } else {
            dispatch({
              type: 'USERS_BY_GROUP',
              payload: JSON.stringify(data),
            });
            return data;
          }
        }
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
  };

  const joinGroup = (user_id: number, group_id: number) => {
    return async () => {
      fetch('http://192.168.100.4:3000/joinGroup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          group_id,
        }),
      })
        .then(async (res: any) => {
          const data = await res.json();
          if (res.status === 200) {
            dispatch({
              type: 'JOINGROUP',
              payload: JSON.stringify(data),
            });
          } else {
            Alert.alert('Error', data);
          }
        })
        .catch((e: any) => {
          Alert.alert('Error', e.message);
        });
    };
  };

  return {
    createGroupService,
    getGroups,
    joinGroup,
    usersByGroup,
  };
};

export default useGroupServices;
