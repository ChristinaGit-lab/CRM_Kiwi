import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SaleOppEdit: React.FC = () => {
    const { saleId } = useParams<{ saleId: string }>(); // Get the sale ID from the URL
    const navigate = useNavigate();

    const [saleName, setSaleName] = useState<string>("");
    const [opportunity, setOpportunity] = useState<string>("");
    const [status, setStatus] = useState<string>("Active"); // Default status

    useEffect(() => {
        // Fetch the specific sale by ID
        fetch(`http://localhost:8000/sales/${saleId}`)
            .then((res) => res.json())
            .then((resp) => {
                setSaleName(resp.saleName); // Set values from response
                setOpportunity(resp.opportunity);
                setStatus(resp.status);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [saleId]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const saleData = { saleName, opportunity, status }; // Only send the status

        fetch(`http://localhost:8000/sales/${saleId}`, { // Adjust to the correct endpoint
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(saleData),
        })
            .then((res) => {
                if (res.ok) {
                    navigate(-1);
                } else {
                    throw new Error('Failed to update status');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Edit Sale Opportunity Status</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Sale Name</label>
                                            <input
                                                value={saleName}
                                                disabled
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Opportunity</label>
                                            <input
                                                value={opportunity}
                                                onChange={(e) => setOpportunity(e.target.value)} 
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <label>Status</label>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="New"
                                                name="status"
                                                value="New"
                                                checked={status === "New"}
                                                onChange={() => setStatus("New")}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="New" className="form-check-label">New</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="ClosedWon"
                                                name="status"
                                                value="Closed Won"
                                                checked={status === "Closed Won"}
                                                onChange={() => setStatus("Closed Won")}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="ClosedWon" className="form-check-label">Closed Won</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="ClosedLost"
                                                name="status"
                                                value="Closed Lost"
                                                checked={status === "Closed Lost"}
                                                onChange={() => setStatus("Closed Lost")}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="ClosedLost" className="form-check-label">Closed Lost</label>
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

export default SaleOppEdit;
