import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      {
        id: Math.random().toString(),
        value: goalTitle
      }
    ]);
    setIsAddMode(false);
  }

  const addCancelHandler = () => {
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    })
  }

  return (
    <View style={styles.screen}>
      <Button title="Add new Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancelGoal={addCancelHandler} />
      <FlatList
        keyExtractor={(item) => item.id}
        data={courseGoals}
        renderItem={itemData => <GoalItem id={itemData.item.id} item={itemData.item.value} onDelete={removeGoalHandler} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
