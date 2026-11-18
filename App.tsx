import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TodoItem, { Todo } from './components/TodoItem';
import InputTodo from './components/InputTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [todos,setTodos] = useState<Todo[]>([])
  const addTodo=(todo:Todo)=>{
    const newTodos = todos.concat(todo)
    setTodos(newTodos)
    saveTodos(newTodos)
  }
  const toggleTodo=(todo:Todo)=>{
    const newTodos = todos.map((t)=>t==todo?{task:t.task,done:!t.done}:t)
    setTodos(newTodos)
    saveTodos(newTodos)
  }
  const saveTodos = async (newTodos:Todo[]) => {
    try {
      await AsyncStorage.setItem("todos",JSON.stringify(newTodos))
    }catch(e){
      console.error(e)
    }
  }
  const getTodos = async () => {
    try {
      const stored = await AsyncStorage.getItem("todos")
      if (stored!==null) setTodos(JSON.parse(stored))
    }catch(e){
      console.error(e)
    }
  }
  useEffect(()=>{
    getTodos()
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <InputTodo addTodo={addTodo}></InputTodo>
      <FlatList style={styles.list} data={todos} renderItem={(t)=><TodoItem todo={t.item} toggle={toggleTodo}></TodoItem>}></FlatList>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize:30,
    textAlign: "center",
    margin:10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list:{
    margin:10
  }
});
