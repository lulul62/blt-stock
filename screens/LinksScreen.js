
import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, Button, Text } from 'native-base';
import { ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import lodash from 'lodash';
import ProductList from '../components/ProductList'

export default class LinksScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ink: {},
      furniture: {},
      various: {},
      initialPage : 0
    };
  }


  componentWillMount() {
    this.getAllDatas()
  }

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


  static navigationOptions = {
    title: 'Consulter le stock',
  };
  

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
