import React, { useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ searchTerm, setSearchTerm, deleteTodo, editTodo, data }) => {
	const [searchResults, setSearchResults] = useState([]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		let results = data.filter((item) =>
			item.title.toLowerCase().includes(searchTerm),
		);
		setSearchResults(results);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);

	let todoList = [];
	searchTerm ? (todoList = searchResults) : (todoList = data);

	return (
		<>
			{data < 1 ? (
				<></>
			) : (
				<input
					className={styles.todoInput}
					type="text"
					placeholder="Найти дело"
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			)}
			{todoList.map((todo) => (
				<div key={todo.id} className={styles.todoContainer}>
					<TodoItem
						key={todo.id}
						{...todo}
						editTodo={editTodo}
						deleteTodo={deleteTodo}
					/>
				</div>
			))}
		</>
	);
};

export default TodoList;
