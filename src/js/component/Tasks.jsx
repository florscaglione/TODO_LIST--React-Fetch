//import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import InputTask from "./InputTask.jsx";
import TaskLi from "./TaskLi.jsx";

//create your first component
const Tasks = () => {
	const [tasks, setTasks] = useState(["Programar", "Programar más"]);
	const [newTask, setNewTask] = useState("");
	const [taskExists, setTaskExists] = useState(false);

	function newTaskChange(event) {
		setNewTask(event.target.value);
	}

	useEffect(() => {
		let position = tasks.findIndex(task => task === newTask); //si no la encuentra, devuelve -1
		if (position === -1) {
			//(esto nos indica si la tarea que estamos escribiendo ya existe en el listado)
			setTaskExists(false);
		} else {
			setTaskExists(true);
		}
	}, [newTask]);

	//añadir tarea
	function addNewTask(event) {
		//busco la tarea que escribo para que no la añada si esta existe (con findIndex del useEffect)
		//pregunto: si le han dado a ENTER y además no existe, entonces la añado
		if (event.key === "Enter" && !taskExists) {
			setTasks([...tasks, newTask]); //esta es la sintaxis para añadir la nueva tarea en el array de tareas (SE CREA UNA COPIA DEL ARRAY,NO SE SOBREESCRIBE)
			setNewTask(""); //dejo la casilla vacía despues de añadir la tarea
		}
	}

	//borrar tarea
	function deleteTask(indexToRemove) {
		let newTasks = [...tasks];
		newTasks.splice(indexToRemove, 1);
		setTasks(newTasks);
	}

	//modificar tarea existente
	function modifyTask(newValue, position) {
		//Nos da el valor nuevo de la tarea y su posicion en el array
		let newTasks = [...tasks]; //hago una copia del array de tareas y lo llamo NuevasTareas
		newTasks.splice(position, 1, newValue); //sustituyo en la copia en esa pos. q quiero modificar por el nuevo valor
		setTasks(newTasks); //lo establecemos
	}

	return (
		<div className="text-center mt-5 container">
			<h2 className="mb-3">TO DO LIST</h2>
			<input
				className={taskExists ? "error" : ""}
				type="text"
				placeholder="New task"
				onChange={newTaskChange}
				onKeyDown={addNewTask}
				value={newTask}
			/>

			<ul className="tasks">
				{tasks.map((task, index) => (
					<TaskLi
						key={index}
						task={task}
						taskExists={task === newTask}
						index={index}
						modifyTask={modifyTask}
						deleteTask={deleteTask}
					/>
				))}
			</ul>
		</div>
	);
};

export default Tasks;
