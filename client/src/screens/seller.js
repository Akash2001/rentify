import { useEffect, useState } from "react";
import axios from 'axios';
import { PropertyComponent } from "../components/property.component";

export const Seller = ({ user, setUser }) => {
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/${user._id}`)
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
                        <PropertyComponent isSeller={true} data={property} />
                    )
                })}
            </div>
        </div>
    )
}