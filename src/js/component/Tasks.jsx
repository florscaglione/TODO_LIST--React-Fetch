import React, { useEffect, useState } from "react";

import TaskLi from "./TaskLi.jsx";

//create your first component
const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState({});
	const [taskExists, setTaskExists] = useState(false);

	useEffect(() => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/florscaglione",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				setTasks(responseJson); //guardo la data que recibo de la API en mi array de tareas
			})
			.catch(error => {
				console.log(error);
			});
	}, []); //array vacío como seg. parámetro para que se ejecute sólo una vez, al cargar la pág.

	function createUserTodos() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/florscaglione",
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				console.log(resp);
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	function newTaskChange(event) {
		setNewTask({ label: event.target.value, done: false });
	}

	useEffect(() => {
		findDuplicateTasks();
	}, [newTask.label]); //con este seg. parámetro le digo que el useEffect se ejecute cada vez que newTask cambia

	//comprobar si la tarea ya existe
	function findDuplicateTasks() {
		let position = tasks.findIndex(task => task.label === newTask.label); //si no la encuentra, devuelve -1
		if (position === -1) {
			//(esto nos indica si la tarea que estamos escribiendo ya existe en el listado)
			setTaskExists(false);
		} else {
			setTaskExists(true);
		}
	}

	useEffect(() => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/florscaglione",
			{
				method: "PUT",
				body: JSON.stringify(tasks), //usamos stringify para que la tarea no se envie a la API en formato array sino como texto plano(le quito el formato JSON,se transforma)
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => {
				console.log("OJO! ", tasks); // POR QUÉ AQUÍ ESTÁ TASKS VACÍO?????? esto me da el error 400 en el PUT
				return response.json();
			})
			.then(responseJson => {
				console.log(responseJson);
			})
			.catch(error => {
				console.log(error);
			});
	}, [tasks]);

	//añadir tarea
	function addNewTask(event) {
		if (event.key === "Enter" && newTask.label != "" && !taskExists) {
			setTasks([...tasks, newTask]); //esta es la sintaxis para añadir la nueva tarea en el array de tareas (SE CREA UNA COPIA DEL ARRAY,NO SE SOBREESCRIBE)
			setNewTask({ label: "", done: "" }); //dejo la casilla vacía despues de añadir la tarea,pero ahora en formato objeto(como trabaja la API)
		}
	}

	//borrar tarea
	function deleteTask(index) {
		let newTasks = [...tasks]; //los 3 puntos mandan una copia del array
		let indexToRemove = newTasks.findIndex(task => index === indexToRemove);
		console.log(indexToRemove);
		newTasks.splice(indexToRemove, 1);
		setTasks(newTasks); //SOLUCIONAR: no me está reconociendo el index que borro, por eso borra en orden
	}

	//según esta API, este método DELETE borra todo,incluido el usuario (hay que volver a crearlo después de darle al botón "DELETE ALL")
	function deleteTodos() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/florscaglione",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				console.log(resp);
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
		createUserTodos();
	}

	//modificar tarea existentes (modificado en el de fetch)
	/* 		function modifyTask(newValue, id) {
		//Nos da el valor nuevo de la tarea y su posicion en el array
		let newTasks = [...tasks]; //hago una copia del array de tareas y lo llamo NuevasTareas
		let position = newTasks.findIndex(task => task.id === id);
		let task = newTasks.find(task => task.id === id);
		task.label = newValue;
		newTasks.splice(position, 1, task.label); //sustituyo en la copia en esa pos. q quiero modificar por el nuevo valor
		setTasks(newTasks); //lo establecemos
	} */

	//modificar tarea existente (original en el de react)
	/* 	function modifyTask(newValue, position) {
		//Nos da el valor nuevo de la tarea y su posicion en el array
		let newTasks = [...tasks]; //hago una copia del array de tareas y lo llamo NuevasTareas
		newTasks.splice(position, 1, newValue); //sustituyo en la copia en esa pos. q quiero modificar por el nuevo valor
		setTasks(newTasks); //lo establecemos 
	} */

	return (
		<div className="text-center mt-5 container">
			<h2 className="mb-3">TO DO LIST</h2>
			<input
				className={taskExists ? "error" : ""}
				type="text"
				placeholder="New task"
				onChange={newTaskChange}
				onKeyDown={addNewTask}
				value={newTask.label || ""}
			/>

			<ul className="tasks">
				{tasks.map((task, index) => (
					<TaskLi
						key={index}
						task={task}
						taskExists={task.label === newTask.label}
						//modifyTask={modifyTask}
						deleteTask={deleteTask}
					/>
				))}
			</ul>
			<div className="pending">{tasks.length} tasks left</div>
			<button className="deleteAll" onClick={deleteTodos}>
				DELETE ALL
			</button>
		</div>
	);
};

export default Tasks;
