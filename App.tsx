import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar as ExpoSattusBar } from "expo-status-bar";
import React, { createContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  AppState,
} from "react-native";
import Home from "./Screen/Home";

// @ts-ignore
export const GlobalContext = createContext();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [saveState, setSaveState] = useState(false);

  useEffect(() => {
    async function setData() {
      const completedTasks = await AsyncStorage.getItem("completedTasks");
      const pendingTasks = await AsyncStorage.getItem("pendingTasks");
      if (completedTasks !== null) {
        // @ts-ignore
        const temp = JSON.parse(completedTasks);
        setCompletedTasks([...temp]);
      }

      if (pendingTasks !== null) {
        // @ts-ignore
        const temp = JSON.parse(pendingTasks);
        // @ts-ignore
        setTasks([...temp]);
      }
    }
    setData();

    AppState.addEventListener("change", (nextAppState) => {
      if (AppState.currentState === "background") {
        setSaveState(true);
      }
    });
  }, []);

  useEffect(() => {
    if (saveState) {
      async function temp() {
        await AsyncStorage.setItem(
          "completedTasks",
          JSON.stringify(completedTasks)
        );
      }
      temp();
      setSaveState(false);
    }
  }, [saveState]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <GlobalContext.Provider
        value={{
          tasks,
          setTasks,
          completedTasks,
          setCompletedTasks,
          saveState,
        }}
      >
        <Home />
      </GlobalContext.Provider>
      <ExpoSattusBar style="auto" />
    </SafeAreaView>
  );
}
