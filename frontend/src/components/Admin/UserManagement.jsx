import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser, updateUser, deleteUser, fetchUsers } from "../../redux/slices/adminSlice.js"

const UserManagement = () => {


    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { users, loading, error } = useSelector((state) => state.admin);


    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate])




    useEffect(() => {
        if (user && user.role === "admin") {
            dispatch(fetchUsers())
        }
    },[dispatch, user])



    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, 
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addUser(formData))

        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
        })
    }


    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUser({ id: userId, role: newRole }))
    }



    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId))
        }
    }



    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                <h2 className="md:text-4xl text-2xl font-bold mb-6">User Management</h2>

                {loading && <p>Loading... </p>}
                {error && <p>Error: {error} </p>}



                {/* Add New User Form */}
                <div className="p-6 rounded-lg mb-6">

                    <h3 className="text-xl font-bold mb-4 text-gray-600">Add New User</h3>



                    <form onSubmit={handleSubmit}>


                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-xl border-gray-500"
                                required
                            />
                        </div>


                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-xl border-gray-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border  border-gray-500 rounded-xl"
                                required
                            />
                        </div>


                        <div className="mb-4">
                            <label className="block text-gray-700">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-500 rounded-xl">
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-teal-500 text-white py-2 px-4  hover:bg-topbar  rounded-xl cursor-pointer  scale-105  ">
                            Add User
                        </button>
                    </form>
                </div>


                {/* user list management */}
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="min-w-full text-left text-gray-500">
                        <thead className=" bg-gray-200 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.name}
                                    </td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="p-2 border border-gray-500 rounded-xl"
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-700 text-white px-5 py-2 rounded-2xl cursor-pointer hover:bg-red-500">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>

            <div className='flex items-center md:items-end  justify-center m-8 md:text-lg text-sm text-topbar cursor-pointer hover:translate-y-0.5 hover:text-gray-300 font-semibold'>
                <Link
                    to="/admin">
                    Back to Dashboard
                </Link>
            </div>
        </>
    )
}

export default UserManagement
