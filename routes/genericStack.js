import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Levelling from "../screens/levelling";
import Passives from "../screens/passives";
import Trials from "../screens/trials";
import About from "../screens/about";
import Settings from "../screens/settings";

import { Colours, Theme} from "../styles/global.js";

import Header from "../shared/header.js";

const Stack = createStackNavigator()

export default function genericNavigator( { navigation, route } ) {
  var component = null;

  switch (route.name) {
    case "Levelling":
      component = Levelling;
      break;
    case "Passives":
      component = Passives;
      break;
    case "Trials":
      component = Trials;
      break;
    case "Settings":
      component = Settings;
      break;
    case "About":
      component = About;
      break;
  }

  return (
    <Stack.Navigator initialRouteName={route.name}
                screenOptions={Colours[Theme].navHeader}>
      <Stack.Screen
          name={route.name}
          component={component}
          options={{
            headerTitle: () => <Header navigation={navigation}
                                       title={route.name}/>,
          }}
      />
    </Stack.Navigator>
  );
}
