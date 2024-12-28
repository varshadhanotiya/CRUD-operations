import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal } from 'react-native';

const UserModal = ({ showModal, setShowModal, userData, isCreateMode, handleSave }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (userData) {
            setUsername(userData.username || '');
            setEmail(userData.email || '');
            setPassword('');
        }
    }, [userData]);

    return (
        <Modal visible={showModal} animationType="fade" transparent={true} onRequestClose={() => setShowModal(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{isCreateMode ? 'Create User' : 'Edit User'}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={isCreateMode ? "Password" : "Password (Leave blank to keep unchanged)"}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <View style={styles.modalActions}>
                        <Button title="Cancel" onPress={() => setShowModal(false)} />
                        <Button title="Save" onPress={() => handleSave(username, email, password)} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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

export default UserModal;
