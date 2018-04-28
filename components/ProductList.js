import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Right, Body, Left, View, Button, Form, Item, Input } from 'native-base';
import {TouchableOpacity} from 'react-native'
import Modal from "react-native-modal";

export default class DynamicListExample extends Component {

    state = {
     isModalVisible: false,
     selectedProduct: {}
    };
  

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    const {...items} = this.props
    return (
      <Container style={{marginTop: 10}}>
        <Content>
          <List dataArray={items.data}

            renderRow={(item) =>
             <ListItem onPress={this._toggleModal} avatar style={{marginBottom: 10}}>
              <Left>
                <Thumbnail  source={{ uri: 'https://preview.ibb.co/hJQO8c/451b9db3d936af95f168610422583c07.jpg' }} />
              </Left>
              <Body>
                <Text>{item.Nom}</Text>
                <Text note>Quantité : {item.Quantité}</Text>
              </Body>
            </ListItem>
            }>
          </List>
        </Content>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 0.5, backgroundColor: 'white' }}>
          <Form>
            <Item>
              <Input  value={this.state.selectedProduct.Quantité} keyboardType='numeric' placeholder="Editer la quantité" />
            </Item>
          </Form>
            <Button  onPress={this._toggleModal} warning><Text> Fermer </Text></Button>
            <Button  onPress={this._toggleModal} primary><Text> Enregistrer </Text></Button>
          </View>
        </Modal>
      </Container>
    );
  }
}