
import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, Button, Text, View, Icon } from 'native-base';
import { ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import lodash from 'lodash';
import AddProduct from '../components/AddProduct'
import Modal from "react-native-modal";
import ProductList from '../components/ProductList'

export default class LinksScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ink: {},
      furniture: {},
      various: {},
      initialPage : 0,
      isModalVisible: false
    };
  }


  componentWillMount() {
    this.getAllDatas()
  }


  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
    this.getAllDatas()
  };

  /*
   * Get filter data in AsyncStorage
   */
  getEntityByType(param, data) {
    return lodash.filter(data, { 'Categorie': param })
  }

  /**
   * Generic data Call function
   */
    getAllDatas() {
    AsyncStorage.getAllKeys((err, keys) => {
       AsyncStorage.multiGet(keys, (err, stores) => {
        let data = [];
        stores.map(o => {
          data.push(JSON.parse(o[1]))
        })
         this.setState({
          ink:  this.getEntityByType('encres', data),
          furniture:  this.getEntityByType('fourniture', data),
          various:  this.getEntityByType('divers', data)
        })
      });
    });
  }

  refreshComponent = (e) => {
    this.getAllDatas()
  }

  render() {
    return (
      <Container>
      <Tabs initialPage={this.state.initialPage}>
        <Tab heading='Encres'>
         <ProductList data={this.state.ink} />
        </Tab>
        <Tab heading="Fournitures">
        <ProductList data={this.state.furniture} />
        </Tab>
        <Tab heading="Divers">
        <ProductList data={this.state.various} />
        </Tab>
      </Tabs>
      <Button onPress={this._toggleModal} full info>
            <Text> Ajouter un produit</Text>
          </Button>
          <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 0.5, backgroundColor: 'white' }}>
           <AddProduct />
            <Button full onPress={this._toggleModal} light><Text> Fermer </Text></Button>
          </View>
        </Modal>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
