import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const TaskItem = ({ task, onPress }) => {
  if (!task) return null; // Prevents error if task is undefined

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
        {task.text}
      </Text>
    </TouchableOpacity>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskText: {
    fontSize: 18,
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  taskTextDone: {
    textDecorationLine: 'line-through', // Strikethrough for completed tasks
    color: 'gray', // Change color to indicate completion
  },
});
