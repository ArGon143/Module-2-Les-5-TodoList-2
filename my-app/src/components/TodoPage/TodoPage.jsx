import React, { useEffect, useState } from 'react';
import styles from './TodosPage.module.css';
import todosImg from './todos100x100.png';
import TodoList from '../TodoList/TodoList';
import CreatingTodo from '../CreatingTodo/CreatingTodo';
import SortTodos from '../SortTodos/SortTodos';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);
	const [refreshTodosList, setRefreshTodosList] = useState(false);

	const [isCreatingTodo, setIsCreatingTodo] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdatingTodo, setIsUpdatingTodo] = useState(false);
	const [isDeletingTodo, setIsDeletingTodo] = useState(false);

	const [isSortTodos, setIsSortTodos] = useState(false);

	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [refreshTodosList, isUpdatingTodo]);

	const editTodo = (id, isEditTodo) => {
		setIsUpdatingTodo(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: isEditTodo }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело отредактировано', response);
				setRefreshTodosList(!refreshTodosList);
			})
			.finally(() => setIsUpdatingTodo(false));
	};

	const sortTodos = () => {
		if (isSortTodos === false) {
			setTodos(todos.slice().sort((a, b) => a.title.localeCompare(b.title)));
			setIsSortTodos(true);
		} else {
			fetch('http://localhost:3005/todos')
				.then((loadedData) => loadedData.json())
				.then((loadedTodos) => {
					setTodos(loadedTodos);
				});
			setIsSortTodos(false);
		}
	};

	const creatingNewTodo = (inputValue) => {
		setIsCreatingTodo(true);
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: inputValue,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Новое дело добавлено. Ответ сервера:', response);
				setRefreshTodosList(!refreshTodosList);
			})

			.finally(() => {
				setIsCreatingTodo(false);
			});
	};

	const deleteTodo = (id) => {
		setIsDeletingTodo(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело удалено', response);
				setRefreshTodosList(!refreshTodosList);
			})
			.finally(() => {
				setIsDeletingTodo(false);
			});
	};

	return (
		<main className={styles.TodoPage}>
			<section className={styles.PageHeader}>
				<img src={todosImg} alt="todos" />
				<h1 className={styles.TitlePageHeader}>Список дел</h1>
			</section>
			<section className={styles.formContainer}>
				<CreatingTodo
					creatingNewTodo={creatingNewTodo}
					isCreatingTodo={isCreatingTodo}
				/>
				{todos.length !== 0 && todos.length > 1 ? (
					<SortTodos sortTodos={sortTodos} />
				) : (
					<></>
				)}
			</section>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<TodoList
					data={todos}
					editTodo={editTodo}
					deleteTodo={deleteTodo}
					isDeletingTodo={isDeletingTodo}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}
		</main>
	);
};

export default TodoPage;
