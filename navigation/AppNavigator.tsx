import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import JavascriptQuestions from '../screens/js/JavascriptQuestions';
import ReactjsQuestions from '../screens/reactjs/ReactjsQuestions';
import NodejsQuestions from '../screens/nodejs/NodejsQuestions';
import Typescript from '../screens/typescript/TypescriptQuestions';
import JavascriptOptions from '../screens/js/JavascriptOptions';
import JavascriptBasic from '../screens/js/JavascriptBasic';
import JavascriptAdvanced from '../screens/js/JavascriptAdvanced';

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
        <Stack.Screen name="Interview Preparation" component={Home} />
        <Stack.Screen
          name="JavascriptQuestions"
          component={JavascriptQuestions}
          options={{title: 'Javascript Quiz'}}
        />
        <Stack.Screen
          name="ReactjsQuestions"
          component={ReactjsQuestions}
          options={{title: 'Reactjs Quiz'}}
        />
        <Stack.Screen
          name="NodejsQuestions"
          component={NodejsQuestions}
          options={{title: 'Nodejs Quiz'}}
        />
        <Stack.Screen
          name="Typescript"
          component={Typescript}
          options={{title: 'Typescript Quiz'}}
        />
        <Stack.Screen
          name="JavascriptOptions"
          component={JavascriptOptions}
          options={{title: 'Javascript Options'}}
        />

        <Stack.Screen
          name="Basic"
          component={JavascriptBasic}
          options={{title: 'Basic Refresher'}}
        />
        <Stack.Screen
          name="Advanced"
          component={JavascriptAdvanced}
          options={{title: 'Advanced Refresher'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
