/*import React, { useState } from "react";
import PropTypes from "prop-types";

const InputTask = ({ onKeyDown, taskExists, onChange }) => {
	const [newTask, setNewTask] = useState("");

	function newTaskChange(event) {
		setNewTask(event.target.value);
		onChange(event);
	}

	return (
		<input
			className={taskExists ? "error" : ""}
			type="text"
			placeholder="New task"
			onChange={newTaskChange}
			onKeyDown={onKeyDown}
			value={newTask}
		/>
	);
};

InputTask.propTypes = {
	onKeyDown: PropTypes.func,
	onChange: PropTypes.func,
	taskExists: PropTypes.bool
};

export default InputTask;*/
