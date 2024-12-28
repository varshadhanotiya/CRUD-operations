import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        setEditingUser(user);
        setUsername(user.username);
        setEmail(user.email);
        setPassword('');
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

    const validateForm = () => {
        if (!username || !email) {
            Alert.alert('Error', 'Please fill out all fields');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return false;
        }

        if (password && password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        const updatedData = {
            ...editingUser,
            username,
            email,
            password: password || editingUser.password,
        };

        try {
            const response = await axios.put(`${API.API_URL}${editingUser.id}`, updatedData);
            if (response.status === 200) {
                const updatedUser = response.data;
                setUsers(
                    users.map((user) =>
                        user.id === updatedUser.id ? updatedUser : user
                    )
                );
                setShowModal(false);
                Alert.alert('Success', 'User updated');
            } else {
                Alert.alert('Error', 'Failed to update user');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to connect to the server');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>

            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.username}</Text>
                        <Text style={styles.tableCell}>{item.email}</Text>

                        <View style={styles.actionButtons}>
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <Text style={styles.actionButton}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Text style={styles.actionButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <Modal visible={showModal} animationType="fade" transparent={true} onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit User</Text>

                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter username"
                            value={username}
                            onChangeText={setUsername}
                        />

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />

                        <Text style={styles.label}>Password (Leave blank to keep unchanged)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <View style={styles.modalActions}>
                            <Button title="Cancel" onPress={() => setShowModal(false)} />
                            <Button title="Save" onPress={handleSave} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableCell: {
        fontSize: 16,
        flex: 1,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 10,
        color: 'blue',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        width: '80%',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
