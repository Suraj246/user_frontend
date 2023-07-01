import React, { useEffect, useState } from 'react';
import { countryCodes, country_data } from './country_data';
import axios from 'axios'

const Create = ({ update }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const [countryCode, setCountryCode] = useState('')

    useEffect(() => {
        if (update) {
            setFirstName(update?.firstName)
            setLastName(update?.lastName)
            setEmail(update?.email)
            setMobileNo(update?.mobileNo)
            setAddress1(update?.address1)
            setAddress2(update?.address2)
            setCity(update?.city)
            setZipCode(update?.zipCode)
            setSelectedCountry(update?.country)
            setSelectedState(update?.state)
            setCountryCode(update?.countryCode)
        }
    }, [update])

    const states = selectedCountry
        ? country_data.filter((item) => item?.country_name === selectedCountry) : ''


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (firstName?.length < 5 || lastName?.length < 5) {
            alert('First name and last name should have a minimum of 5 characters.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Mobile number validation
        const mobileRegex = /^\d{10}$/; // only 10 digit number
        if (!mobileRegex.test(mobileNo)) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        // Mandatory validation for address 1
        if (address1?.trim() === '') {
            alert('Please enter a value for Address 1.');
            return;
        }


        // Zip code validation
        const zipCodeRegex = /^\d+$/; // only numbers allowed
        if (!zipCodeRegex.test(zipCode)) {
            alert('Please enter a valid zip code.');
            return;
        }

        try {
            const { data } = await axios.post('https://user-backend-2vns.onrender.com/user/create', { firstName: firstName, lastName: lastName, email: email, mobileNo: mobileNo, address1: address1, address2: address2, city: city, zipCode: zipCode, country: selectedCountry, state: selectedState, countryCode: countryCode })
            // const { data } = await axios.post('http://localhost:4000/user/create', { firstName: firstName, lastName: lastName, email: email, mobileNo: mobileNo, address1: address1, address2: address2, city: city, zipCode: zipCode, country: selectedCountry, state: selectedState, countryCode: countryCode })
            if (data) {
                console.log("user created")
                setFirstName("")
                setLastName("")
                setEmail("")
                setMobileNo("")
                setAddress1("")
                setAddress2("")
                setCity("")
                setZipCode("")
                setSelectedCountry("")
                setSelectedState("")
                setCountryCode("")
            }

        } catch (error) {
            console.log("error creating user", error.message)
        }

    };

    const updateUser = async () => {
        try {
            const { data } = await axios.put(`https://user-backend-2vns.onrender.com/user/update/${update._id}`, { firstName: firstName, lastName: lastName, email: email, mobileNo: mobileNo, address1: address1, address2: address2, city: city, zipCode: zipCode, country: selectedCountry, state: selectedState, countryCode: countryCode })
            console.log(data)
            setFirstName("")
            setLastName("")
            setEmail("")
            setMobileNo("")
            setAddress1("")
            setAddress2("")
            setCity("")
            setZipCode("")
            setSelectedCountry("")
            setSelectedState("")
            setCountryCode("")
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="">

            <h2 className="text-2xl text-center p-5 font-bold">Create User</h2>
            <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow-lg ">

                {/* <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6 bg-white rounded shadow-lg "> */}
                <div className="grid grid-cols-2 gap-4 font-semibold md:grid-cols-1">
                    <div className="mb-4 ">
                        <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="mb-4 w-4/6">
                            <label htmlFor="countryCode" className="block text-gray-700 font-bold mb-2">
                                Country Code
                            </label>
                            <select
                                id="countryCode"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="block w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 leading-tight"
                            >
                                <option value="">Select a country code</option>
                                {countryCodes.map((code, idx) => (
                                    <option key={idx} value={code.code}>
                                        {code.country} ({code.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="mobileNo" className="block text-gray-700 font-bold mb-2">
                                Mobile No
                            </label>
                            <input
                                type="tel"
                                id="mobileNo"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address1" className="block text-gray-700 font-bold mb-2">
                            Address 1
                        </label>
                        <input
                            type="text"
                            id="address1"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address2" className="block text-gray-700 font-bold mb-2">
                            Address 2
                        </label>
                        <input
                            type="text"
                            id="address2"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="country" className="block text-gray-700 font-bold mb-2">
                            Country
                        </label>
                        <select
                            id="country"
                            className="block w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 leading-tight"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                            <option value="">Select a Country...</option>

                            {country_data.map((item, idx) => (
                                <option key={idx} value={item.country_name}>
                                    {item.country_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">

                        <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
                            State
                        </label>

                        <select
                            id="country"
                            className="block w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 leading-tight"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                        >
                            <option value="">Select a state...</option>
                            {states[0]?.states?.map((item, idx) => {
                                return (
                                    <option key={idx} value={item?.state_name}>
                                        {item?.state_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="zipCode" className="block text-gray-700 font-bold mb-2">
                            Zip Code
                        </label>
                        <input
                            type="text"
                            id="zipCode"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                        />
                    </div>

                </div>
                <div className="flex justify-center">
                    {update?.firstName ?
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={updateUser}
                        >
                            Update
                        </button>
                        :
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    }
                </div>

                {/* </form> */}
            </div>

        </div>
    )
}

export default Create
