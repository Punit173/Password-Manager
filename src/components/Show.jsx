import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const Show = () => {
    const [visibleIndexes, setVisibleIndexes] = useState([]);
    const [data, setData] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("data")) || [];
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return [];
        }
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({ url: '', name: '', pass: '' });

    const togglePasswordVisibility = (index) => {
        setVisibleIndexes((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditedItem(data[index]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        const newData = data.map((item, index) => (index === editIndex ? editedItem : item));
        setData(newData);
        localStorage.setItem("data", JSON.stringify(newData));
        setEditIndex(null);
    };

    const handleDelete = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
        localStorage.setItem("data", JSON.stringify(newData));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Stored Passwords</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">URL</th>
                            <th className="py-3 px-6 text-left">Username</th>
                            <th className="py-3 px-6 text-left">Password</th>
                            <th className="py-3 px-6 text-left">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                name="url"
                                                value={editedItem.url}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 p-1"
                                            />
                                        ) : (
                                            item.url
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editedItem.name}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 p-1"
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                name="pass"
                                                value={editedItem.pass}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 p-1"
                                            />
                                        ) : visibleIndexes.includes(index) ? (
                                            item.pass
                                        ) : (
                                            '••••••'
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {editIndex === index ? (
                                            <button onClick={handleSaveEdit} className="hover-shake mr-2">
                                                Save
                                            </button>
                                        ) : (
                                            <>
                                                <button className="hover-shake mr-2" onClick={() => handleEditClick(index)}>
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </button>
                                                <button className="hover-shake mr-2" onClick={() => togglePasswordVisibility(index)}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                                <button className="hover-shake" onClick={() => handleDelete(index)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Show;
