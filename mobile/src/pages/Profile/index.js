import React, { Component } from 'react'
import { WebView } from 'react-native-webview';

export default class Profile extends Component {
    render() {
        return (
            <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${ }` }} />
        );
    }
}