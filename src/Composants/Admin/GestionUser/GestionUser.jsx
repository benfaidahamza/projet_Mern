import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Header/Navbar';

export default function GestionUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        const response = await axios.get('http://localhost:3001/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const storedToken = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      alert('Utilisateur supprimé avec succès !');
    } catch (error) {
      console.error(error);
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    setUpdatedUser({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateUser = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      const response = await axios.put(`http://localhost:3001/api/users/${editingUser._id}`, updatedUser);
      const updatedUserData = response.data;
      const updatedUsers = users.map((user) => (user._id === updatedUserData._id ? updatedUserData : user));
      setUsers(updatedUsers);
      setEditingUser(null);
      setUpdatedUser({
        username: '',
        email: '',
        role: '',
      });
      alert('Utilisateur mis à jour avec succès !');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Gestion des utilisateurs</h2>
        {showCreateForm ? (
          <div>
            <h3>Ajouter un utilisateur</h3>
            <form>
              <div className="form-group">
                <label htmlFor="username">username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleUpdateInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleUpdateInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Rôle:</label>
                <select
                  id="role"
                  name="role"
                  value={updatedUser.role}
                  onChange={handleUpdateInputChange}
                  className="form-select"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <button className="btn btn-primary" >
                Créer
              </button>
            </form>
          </div>
        ) : (
          <button className="btn btn-primary mb-3" onClick={() => setShowCreateForm(true)}>
            Ajouter
          </button>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>username</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {editingUser && editingUser._id === user._id ? (
                    <input
                      type="text"
                      name="username"
                      value={updatedUser.username}
                      onChange={handleUpdateInputChange}
                      className="form-control"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUser && editingUser._id === user._id ? (
                    <input
                      type="text"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleUpdateInputChange}
                      className="form-control"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUser && editingUser._id === user._id ? (
                    <select
                      name="role"
                      value={updatedUser.role}
                      onChange={handleUpdateInputChange}
                      className="form-select"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editingUser && editingUser._id === user._id ? (
                    <button className="btn btn-primary me-2" onClick={updateUser}>
                      Enregistrer
                    </button>
                  ) : (
                    <button className="btn btn-primary me-2" onClick={() => editUser(user)}>
                      Modifier
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
