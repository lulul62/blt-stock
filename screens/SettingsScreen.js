import React from 'react';
import AddProduct from '../components/AddProduct';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Ajouter un produit',
    };

    render() {
        return <AddProduct/>;
    }
}
