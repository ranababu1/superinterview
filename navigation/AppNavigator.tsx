import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import ReactjsQuestions from '../screens/reactjs/ReactjsQuestions';
import NodejsQuestions from '../screens/nodejs/NodejsQuestions';
import TypescriptQuestions from '../screens/typescript/TypescriptQuestions';
import JavascriptOptions from '../screens/js/JavascriptOptions';
import JavascriptAdvanced from '../screens/js/JavascriptAdvanced';
import JavascriptQuestions from '../screens/js/JavascriptQuestions';
import Results from '../components/Results';

export type RootStackParamList = {
  Results: { score: number; totalQuestions: number }; // Define parameter types for Results Screen
};

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1f2720',
            shadowOpacity: 0, // This removes the shadow on iOS
            elevation: 0, // This removes the shadow on Android
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}>
        <Stack.Screen name="Home" component={Home} options={{title: ''}}/>
        <Stack.Screen
          name="JavascriptQuestions"
          component={JavascriptQuestions}
          options={{title: ''}}
        />
        <Stack.Screen
          name="ReactjsQuestions"
          component={ReactjsQuestions}
          options={{title: ''}}
        />
        <Stack.Screen
          name="NodejsQuestions"
          component={NodejsQuestions}
          options={{title: ''}}
        />
        <Stack.Screen
          name="TypescriptQuestions"
          component={TypescriptQuestions}
          options={{title: ''}}
        />
        <Stack.Screen
          name="JavascriptOptions"
          component={JavascriptOptions}
          options={{title: ''}}
        />


        <Stack.Screen
          name="Advanced"
          component={JavascriptAdvanced}
          options={{title: ''}}
        />

<Stack.Screen name="Results" component={Results} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
