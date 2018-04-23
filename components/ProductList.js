import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import ProductDetails from './ProductDetails'

export default class CardListExample extends Component {
  render() {
    const { dataList } = {...this.props}
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            {dataList.map(i => {
              <CardItem>
              <Text>{i.Nom}</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            })}
           </Card>
           <ProductDetails details={i} />
        </Content>
      </Container>
    );
  }
}