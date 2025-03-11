import * as React from 'react';
import { useState, useEffect } from 'react';

export default function Pagination() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 10 items per page

    const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employeeResponse = await fetch(URL);
                const employeeData = await employeeResponse.json();
                setData(employeeData);
            } catch (error) {
                console.error("Failed to fetch data");
            }
        };
        fetchEmployeeData();
    }, []);

    // Calculate the indices for the slice
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <>
            <div className='heading'>
            <h2>Employee Data Table</h2>
            </div>

<div className='table'>
            <table>
            <div className='table-heading'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
            </div>

            <div className='table-body'>
                <tbody>
                    {currentItems.map((empData) => (
                        <tr key={empData.id}>
                            <td>{empData.id}</td>
                            <td>{empData.name}</td>
                            <td>{empData.email}</td>
                            <td>{empData.role}</td>
                        </tr>
                    ))}
                </tbody>
            </div>
            </table>
            </div>

            <div className='button'>
                <button
                    style={{backgroundColor:" #06ae92"}}
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    type="text">
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button 
                    style={{backgroundColor:" #06ae92"}}
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                    type="text">
                    Next
                </button>
            </div>
        </>
    );
}
