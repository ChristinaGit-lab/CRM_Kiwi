import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface CustomerData {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface SaleData {
    id: string;
    saleName: string;
    opportunity: string;
    status: string;
}

const CustomerDetails: React.FC = () => {
    const { cusid } = useParams<{ cusid: string }>();
    const [cusdata, setCusdata] = useState<CustomerData | null>(null);
    const [salesData, setSalesData] = useState<SaleData[]>([]);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/customers/${cusid}`);
                const resp: CustomerData = await res.json();
                setCusdata(resp);
            } catch (err) {
                console.log(err instanceof Error ? err.message : err);
            }
        };

        const fetchSalesData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/sales?customerID=${cusid}`);
                const sales: SaleData[] = await res.json();
                setSalesData(sales);
            } catch (err) {
                console.log(err instanceof Error ? err.message : err);
            }
        };

        fetchCustomerData();
        fetchSalesData();
    }, [cusid]);

    return (
        <div className="container">
            <div className="card row" style={{ textAlign: "left" }}>
                <div className="card-title">
                    <h2 className="customer-title">Customer Details</h2>
                </div>
                <div className="card-body">
                    {cusdata ? (
                        <div>
                            <h3 className="customer-name">
                                <strong>Customer Name:</strong> {cusdata.name}
                            </h3>
                            <h3 className="customer-id">
                                <strong>Customer ID:</strong> {cusdata.id}
                            </h3>
                            <h3 className="contact-info">
                                <strong>Email:</strong> {cusdata.email}
                            </h3>
                            <h3 className="contact-info">
                                <strong>Phone:</strong> {cusdata.phone}
                            </h3>
                        </div>
                    ) : (
                        <p>Loading customer details...</p>
                    )}
                    <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
                    <div className="mt-4">
                        <h3>Sales Opportunities</h3>
                        {salesData.length > 0 ? (
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th>Sale Name</th>
                                        <th>Opportunity</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesData.map(sale => (
                                        <tr key={sale.id}>
                                            <td>{sale.saleName}</td>
                                            <td>{sale.opportunity}</td>
                                            <td>{sale.status}</td>
                                            <td>
                                                <Link to={`/sales/edit/${sale.id}`} className="btn btn-warning">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No sales opportunities found.</p>
                        )}
                    </div>
                    <Link to={`/sales/create/${cusid}`} className="btn btn-primary mb-2">
                        Add Sale Opportunity
                    </Link>
                    <Link className="btn btn-danger" to="/">Back to Listing</Link>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
