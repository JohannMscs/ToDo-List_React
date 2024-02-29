
import './App.css';
import { useState, useEffect } from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs'

const API = "http://localhost:5000/todos/"

function App() {

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{

    const loadData = async() =>{
      setLoading(true)

      const resp = await fetch(API)
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
    setTodos((prevState) =>[...prevState, todo])
    console.log(todo)
    console.log(todo.id)
    setTitle("")
    setTime("")
  };

  const handleDelete = async (id) =>{
  await fetch(`http://localhost:5000/todos/${id}`,{
    method: "DELETE",
  });
  setTodos((prevState) => prevState.filter((todo) => todo.id !==id)) 

}

const handleEdit = async(todo) =>{
  todo.done = !todo.done;
  const data = await fetch(`http://localhost:5000/todos/${todo.id}`,{
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json"
    }
  })
  setTodos((prevState) => prevState.map((t) =>(t.id === 
data.id ? (t === data) : t)))
}

  if(loading){
    return <p>Carregand informações...</p>
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
              <h3 className={todo.done ? "todo_done" : ""}>{todo.title} </h3>
              <p>Duração: {todo.time} Horas</p>
              <span onClick={() => handleEdit(todo.id)}>
                {!todo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}
              </span>
              <BsTrash onClick={() =>handleDelete(todo.id)}/>
            </div>
          ))}
          
        </div>
      </section>



      
    </div>
  );
}

export default App;
