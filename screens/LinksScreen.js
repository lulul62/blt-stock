
import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import lodash from 'lodash';

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


  async componentWillMount() {
    this.fetchInitialData()
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
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
    return lodash.filter(this.getAllDatas(), { 'Categorie': param })
  }

  /**
   * Generic data Call function
   */
  getAllDatas() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        return stores
      });
    });
  }


  static navigationOptions = {
    title: 'Consulter le stock',
  };
  

  render() {
    return (
      <Container>
      <Tabs initialPage={1}>
        <Tab heading='Encres'>
          
        </Tab>
        <Tab heading="Fournitures">
         
        </Tab>
        <Tab heading="Divers">
         
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
