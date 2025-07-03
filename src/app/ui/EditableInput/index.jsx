// EditableInput
// required inputs: initialValue, label, onChange
// optional inputs: type, placeholder, className, name
// This component allows users to edit an input field with a save button
// and handles different view sizes for responsive design.

'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function EditableInput({
	initialValue,
	label,
	type = 'text',
	placeholder = '',
	className = '',
	onChange,
	name,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(initialValue);
	const [viewSize, setViewSize] = useState('sm');

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		if (onChange) {
			onChange(value, name);
		}
		console.log('Saved value:', value);
		setIsEditing(false);
	};

	useEffect(() => {
		const updateViewSize = () => {
			if (window.innerWidth < 768) {
				setViewSize('sm');
			} else if (window.innerWidth < 1024) {
				setViewSize('md');
			} else {
				setViewSize('lg');
			}
		};

		window.addEventListener('resize', updateViewSize);
		updateViewSize();

		return () => {
			window.removeEventListener('resize', updateViewSize);
		};
	}, []);

	return (
		<div
			className={`${className} grid grid-cols-2 md:grid-cols-5 items-center gap-4`}>
			{viewSize === 'sm' ? (
				<div className="col-span-2">
					{isEditing ? (
						<button
							onClick={handleSave}
							className="mx-2 bg-blue text-white rounded-lg p-2 col-span-1">
							Save
						</button>
					) : (
						<FontAwesomeIcon
							icon={faEdit}
							className="mx-2 cursor-pointer col-span-1 "
							onClick={handleEditClick}
						/>
					)}
					<label htmlFor={label} className="font-semibold col-span-1">
						{label}:{' '}
					</label>

					<input
						type={type}
						value={value}
						// onChange={handleChange}
						placeholder={placeholder}
						className="border-2 border-gray-300 rounded-lg p-2 w-full col-span-3"
						disabled={!isEditing}
                        onChange={(e) => setValue(e.target.value)}
					/>
				</div>
			) : (
				<>
					<label htmlFor={label} className="font-semibold col-span-1">
						{label}:{' '}
					</label>
					<input
						type={type}
						value={value}
						// onChange={handleChange}
						placeholder={placeholder}
						className="border-2 border-gray-300 rounded-lg p-2 w-full col-span-3"
						disabled={!isEditing}
                        onChange={(e) => setValue(e.target.value)}
					/>
					{isEditing ? (
						<button
							onClick={handleSave}
							className="ml-2 bg-blue text-white rounded-lg p-2 col-span-1">
							Save
                            
						</button>
					) : (
						<FontAwesomeIcon
							icon={faEdit}
							className="ml-2 cursor-pointer col-span-1"
							onClick={handleEditClick}
						/>
					)}
				</>
			)}
		</div>
	);
}
