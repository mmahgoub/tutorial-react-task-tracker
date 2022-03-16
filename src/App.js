import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from 'react';

function App() {
  const API_END_POINT = 'http://localhost:5000/tasks'

  const [showAddTask, setShowAddTask ] = useState(
    false
  )

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks()
      setTasks(data)
    } 
    getTasks()
  }, [])
  
  const fetchTask = async (id) => {
    const res = await fetch(`${API_END_POINT}/${id}`)
    const data = await res.json();
  return data;
  }
  
  const fetchTasks = async () => {
    const res = await fetch(API_END_POINT)
    const data = await res.json();
  return data;
  }

const addTask = async (task) => {
  // const id = Math.floor(Math.random() * 10000) + 1
  const res = await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task) 
  })
  const data = await res.json()
  setTasks([...tasks, data])
}

const deleteTask = async (id) => {
  await fetch(`${API_END_POINT}/${id}`, {
    method: 'DELETE'
  });
  setTasks(tasks.filter((task)=> task.id !== id))
}

const toggleReminder = async (id) => {
  const oldTask = await fetchTask(id)
  const updatedTask = {...oldTask, reminder: !oldTask.reminder}

  const res = await fetch(`${API_END_POINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: data.reminder} : task))
}

  return (
    <Router>
      <div className="container">
        <Header onFormAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask} />

        <Routes>
          <Route 
            path="/" 
            element={
              <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
              <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} />
              ) : (
                "No tasks to do! Go celebrate!"
                )}
              </>
            } />
          
          <Route path='/about' element={<About />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
