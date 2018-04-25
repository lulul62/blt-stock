
import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, Button, Text } from 'native-base';
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


  componentDidMount() {
    this.fetchInitialData()
  }

  /**
   * Fetch initial app data
   */
   fetchInitialData() {
    this.getAllDatas()
      this.setState({
        ink:  this.getEntityByType('encres'),
        furniture:  this.getEntityByType('fourniture'),
        various:  this.getEntityByType('divers')
      })
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
   getAllDatas() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        let data = [];
        stores.map(o => {
          data.push(JSON.parse(o[1]))
        })
         this.setState({values: data})
      });
    });
  }

  refreshComponent = (e) => {
    this.fetchInitialData()
  }


  static navigationOptions = {
    title: 'Consulter le stock',
  };
  

  render() {
    return (
      <Container>
        <Button onPress={(e) => this.refreshComponent(e) }>
            <Text>Click Me! </Text>
          </Button>
      <Tabs initialPage={1}>
        <Tab heading='Encres'>
          {this.state.ink}
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
