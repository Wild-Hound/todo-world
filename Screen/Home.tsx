import React from "react";
import { Text, View } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import CompletedTasks from "../Components/CompletedTasks/CompletedTasks";
import Tasks from "../Components/Tasks/Tasks";
import TodoInput from "../Components/TodoInput/TodoInput";

const Home = () => {
  const ScreenWrapper = styled(View)`
    padding: 0 16px;
  `;
  const Heading = styled(Text)`
    text-align: center;
    font-size: 32px;
    margin-top: 16px;
    color: #34495e;
  `;

  return (
    <ScreenWrapper>
      <Heading>Todo World</Heading>
      <TodoInput />
      <Tasks />
      <CompletedTasks />
    </ScreenWrapper>
  );
};

export default Home;
