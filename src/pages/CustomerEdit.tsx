import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface CustomerData {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
}

const CustomerEdit: React.FC = () => {
    const { empid } = useParams<{ empid: string }>();
    const navigate = useNavigate();

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [status, setStatus] = useState<string>("Active"); // Default status

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/customers/${empid}`);
                const resp: CustomerData = await res.json();
                setId(resp.id);
                setName(resp.name);
                setEmail(resp.email);
                setPhone(resp.phone);
                setStatus(resp.status); // Assuming status is included in the response
            } catch (err) {
                console.log(err instanceof Error ? err.message : err);
            }
        };

        fetchCustomerData();
    }, [empid]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const empdata: CustomerData = { id, name, email, phone, status };

        try {
            await fetch(`http://localhost:8000/customers/${empid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(empdata),
            });
            alert('Saved successfully.');
            navigate('/');
        } catch (err) {
            console.log(err instanceof Error ? err.message : err);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Customer Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                required
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <label>Status</label>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="active"
                                                name="status"
                                                value="Active"
                                                checked={status === "Active"}
                                                onChange={() => setStatus("Active")}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="active" className="form-check-label">Active</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="nonActive"
                                                name="status"
                                                value="Non Active"
                                                checked={status === "Non Active"}
                                                onChange={() => setStatus("Non Active")}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="nonActive" className="form-check-label">Non Active</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                id="lead"
                                                name="status"
                                                value="Lead"
                                                checked={status === "Lead"}
                                                onChange={() => setStatus("Lead")}
                                                className="form-check-input"
                                            />
                                            <label htmlFor="lead" className="form-check-label">Lead</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                            <Link to="/sales/create" className="btn btn-primary ms-2">Create Sale Opportunity</Link>
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
}

export default CustomerEdit;
