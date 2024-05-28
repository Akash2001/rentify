import { useEffect, useState } from "react";
import axios from 'axios';
import { PropertyComponent } from "../components/property.component";

export const Buyer = ({ user, setUser }) => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/properties/all`)
            .then(response => setProperties(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser({});
    }

    return (
        <div className="p-4">
            <div className="text-xl font-bold">Welcome, {user.firstName} {user.lastName}</div>
            <button className="bg-blue-600 px-2 py-1 rounded-lg mt-2 text-white" onClick={handleLogout}>
                Logout
            </button>
            <div className="grid grid-cols-3 gap-2 py-4">
                {properties.map((property) => {
                    return (
                        <PropertyComponent data={property} />
                    )
                })}
            </div>
        </div>
    )
}