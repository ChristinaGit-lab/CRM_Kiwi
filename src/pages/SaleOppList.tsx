import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SaleOpportunity {
    saleName: string;
    opportunity: string;
    status: string;
}

const SaleOppList: React.FC = () => {
    const [saledata, setSaleData] = useState<SaleOpportunity[]>([]);
    const [filteredData, setFilteredData] = useState<SaleOpportunity[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof SaleOpportunity; direction: 'ascending' | 'descending' } | null>(null);
    const navigate = useNavigate();

    const LoadDetail = (saleName: string) => {
        navigate("/sale/detail/" + saleName); 
    };

    const LoadEdit = (saleName: string) => {
        navigate("/sale/edit/" + saleName); 
    };

    useEffect(() => {
        fetch("http://localhost:8000/sales") 
            .then((res) => res.json())
            .then((resp: SaleOpportunity[]) => {
                setSaleData(resp);
                setFilteredData(resp); 
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const requestSort = (key: keyof SaleOpportunity) => {
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

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Sale Opportunities Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/sale/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th onClick={() => requestSort('saleName')}>Sale Name</th>
                                <th onClick={() => requestSort('opportunity')}>Opportunity</th>
                                <th onClick={() => requestSort('status')}>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map(item => (
                                <tr key={item.saleName}>
                                    <td>{item.saleName}</td>
                                    <td>{item.opportunity}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button onClick={() => LoadEdit(item.saleName)} className="btn btn-success">Edit</button>
                                        <button onClick={() => LoadDetail(item.saleName)} className="btn btn-primary">Details</button>
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

export default SaleOppList;
