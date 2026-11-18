import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Todo } from "./TodoItem"

interface InputTodoProps{
  addTodo:(todo:Todo)=>void
}

const InputTodo = ({addTodo}:InputTodoProps) => {
  const [task,setTask] = useState<string>("")
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter task" onChangeText={(e)=>setTask(e)}></TextInput>
      <Pressable onPress={()=>addTodo({task:task,done:false})}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    alignItems:"center",
    margin:10,
    justifyContent:"space-between",
  },
  input: {
    fontSize:20
  },
  saveText: {
    color: 'blue',
    margin:10,
    fontSize:20
  },
});

export default InputTodo