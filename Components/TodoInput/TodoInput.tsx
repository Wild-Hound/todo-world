import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalContext } from "../../App";

const AddInputWrapper = styled(View)`
  flex-direction: row;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  margin: 16px 0;
`;
const AddInput = styled(TextInput)`
  flex: 1;
  padding: 6px 12px;
`;
const AddBtn = styled(TouchableOpacity)`
  background-color: #34495e;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
`;

const TodoInput = () => {
  const [inputVal, setInputVal] = useState("");

  //   @ts-ignore
  const { tasks, setTasks } = useContext(GlobalContext);

  function addTaskAct() {
    if (inputVal.length >= 3) {
      const prevTasks = tasks;
      Keyboard.dismiss();
      setInputVal("");
      setTasks([...prevTasks, inputVal]);
    }
  }

  return (
    <AddInputWrapper>
      <AddInput
        placeholder="Add Task"
        value={inputVal}
        onChangeText={(text: string) => setInputVal(text)}
        onSubmitEditing={addTaskAct}
        blurOnSubmit={true}
      />
      <AddBtn onPress={addTaskAct}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
      </AddBtn>
    </AddInputWrapper>
  );
};

export default TodoInput;
