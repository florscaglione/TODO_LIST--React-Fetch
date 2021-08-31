import React from "react";
import PropTypes from "prop-types";

const TaskLi = ({ task, taskExists, index, modifyTask, deleteTask }) => {
	//pongo como parámetros todas las funciones y vbles. que no están
	return (
		//definidas en este componente,y luego las defino como propTypes
		<li className={"task " + (taskExists ? "repeated" : "")}>
			<input
				className="tasksList"
				type="text"
				value={task}
				onChange={event => {
					modifyTask(event.target.value, index);
				}}
			/>
			<button
				className="delete"
				onClick={() => {
					deleteTask(index); //le paso la posicion directamente a la fcion. de borrado
				}}>
				X
			</button>
		</li>
	);
};

TaskLi.propTypes = {
	task: PropTypes.string,
	taskExists: PropTypes.bool,
	index: PropTypes.number,
	modifyTask: PropTypes.func,
	deleteTask: PropTypes.func
};

export default TaskLi;
