import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Customer {
    id: string;
    name: string;
    creationDate: string;
    creationTime: string;
    status: string;
}

const CustomerList: React.FC = () => {
    const [filteredData, setFilteredData] = useState<Customer[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Customer; direction: 'ascending' | 'descending' } | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const navigate = useNavigate();

    const LoadDetail = (id: string) => {
        navigate("/customer/detail/" + id);
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch("http://localhost:8000/customers");
                const resp: Customer[] = await res.json();
                setFilteredData(resp);
            } catch (err) {
                console.log(err instanceof Error ? err.message : err);
            }
        };

        fetchCustomers();
    }, []);

    const requestSort = (key: keyof Customer) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    const filteredStatusData = useMemo(() => {
        return sortedData.filter(item => 
            statusFilter === '' || item.status === statusFilter
        );
    }, [sortedData, statusFilter]);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Customer Listing</h2>
                </div>
                <div className="card-body">
                    <select 
                        className="form-select mb-3" 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Non Active">Non Active</option>
                        <option value="Lead">Lead</option>
                    </select>

                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th onClick={() => requestSort('id')}>ID</th>
                                <th onClick={() => requestSort('name')}>Name</th>
                                <th onClick={() => requestSort('creationDate')}>Creation Date</th>
                                <th onClick={() => requestSort('creationTime')}>Creation Time</th>
                                <th onClick={() => requestSort('status')}>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStatusData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.creationDate}</td>
                                    <td>{item.creationTime}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button onClick={() => LoadDetail(item.id)} className="btn btn-primary">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;
