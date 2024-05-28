import { useState } from "react";

export const PropertyComponent = ({ data, isSeller = false }) => {
    const [showOwner, setShowOwner] = useState(false);

    return (
        <div className="border border-gray-600 p-2 rounded-lg">
            <div className="font-bold py-2">{data.title}</div>
            <div>Address: {data.place}</div>
            <div>No of bedrooms: {data.bedrooms}</div>
            <div>No of bathrooms: {data.bathrooms}</div>
            <div>Nearby hospitals: {data.hospitalsNearby}</div>
            <div>Nearby colleges: {data.collegesNearby}</div>
            {isSeller ? (<></>) : (
                <button className="bg-blue-600 text-white p-1 mt-2 rounded-lg "onClick={()=> setShowOwner(!showOwner)}>
                    I'm interesetd
                </button>
            )}
            {showOwner ? (
                <div className="mt-4">
                    <div>Owner details</div>
                    <div>Phone Number : {data.owner.phoneNumber}</div>
                    <div>Email : {data.owner.email}</div>
                    <div>Name : {data.owner.firstName} {data.owner.lastName}</div>
                </div>
            ) : (<></>)}
        </div>
    )
}