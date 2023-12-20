import React, { useState } from 'react';

function SortTodos({ sortTodos }) {
	const [checkedSortCheckbox, setCheckedSortCheckbox] = useState(false);

	const sortCheckboxChange = () => {
		setCheckedSortCheckbox(!checkedSortCheckbox);
	};
	return (
		<label>
			<input
				type="checkbox"
				checked={checkedSortCheckbox}
				onChange={sortCheckboxChange}
				onClick={sortTodos}
			/>
			Отсортировать дела по алфавиту
		</label>
	);
}

export default SortTodos;
