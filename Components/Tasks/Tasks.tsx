import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { GlobalContext } from "../../App";
import { SwipeListView } from "react-native-swipe-list-view";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Task = styled(View)`
  flex-direction: row;
  border: 1px solid #95a5a6;
  border-radius: 5px;
`;
const TaskText = styled(TextInput)`
  flex: 1;
  background-color: #34495e;
  color: white;
  padding: 8px 16px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
`;
const TaskCompleteBtn = styled(TouchableOpacity)`
  width: 48px;
  background-color: black;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;
const TaskEditbtn = styled(TouchableOpacity)`
  /* width: 48px; */
  background-color: #f1c40f;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0 16px;
`;
const TaskEditSaveBtn = styled(TouchableOpacity)`
  height: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0 16px;
  background-color: #2ecc71;
`;
const TaskDeletebtn = styled(TouchableOpacity)`
  /* width: 48px; */
  background-color: #e74c3c;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;
const BtnGroup = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

const Tasks = () => {
  // @ts-ignore
  const { tasks, setTasks, completedTasks, setCompletedTasks, saveState } =
    useContext(GlobalContext);

  const [tasksData, setTasksData] = useState(
    tasks.map((task: any, index: number) => ({
      key: index,
      text: task,
      editable: false,
    }))
  );

  useEffect(() => {
    if (saveState) {
      const tempArr: any[] = [];
      tasksData.forEach((task: string) => {
        // @ts-ignore
        tempArr.push(task.text);
      });

      async function temp() {
        await AsyncStorage.setItem("pendingTasks", JSON.stringify(tempArr));
      }
      temp();
    }
  }, [saveState]);

  function completeBtnAct(data: any) {
    const prevData = completedTasks;

    const remainingTasks: any[] = [];
    tasksData.forEach((task: any) => {
      if (!(task.key === data.item.key)) {
        remainingTasks.push(task.text);
      }
    });

    setCompletedTasks([...prevData, data.item.text]);
    setTasks([...remainingTasks]);
  }

  function deleteAction(data: any) {
    const remainingTasks: any[] = [];
    tasksData.forEach((task: any) => {
      if (!(task.key === data.item.key)) {
        remainingTasks.push(task.text);
      }
    });

    setTasks([...remainingTasks]);
  }

  function editBtnAction(data: any) {
    const tempArr: any[] = [];
    tasksData.forEach((task: any, index: number) => {
      if (task.key === data.item.key) {
        const temp = task;
        temp.editable = !temp.editable;
        tempArr.push(temp);
      } else {
        tempArr.push(task);
      }
    });
    setTasksData([...tempArr]);
  }

  function saveBtnAction(data: any) {
    const tempArr: any[] = [];
    tasksData.forEach((task: any, index: number) => {
      tempArr.push(task.text);
    });
    setTasks([...tempArr]);
  }

  function changeTaskText(data: any, value: string) {
    const tempArr: any[] = [];
    tasksData.forEach((task: any, index: number) => {
      if (task.key === data.item.key) {
        const temp = task;
        temp.text = value;
        tempArr.push(temp);
      } else {
        tempArr.push(task);
      }
    });
    setTasksData([...tempArr]);
  }

  function getTasks(data: any, rowMap: any) {
    return (
      <Task>
        <TaskText
          value={data.item.text}
          editable={data.item.editable}
          onChangeText={(val: string) => changeTaskText(data, val)}
          onSubmitEditing={() => {
            saveBtnAction(data);
          }}
        />
        <TaskCompleteBtn
          onPress={() => {
            completeBtnAct(data);
          }}
        >
          <Ionicons name="checkmark-done-sharp" size={24} color="white" />
        </TaskCompleteBtn>
      </Task>
    );
  }

  function taskHiddenBtns(data: any, rowMap: any) {
    return (
      <BtnGroup>
        <TaskDeletebtn onPress={() => deleteAction(data)}>
          <Text style={{ color: "white" }}>
            <AntDesign name="delete" size={24} color="white" />
          </Text>
        </TaskDeletebtn>
        {data.item.editable ? (
          <TaskEditSaveBtn onPress={() => saveBtnAction(data)}>
            <Feather name="save" size={24} color="white" />
          </TaskEditSaveBtn>
        ) : (
          <TaskEditbtn onPress={() => editBtnAction(data)}>
            <Text style={{ color: "white" }}>
              <Feather name="edit" size={24} color="white" />
            </Text>
          </TaskEditbtn>
        )}
      </BtnGroup>
    );
  }

  return (
    <SwipeListView
      data={tasksData}
      renderItem={getTasks}
      renderHiddenItem={taskHiddenBtns}
      //   leftOpenValue={75}
      rightOpenValue={-110}
    />
  );
};

export default Tasks;
