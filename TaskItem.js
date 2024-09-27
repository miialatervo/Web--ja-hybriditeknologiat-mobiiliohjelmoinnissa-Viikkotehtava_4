import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.task}>
      <Text style={task.done ? styles.taskDone : styles.taskText}>
        {task.text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default TaskItem;

const styles = StyleSheet.create({
  task: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 18,
  },
  taskDone: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
