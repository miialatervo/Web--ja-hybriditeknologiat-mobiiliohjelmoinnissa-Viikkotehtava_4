import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './TaskItem';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await getData('tasks');
    if (storedTasks) {
      setTasks(storedTasks);
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { text: newTask, done: false }];
      setTasks(updatedTasks);
      await storeData('tasks', updatedTasks);
      setNewTask('');
    }
  };

  const toggleTask = async (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    await storeData('tasks', updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <TaskItem task={item} onPress={() => toggleTask(index)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Save" onPress={addTask} color="pink" />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'pink',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 8,
    flex: 1,
  },
});
