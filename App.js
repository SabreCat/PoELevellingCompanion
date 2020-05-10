import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { content } from './data/content.json';
import { globalStyles } from "./styles/global.js";
import drawerNavigator from "./routes/drawer.js";

export default function App() {

  const [state, setState] = useState(content);

  // See if there is any saved state to load
  useEffect( () => {
    async function loadState() {
      try {
        const savedState = await AsyncStorage.getItem("PoeLC");
        if (savedState !== null) {
          // Saved data loaded.
          // TODO: Verify that the data look as expected
          setState((oldState) => {
            return JSON.parse(savedState);
          });
        }
      } catch (error) {
        // Couldn't load saved state - assume there was none and load the default
        // state
      }
    }
    loadState();
  },
  [ /* This array is empty to ensure loading only happens once */]);

  var saveState = async() => {
    try {
      await AsyncStorage.setItem("PoeLC", JSON.stringify(state));
    } catch (error) {
      // TODO: Handle me
    }
  }

  const toggleState = function(index, id) {
    setState((prevState) => {
      //TODO - this copying is stupid and needs fixing
      prevState.acts[prevState.currentAct].tasks[index].complete =
        !prevState.acts[prevState.currentAct].tasks[index].complete;
      return JSON.parse(JSON.stringify(prevState));
    });
  };

  return(
    drawerNavigator()
  );
}
