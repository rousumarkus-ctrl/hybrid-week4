import { Pressable, StyleSheet, Text, View } from "react-native"

export interface Todo{
  task:string,
  done:boolean
}

export interface TodoItemProps{
  todo:Todo,
  toggle:(todo:Todo)=>void
}

const TodoItem = ({todo,toggle}:TodoItemProps) => {
  return (<View style={styles.container}>
    <Pressable onPress={()=>toggle(todo)}>
      <Text key={todo.task+todo.done} style={[styles.text,todo.done&&styles.doneText]}>{todo.task}</Text>
    </Pressable>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  text: {
    fontSize: 30,
  },
  doneText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
})

export default TodoItem