import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db, hasOwnProperty } from "../firebase";
import { TodoContext } from "../pages/TodoContext";

const TodoForm = () => {
   const { showAlert, todo, setTodo } = useContext(TodoContext);
   const inputAreaRef = useRef();

   const onSubmit = async () => {
      if (todo?.hasOwnProperty('timestamp')) {
         //update the todo
         const docRef = doc(db, "todos", todo.id);
         const todoUpdated = { ...todo, timestamp: serverTimestamp() }
         updateDoc(docRef, todoUpdated);
         setTodo({ title: '', detail: '' });
         showAlert('info', `Todo with id ${todo.id} updated successfully`)

      } else {
         const collectionRef = collection(db, "todos")
         const docRef = await addDoc(collectionRef, { ...todo, timestamp: serverTimestamp() })
         setTodo({ title: '', detail: '' })
         showAlert('success', `Todo with id ${docRef.id} is added successfully`)
      }

      const collectionRef = collection(db, "todos")
      const docRef = await addDoc(collectionRef, { ...todo, timestamp: serverTimestamp() })
      showAlert('success', `Todo with id ${docRef.id} is added successfully`)
      setTodo(({ title: '', detail: '' }))
   }

   useEffect(() => {
      const checkIfClickOutside = e => {
         if (!inputAreaRef.current.contains(e.target)) {
            console.log('Outside input area');
            setTodo({ title: '', detail: '' })
         } else {
            console.log('Inside input area')
         }
      }

      document.addEventListener("mousedown", checkIfClickOutside)
      return () => {
         document.removeEventListener("mousedown", checkIfClickOutside)
      }
   }, [])

   return (
      <div ref={inputAreaRef}>
         {/* <pre>{JSON.stringify(todo)}</pre> */}
         <TextField fullWidth label="title" margin="normal"
            value={todo.title}
            onChange={e => setTodo({ ...todo, title: e.target.value })}
         />
         <TextField fullWidth label="detail" multiline maxRows={4}
            onChange={e => setTodo({ ...todo, detail: e.target.value })}
            value={todo.detail}
         />
         <Button
            onClick={onSubmit}
            variant="contained"
            sx={{ mt: 3 }}>{todo.hasOwnProperty('timestamp') ? 'Update todo' : 'Add a new Todo'}</Button>
      </div>
   )
}

export default TodoForm
