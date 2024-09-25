import React from "react";
import { Link } from "react-router-dom";

const BorderCountries = ({ borderCountries }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Border Countries</h2>
            <ul className="list-disc pl-5 hover:text-blue-500">
                {borderCountries && borderCountries.length > 0 ? (
                    borderCountries.map((country) => (
                        <li
                            className="text-lg text-gray-700 hover:text-blue-500"
                            key={country.countryCode}
                        >
                            <Link to={`/countries/${country.countryCode}`}>
                                {country.commonName}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>There are no border countries.</p>
                )}
            </ul>
        </div>
    );
};

export default BorderCountries;
