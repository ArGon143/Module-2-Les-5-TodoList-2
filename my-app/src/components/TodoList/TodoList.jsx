import React, { useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({
	checkedSortCheckbox,
	setCheckedSortCheckbox,
	searchTerm,
	setSearchTerm,
	deleteTodo,
	editTodo,
	data,
}) => {
	const [searchResults, setSearchResults] = useState([]);

	const [sortTodosState, setSortTodosState] = useState([]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};
	const sortCheckboxChange = () => {
		setCheckedSortCheckbox(!checkedSortCheckbox);
	};

	useEffect(() => {
		let results = data.filter((item) =>
			item.title.toLowerCase().includes(searchTerm),
		);
		setSearchResults(results);
	}, [searchTerm, data]);

	useEffect(() => {
		let sortTodosList;

		if (checkedSortCheckbox === false) {
			sortTodosList = data.sort((a, b) => null);
		} else if (checkedSortCheckbox === true) {
			sortTodosList = data.sort((a, b) => a.title.localeCompare(b.title));
		}
		setSortTodosState(sortTodosList);
	}, [checkedSortCheckbox, data]);

	let todoList;

	if (searchTerm) {
		if (checkedSortCheckbox) {
			let sortSearchResults = searchResults.sort((a, b) =>
				a.title.localeCompare(b.title),
			);
			todoList = sortSearchResults;
		} else todoList = searchResults;
	} else if (checkedSortCheckbox) {
		todoList = sortTodosState;
	} else if (checkedSortCheckbox && searchTerm) {
		todoList = sortTodosState;
	} else todoList = data;

	return (
		<>
			{data < 1 ? (
				<></>
			) : (
				<>
					<input
						className={styles.todoInput}
						type="text"
						placeholder="Найти дело"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<label>
						<input
							type="checkbox"
							checked={checkedSortCheckbox}
							onChange={sortCheckboxChange}
						/>
						Отсортировать дела по алфавиту
					</label>
				</>
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
