
import './App.css';
import { useState, useEffect } from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs'

const API = "http://localhost:5000/todos"

function App() {

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{

    const loadData = async() =>{
      setLoading(true)

      const resp = await fetch('http://localhost:5000/todos')
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((error) => console.log(error));
      setLoading(false)
      setTodos(resp)
    };

    loadData()
  },[])
  

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log("enviado");
    console.log(title)
    
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

   
    //envia os dados digitados no input para o db.json
    await fetch(API, {
      method: "POST",
      body: JSON.stringify(todo),
     headers: {
      "Content-Type": "application/json",
     },

    });
    console.log(todo)
    console.log()
    setTitle("")
    setTime("")
  }

  return (
    <div className="App">
      <header className="todo_header">
      <h1>React Todo App</h1>
      </header>
      <section className='form_section'>
        <div className="form_todo">
          <h2>Insira a sua próxima tarefa:</h2>
          <form onSubmit={handleSubmit}>
            <div className='form_control'>
            <label htmlFor="title"> O que você vai fazer ?</label>
            <input type="text" name='title' placeholder='Título da tarefa' 
            onChange={(e)=> setTitle(e.target.value)}
            value={title || ""} required
            />
            <div className='form_time'>
              <label htmlFor="time">Duração da tarefa:</label>
              <input type="text" name='time' placeholder='Tempo da tarefa'
              onChange={(e)=> setTime(e.target.value)}
              value={time || ""} required 
              />
            </div>
            </div>
            <input type="submit" value="enviar" />
          </form>
        </div>

        <div className="list_todo">
          <h2>Lista de Tarefas</h2>
          <p></p>
          {todos.length === 0 && <p>Não há tarefas.</p>}
          
          {todos.map((todo) =>(
            <div className='todo' key={todo.id}>
              <p>{todo.title}</p>
            </div>
          ))}
          
        </div>
      </section>



      
    </div>
  );
}

export default App;
