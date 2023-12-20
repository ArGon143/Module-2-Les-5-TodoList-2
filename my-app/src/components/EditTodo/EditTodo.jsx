import React, { useState } from 'react';
import styles from './EditTodo.module.css';
import Button from '../Button/Button';

function EditTodo({ editTodo, handleEdit, ...props }) {
	const [isEditTodo, setisEditTodo] = useState(props.title);

	const handleChange = (event) => {
		setisEditTodo(event.target.value);
	};

	const handleEditTodo = () => {
		editTodo(props.id, isEditTodo);
	};

	return (
		<>
			<input
				className={styles.todoInput}
				type="text"
				autoFocus
				name={props.id}
				defaultValue={props.title}
				onChange={handleChange}
			/>
			<Button onClick={handleEditTodo} titleButton="Сохранить" />
			<Button onClick={handleEdit} titleButton="Отмена" />
		</>
	);
}

export default EditTodo;
