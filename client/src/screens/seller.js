import { useEffect, useState } from "react";
import axios from 'axios';
import { PropertyComponent } from "../components/property.component";

export const Seller = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/properties/${user._id}`)
            .then(response => setProperties(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="p-4">
            <div className="text-xl font-bold">Welcome, {user.firstName} {user.lastName}</div>
            <div className="grid grid-cols-3 gap-2 py-4">
                {properties.map((property) => {
                    return(
                        <PropertyComponent isSeller={true} data={property} />
                    )
                })}
            </div>
        </div>
    )
}