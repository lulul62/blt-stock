import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CategoryList } from '../components/CategoryList';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Consulter le stock',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <CategoryList />
      </ScrollView>
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
