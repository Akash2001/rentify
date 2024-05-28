import { useEffect, useState } from "react";
import axios from 'axios';
import { PropertyComponent } from "../components/property.component";

export const Seller = ({ user, setUser }) => {
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [properties, setProperties] = useState([]);
    const [property, setProperty] = useState({
        title: "",
        place: "",
        area: 0,
        bedrooms: 0,
        bathrooms: 0,
        hospitalsNearby: 0,
        collegesNearby: 0,
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/properties/${user._id}`)
            .then(response => setProperties(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser({});
    }

    const handleAddProperty = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/properties/${user._id}`, {
            ...property,
            owner: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        })
            .then(response => setProperties([...properties, response.data]))
            .catch(error => console.error(error));
    }

    return (
        <div className="p-4">
            <div className="flex gap-4 items-center justify-center">
                <div className="text-xl font-bold">Welcome, {user.firstName} {user.lastName}</div>
                <button className="bg-blue-600 px-2 py-1 rounded-lg mt-2 text-white" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="border border-black rounded-lg mt-2 w-[60%] mx-auto">
                <div className="font-bold">Add property</div>
                <div className="flex flex-col gap-2 p-4 items-center">
                    <div className="flex justify-center gap-4 w-full">
                        <div className="w-[50%] flex flex-col gap-1">
                            <label className="text-xs text-left ml-1" htmlFor="title">Title</label>
                            <input id="title" className="w-full border border-black p-1 rounded-lg" type="text"
                                value={property.title} onChange={(e) => setProperty({ ...property, title: e.target.value })} />
                        </div>
                        <div className="w-[50%] flex flex-col gap-1">
                            <label className="text-xs text-left ml-1" htmlFor="place">Address</label>
                            <input id="place" className="w-full border border-black p-1 rounded-lg" type="text"
                                value={property.place} onChange={(e) => setProperty({ ...property, place: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="w-[25%] flex flex-col gap-1">
                            <label className="text-xs text-left ml-1" htmlFor="bedrooms">No of bedrooms</label>
                            <input id="bedrooms" className="w-full border border-black p-1 rounded-lg" type="number"
                                value={property.bedrooms} onChange={(e) => setProperty({ ...property, bedrooms: e.target.value })} />
                        </div>
                        <div className="w-[25%] flex flex-col gap-1">
                            <label className="text-xs text-left ml-1" htmlFor="bathrooms">No of bathrooms</label>
                            <input id="bathrooms" className="w-full border border-black p-1 rounded-lg" type="number"
                                value={property.bathrooms} onChange={(e) => setProperty({ ...property, bathrooms: e.target.value })} />
                        </div>
                        <div className="w-[25%] flex flex-col gap-1">
                            <label className="text-xs text-left ml-1" htmlFor="hospitals">Nearby hospitals</label>
                            <input id="hospitals" className="w-full border border-black p-1 rounded-lg" type="number"
                                value={property.hospitalsNearby} onChange={(e) => setProperty({ ...property, hospitalsNearby: e.target.value })} />
                        </div>
                        <div className="w-[25%] flex flex-col gap-1">
                            <label className="text-xs text-left ml-1" htmlFor="colleges">Nearby colleges</label>
                            <input id="college" className="w-full border border-black p-1 rounded-lg" type="number"
                                value={property.collegesNearby} onChange={(e) => setProperty({ ...property, collegesNearby: e.target.value })} />
                        </div>
                    </div>
                    <button className="p-1 bg-blue-600 text-white rounded-lg w-fit" onClick={handleAddProperty}>Submit</button>
                </div>
            </div>
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