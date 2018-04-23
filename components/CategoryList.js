import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import ProductList from './ProductList'

​export default class TabsExample extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs initialPage={1}>
          <Tab heading="Tab1">
          <ProductList />
          </Tab>
          <Tab heading="Tab2">
          <ProductList />
          </Tab>
          <Tab heading="Tab3">
          <ProductList />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}