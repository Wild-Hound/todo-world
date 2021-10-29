import React, { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { GlobalContext } from "../../App";

const ComponentWrapper = styled(View)`
  margin-top: 32px;
`;
const CompletedTask = styled(View)`
  background-color: #2ecc71;
  padding: 0 0 0 16px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;
const TaskText = styled(Text)`
  color: white;
  margin-left: 8px;
`;
const DeleteBtn = styled(TouchableOpacity)`
  background-color: #e74c3c;
  margin-left: auto;
  padding: 8px 12px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const CompletedTasks = () => {
  // @ts-ignore
  const { completedTasks, setCompletedTasks } = useContext(GlobalContext);

  function deletAction(id: number) {
    const tempArr: any[] = [];
    completedTasks.forEach((data: string, index: number) => {
      if (!(index === id)) {
        tempArr.push(data);
      }
    });
    setCompletedTasks([...tempArr]);
  }

  return (
    <ComponentWrapper>
      {completedTasks?.map((task: string, index: number) => {
        return (
          <CompletedTask key={index}>
            <Ionicons name="checkmark-done-circle" size={24} color="white" />
            <TaskText>{task}</TaskText>
            <DeleteBtn onPress={() => deletAction(index)}>
              <AntDesign name="delete" size={24} color="white" />
            </DeleteBtn>
          </CompletedTask>
        );
      })}
    </ComponentWrapper>
  );
};

export default CompletedTasks;
