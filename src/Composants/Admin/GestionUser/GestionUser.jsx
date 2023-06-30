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
    phone: '',
    password: '', 
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (!storedToken && storedRole!=='admin') {
      navigate('/Connexion');
    }
  }, [navigate]);
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
      phone: user.phone,
      password: '', // Réinitialiser le champ mot de passe lors de la modification
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
        phone: '',
        password: '',
      });
      window.location.reload();
      alert('Utilisateur mis à jour avec succès !');
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      const response = await axios.post('http://localhost:3001/api/auth/inscription', updatedUser);
      const createdUser = response.data;
      setUsers([...users, createdUser]);
      setShowCreateForm(false);
      setUpdatedUser({
        username: '',
        email: '',
        role: '',
        phone: '',
        password: '',
      });
      window.location.reload();
      alert('Utilisateur ajouté avec succès !');
    } catch (error) {
        alert(error.response.data.error)
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container1">
        <h2>Gestion des utilisateurs</h2>
        {showCreateForm ? (
          <div>
            <h3>Ajouter un utilisateur</h3>
            <form>
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur:</label>
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
                <label htmlFor="phone">Téléphone:</label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={updatedUser.phone}
                  onChange={handleUpdateInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={updatedUser.password}
                  onChange={handleUpdateInputChange}
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary" onClick={addUser}>
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
              <th>Nom d'utilisateur</th>
              <th>Email</th>
              <th>phone</th>
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
                    <input
                      type="text"
                      name="phone"
                      value={updatedUser.phone}
                      onChange={handleUpdateInputChange}
                      className="form-control"
                    />
                  ) : (
                    user.phone                
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
                      <option value="admin">admin</option>
                      <option value="adherent">adherent</option>
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
