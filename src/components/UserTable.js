import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserTable = ({ setUpdate }) => {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const user = async () => {
            try {
                // const { data } = await axios.get('http://localhost:4000')
                const { data } = await axios.get('https://user-backend-2vns.onrender.com')
                setContacts(data?.usersInfo)
            } catch (error) {
                console.log(error.message)
            }
        }
        user()
    }, [contacts])

    const updateUser = async (user) => {
        setUpdate(user)
    }

    const deleteUser = async (id) => {
        try {
            const { data } = await axios.delete(`https://user-backend-2vns.onrender.com/user/delete/${id}`)
            console.log(data)

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Contact Table</h2>
            <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-start">First Name</th>
                            <th className="py-2 px-4 border-b text-start">Last Name</th>
                            <th className="py-2 px-4 border-b text-start">Email ID</th>
                            <th className="py-2 px-4 border-b text-start">Mobile No</th>
                            <th className="py-2 px-4 border-b text-start">Address 1</th>
                            <th className="py-2 px-4 border-b text-start">Address 2</th>
                            <th className="py-2 px-4 border-b text-start">State</th>
                            <th className="py-2 px-4 border-b text-start">City</th>
                            <th className="py-2 px-4 border-b text-start">Country</th>
                            <th className="py-2 px-4 border-b text-start">Zip Code</th>
                            <th className="py-2 px-4 border-b text-start">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts?.map((contact, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <td className="py-2 px-4 border-b">{contact?.firstName}</td>
                                <td className="py-2 px-4 border-b">{contact?.lastName}</td>
                                <td className="py-2 px-4 border-b">{contact?.email}</td>
                                <td className="py-2 px-4 border-b">{contact?.mobileNo}</td>
                                <td className="py-2 px-4 border-b">{contact?.address1}</td>
                                <td className="py-2 px-4 border-b">{contact?.address2}</td>
                                <td className="py-2 px-4 border-b">{contact?.state}</td>
                                <td className="py-2 px-4 border-b">{contact?.city}</td>
                                <td className="py-2 px-4 border-b">{contact?.country}</td>
                                <td className="py-2 px-4 border-b">{contact?.zipCode}</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                            onClick={() => updateUser(contact)}
                                        >Upload</button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-md"
                                            onClick={() => deleteUser(contact._id)}
                                        >Delete</button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
