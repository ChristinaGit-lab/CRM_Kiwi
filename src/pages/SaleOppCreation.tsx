import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SaleOppCreation: React.FC = () => {
    const { customerId } = useParams<{ customerId: string }>(); // Get customerId from URL parameters
    const [saleName, setSaleName] = useState<string>("");
    const [opportunity, setOpportunity] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("New"); // Default to "New"
    const navigate = useNavigate();
    const [validation, setValidation] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const saleData = { 
            saleName, 
            opportunity, 
            status: selectedStatus, 
            customerID: customerId // Include customerId
        };

        fetch("http://localhost:8000/sales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(saleData),
        })
        .then(() => {
            navigate(-1);
        })
        .catch((err) => {
            console.error('Failed to save sale opportunity:', err.message);
        });
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Create Sale Opportunity</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Sale Name</label>
                                            <input
                                                required
                                                value={saleName}
                                                onMouseDown={() => setValidation(true)}
                                                onChange={e => setSaleName(e.target.value)}
                                                className="form-control"
                                            />
                                            {saleName.length === 0 && validation && (
                                                <span className="text-danger">Enter the sale name</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Opportunity</label>
                                            <textarea
                                                required
                                                value={opportunity}
                                                onChange={e => setOpportunity(e.target.value)}
                                                className="form-control"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <label>Status</label>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="new"
                                                name="status"
                                                value="New"
                                                checked={selectedStatus === "New"}
                                                onChange={() => setSelectedStatus("New")}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="new" className="form-check-label">New</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="closedWon"
                                                name="status"
                                                value="Closed Won"
                                                checked={selectedStatus === "Closed Won"}
                                                onChange={() => setSelectedStatus("Closed Won")}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="closedWon" className="form-check-label">Closed Won</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="closedLost"
                                                name="status"
                                                value="Closed Lost"
                                                checked={selectedStatus === "Closed Lost"}
                                                onChange={() => setSelectedStatus("Closed Lost")}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="closedLost" className="form-check-label">Closed Lost</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <button type="button" className="btn btn-danger" onClick={() => navigate(-1)}>Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SaleOppCreation;
