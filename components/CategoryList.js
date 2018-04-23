import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import lodash from 'lodash'
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import ProductList from './ProductList'

​export default class TabsExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ink: {},
      furniture: {},
      various: {},
      values: {}
    };
  }

  componentWillMount() {
    this.fetchInitialData()
  }

  /**
   * Fetch initial app data
   */
  async fetchInitialData() {
    this.setState({
      ink: await this.getEntityByType('encres'),
      furniture: await this.getEntityByType('fourniture'),
      various: await this.getEntityByType('divers')
    })
  }

  /**
   * Get filter data in AsyncStorage
   */
  getEntityByType(param) {
    return lodash.filter(this.getAllDatas(), {'Categorie': param})
  }

  /**
   * Generic data Call function
   */
  getAllDatas = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
         return stores
      });
    });
  }


  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs initialPage={1}>
          <Tab heading="Encres">
            <ProductList />
          </Tab>
          <Tab heading="Fournitures">
            <ProductList />
          </Tab>
          <Tab heading="Divers">
            <ProductList />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}