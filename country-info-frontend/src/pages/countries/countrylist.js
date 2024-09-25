import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            console.log("Fetching countries...");
            try {
                const response = await fetch("http://localhost:3000/countries");
                const data = await response.json();
                console.log(data);
                if (Array.isArray(data)) {
                    setCountries(data);
                } else {
                    setError("Data format is incorrect.");
                }
            } catch (error) {
                console.error("Error fetching countries:", error);
                setError("Failed to fetch countries.");
            }
        };

        fetchCountries();
    }, []);

    return (
        <div>
            <h1 className="text-5xl font-bold mb-6 text-center">
                Country List
            </h1>
            {error && <p>{error}</p>}
            <ul className="space-y-2 flex flex-col items-center">
                {countries.map((country) => (
                    <li key={country.countryCode}>
                        <Link
                            to={`/countries/${country.countryCode}`}
                            className="text-xl text-gray-700 hover:text-blue-500"
                        >
                            {country.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;
