LogBox.ignoreLogs([
  'If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
]); // Ignore log notification by message
LogBox.ignoreAllLogs();

import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { LogBox } from 'react-native';
import { RootNavigation } from './src/components/rootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
