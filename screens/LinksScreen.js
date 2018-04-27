
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
      values: {}
    };
  }


  componentDidMount() {
    this.fetchInitialData()
  }

  /**
   * Fetch initial app data
   */
  fetchInitialData() {
    this.getAllDatas().then(res => this.setState({
      ink: this.getEntityByType('encres'),
      furniture: this.getEntityByType('fourniture'),
      various: this.getEntityByType('divers')
    }))
    console.log(this.state, 'state')
  }

  /**
   * Get filter data in AsyncStorage
   */
  getEntityByType(param) {
    return lodash.filter(this.state.values, { 'Categorie': param })
  }

  /**
   * Generic data Call function
   */
  async getAllDatas() {
    await AsyncStorage.getAllKeys((err, keys) => {
      await AsyncStorage.multiGet(keys, (err, stores) => {
        let data = [];
        stores.map(o => {
          data.push(JSON.parse(o[1]))
        })
        this.setState({ values: data })
      });
    });
  }

  refreshComponent = e => {
    this.fetchInitialData()
  }


  static navigationOptions = {
    title: 'Consulter le stock',
  };


  render() {
    return (
      <Container>
        <Tabs initialPage={1}>
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
        <Button onPress={(e) => this.refreshComponent(e)}>
          <Text>Refresh</Text>
        </Button>
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
