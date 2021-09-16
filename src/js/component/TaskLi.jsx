import React from "react";
import PropTypes from "prop-types";

const TaskLi = ({ task, taskExists, modifyTask, deleteTask, index }) => {
	//pongo como parámetros todas las funciones y vbles. que no están definidas en este componente,y luego las defino como propTypes
	return (
		<li className={"task " + (taskExists ? "repeated" : "")}>
			<input
				className="tasksList"
				type="text"
				value={task.label}
				onChange={event => {
					modifyTask(event.target.value, index);
				}}
			/>
			<button
				className="delete"
				onClick={() => {
					deleteTask(index); //le paso la posicion directamente a la fcion. de borrado
				}}>
				<i className="fas fa-trash-alt" />
			</button>
		</li>
	);
};

TaskLi.propTypes = {
	task: PropTypes.object,
	taskExists: PropTypes.bool,
	index: PropTypes.number,
	modifyTask: PropTypes.func,
	deleteTask: PropTypes.func
	//keyPosition: PropTypes.number
};

export default TaskLi;
