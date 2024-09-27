import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './TaskItem';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Lataa tehtävät muistiin sovelluksen alussa
  useEffect(() => {
    loadTasks();
  }, []);

  // Hae tehtävät AsyncStoragesta
  const loadTasks = async () => {
    const storedTasks = await getData('tasks');
    if (storedTasks) {
      setTasks(storedTasks);
    }
  };

  // Lisää uusi tehtävä ja tallenna se
  const addTask = async () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { text: newTask, done: false }];
      setTasks(updatedTasks);
      await storeData('tasks', updatedTasks);
      setNewTask('');
    }
  };

  // Merkitse tehtävä tehdyksi/tekemättömäksi
  const toggleTask = async (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    await storeData('tasks', updatedTasks);
  };

  // Riveissä käytettävä renderöintikomponentti
  const renderItem = ({ item, index }) => (
    <TaskItem task={item} onPress={() => toggleTask(index)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
};

// AsyncStorage helper functions
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error(e);
  }
};

export default TodoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
