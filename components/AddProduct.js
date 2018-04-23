import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native';
import t from 'tcomb-form-native';
import message from '../constants/Message'
import Toast, { DURATION } from 'react-native-easy-toast'


let Form = t.form.Form;
const category = t.enums({
    divers: 'divers',
    fourniture: 'fourniture',
    encres: 'encres'
});
let Product = t.struct({
    Nom: t.String,
    Categorie: category,
    Quantité: t.Number,
});

export default class AddProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {
                Nom: '',
                Catégorie: '',
                Quantité: 0
            }
        };
    }
    /**
     * Handle input user
     */
    onPress = (e) => {
        const value = this.refs.form.getValue();
        this.saveEntity(value)
    }

    /**
     * Save entity in database
     */
    async saveEntity(value) {
        if (!value) {
            return this.refs.toast.show(message.product.emptyFormString);
        }
        if (this.entityExist(value.Nom) === false) {
            this.refs.toast.show(message.product.redondantProduct);
        }
        else {
            try {
                await AsyncStorage.setItem(value.Nom, JSON.stringify(value));
                this.refs.toast.show(message.product.successSaveProduct);
            } catch (error) {
                this.refs.toast.show(message.product.errorSaveProduct);
            }
        }
    }
    /**
     * Check if entity exist
     * @param {String} key 
     */
    entityExist(key) {
        AsyncStorage.getItem(key, (err, result) => {
            if (result) {
                return false
            }
            return true
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref="form"
                    type={Product}
                />
                <TouchableHighlight style={styles.button} onPress={e => this.onPress(e)} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Enregistrer le produit</Text>
                </TouchableHighlight>
                <Toast position='top' ref="toast" />
            </View>
        );
    }
}

styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});
