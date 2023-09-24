import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import ReactjsQuestions from '../screens/reactjs/ReactjsQuestions';
import NodejsQuestions from '../screens/nodejs/NodejsQuestions';
import Typescript from '../screens/typescript/TypescriptQuestions';
import JavascriptOptions from '../screens/js/JavascriptOptions';
import JavascriptAdvanced from '../screens/js/JavascriptAdvanced';
import JavascriptQuestions from '../screens/js/JavascriptQuestions';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#222327',
            shadowOpacity: 0, // This removes the shadow on iOS
            elevation: 0, // This removes the shadow on Android
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '100',
          },
        }}>
        <Stack.Screen name="  " component={Home} />
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
          name="Typescript"
          component={Typescript}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
