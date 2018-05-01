import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Thumbnail, Right, Body, Left, View, Button, Form, Item, Input, Icon } from 'native-base';
import { TouchableOpacity, AsyncStorage } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import message from '../constants/Message'
import Modal from "react-native-modal";

export default class DynamicListExample extends Component {

  state = {
    isModalVisible: false,
    selectedProduct: {}
  };

  async setNewVal() {
    try {
      const update = await AsyncStorage.setItem(this.state.selectedProduct.Nom, JSON.stringify(this.state.selectedProduct));
      this.refs.toast.show(message.product.successUpdateProduct);
    } catch (error) { }
  }

  async deleteProduct(item) {
    try {
      const update = await AsyncStorage.removeItem(item.Nom);
      this.refs.toast.show(message.product.successDeleteProduct);
    } catch (error) { 
    }
  }


  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    const { ...items } = this.props
    return (
      <Container style={{ marginTop: 10 }}>
        <Content>
          <List dataArray={items.data}

            renderRow={(item) =>
              <ListItem  avatar style={{ marginBottom: 10 }}>
                <Left>
                  <Thumbnail source={{ uri: 'https://preview.ibb.co/hJQO8c/451b9db3d936af95f168610422583c07.jpg' }} />
                </Left>
                <Body>
                  <Text>{item.Nom}</Text>
                  <Text note>Quantité : {item.Quantité}</Text>
                </Body>
                <Right>
                <Text note><Icon onPress={() => this.deleteProduct(item)} name='trash' /> <Icon onPress={this._toggleModal} name='settings' /></Text>
              </Right>
              </ListItem>
            }>
          </List>
        </Content>
        <Toast position='top' ref="toast" />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 0.5, backgroundColor: 'white' }}>
            <Form>
              <Item>
                <Input value={this.state.selectedProduct.Quantité} keyboardType='numeric' placeholder="Editer la quantité" />
              </Item>
            </Form>
            <Button onPress={this._toggleModal} warning><Text> Fermer </Text></Button>
            <Button onPress={this._toggleModal} primary><Text> Enregistrer </Text></Button>
          </View>
        </Modal>
      </Container>
    );
  }
}