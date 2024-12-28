import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserModal from './modals/UserModal'; 

export default function HomeScreen() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isCreateMode, setIsCreateMode] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API.API_URL}`);
                setUsers(response.data);
            } catch (error) {
                Alert.alert('Error', 'Failed to load users');
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setIsCreateMode(false);
        setEditingUser(user);
        setShowModal(true);
    };

    const handleCreate = () => {
        setIsCreateMode(true);
        setEditingUser(null);  
        setShowModal(true);
    };

    const handleDelete = (userId) => {
        Alert.alert(
            'Delete User',
            'Are you sure you want to delete this user?',
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const response = await axios.delete(`${API.API_URL}${userId}`);
                            if (response.status === 200) {
                                setUsers(users.filter((user) => user.id !== userId));
                                Alert.alert('Success', 'User deleted');
                            } else {
                                Alert.alert('Error', 'Failed to delete user');
                            }
                        } catch (error) {
                            Alert.alert('Error', 'Failed to connect to server');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleSave = async (username, email, password) => {
        if (!username || !email) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }

        const userData = {
            username,
            email,
            password: password || editingUser.password
        };

        try {
            const response = isCreateMode
                ? await axios.post(`${API.API_URL}`, userData)
                : await axios.put(`${API.API_URL}${editingUser.id}`, { ...editingUser, ...userData });

            if (response.status === 200 || response.status === 201) {
                const savedUser = response.data;
                if (isCreateMode) {
                    setUsers([...users, savedUser]);
                } else {
                    setUsers(users.map((user) => (user.id === savedUser.id ? savedUser : user)));
                }
                setShowModal(false);
                Alert.alert('Success', isCreateMode ? 'User created' : 'User updated');
            } else {
                Alert.alert('Error', isCreateMode ? 'Failed to create user' : 'Failed to update user');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to connect to the server');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
            <Text style={{ textAlign: 'center', marginTop: 24, fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                Home Screen
            </Text>

            <Button title="Create User" onPress={handleCreate} style={{ marginBottom: 20 }} />

            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.username}</Text>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.email}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <Icon name="edit" size={24} color="blue" style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Icon name="delete" size={24} color="red" style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <UserModal
                showModal={showModal}
                setShowModal={setShowModal}
                userData={editingUser}
                isCreateMode={isCreateMode}
                handleSave={handleSave}
            />
        </View>
    );
}
