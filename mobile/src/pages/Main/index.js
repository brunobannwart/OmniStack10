import React, { Component } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        currentRegion: {
            latitude: null,
            longitude: null,
            latitudeDelta: null,
            longitudeDelta: null,
        },
        users: [],
        techs: '',
    }

    componentDidMount() {
        this.loadInitialPosition();
    }

    loadInitialPosition = async () => {
        const { granted } = await requestPermissionsAsync();

        if (granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true,
            });

            const { latitude, longitude } = coords;

            const region = {
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            }

            this.setState({ currentRegion: region });
        }
    }

    loadUsers = async () => {
        const { latitude, longitude } = this.state.currentRegion;
        const { techs } = this.state;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs,
            }
        });

        this.setState({
            users: response.data.users,
        });
    }

    handleRegionChanged = (region) => {
        this.setState({ currentRegion: region });
    }

    render() {
        return (
            <>
                <MapView
                    onRegionChangeComplete={this.handleRegionChanged}
                    initialRegion={this.state.currentRegion}
                    style={styles.map}
                >
                    {this.state.users.map(user => (
                        <Marker
                            key={user._id}
                            coordinate={{
                                longitude: user.location.coordinates[0],
                                latitude: user.location.coordinates[1],
                            }}
                        >
                            <Image
                                style={styles.avatar}
                                source={{ uri: user.avatar_url }}
                            />

                            <Callout onPress={
                                () => {
                                    this.props.navigation.navigate('Profile', {
                                        github_username: user.github_username
                                    });
                                }}
                            >
                                <View style={styles.callout}>
                                    <Text styles={styles.userName}>
                                        {user.name}
                                    </Text>
                                    <Text styles={styles.userBio}>
                                        {user.bio}
                                    </Text>
                                    <Text styles={styles.userTechs}>
                                        {user.techs.join(', ')}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>

                <View style={styles.searchForm} >
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Buscar usuários por tecnologias'
                        placeholderTextColor='#999'
                        autoCapitalize='words'
                        autoCorrect={false}
                        value={this.state.techs}
                        onChange={text => this.setState({ techs: text })}
                    />

                    <TouchableOpacity
                        onPress={this.loadUsers}
                        style={styles.loadButton}
                    >
                        <MaterialIcons
                            name='my-location'
                            size={20}
                            color='#FFF'
                        />
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },

    callout: {
        width: 260,
    },

    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    userBio: {
        color: '#666',
        marginTop: 5,
    },

    userTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
})