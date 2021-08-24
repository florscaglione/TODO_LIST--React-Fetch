import { func } from "prop-types";
import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState(["Task", "Task 2"]);
	const [newTask, setNewTask] = useState(" ");

	function newTaskChange(event) {
		setNewTask(event.target.value);
	}

	//añadir tarea
	function addNewTask(event) {
		if (event.key === "Enter") {
			//busco la tarea que escribo para que no la añada si está existe (con findIndex)
			let position = tasks.findIndex(task => task === newTask); //si no la encuentra, devuelve -1
			if (position === -1) {
				//pregunto si no la ha encontrado, entonces la añado
				setTasks([...tasks, newTask]);
				setNewTask(""); //dejo la casilla vacía despues de añadir la tarea
			}
		}
	}

	//borrar tarea
	function deleteTask(indexToRemove) {
		setTasks(tasks.filter((task, index) => index !== indexToRemove));
	}

	return (
		<div className="text-center mt-5">
			<input
				type="text"
				placeholder="New task"
				onChange={newTaskChange}
				onKeyPress={addNewTask}
				value={newTask}
			/>
			<ul className="tasks">
				{tasks.map((task, index) => (
					<li
						className={
							"task" + (task === newTask ? "repeated" : "")
						}
						key={index}>
						<span>{task}</span>
						<button
							className="delete"
							onClick={() => {
								deleteTask(index);
							}}>
							X
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
