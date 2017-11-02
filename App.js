import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {

  //The loggedIn state tells the app whether the user has logged in or not.
  state = { loggedIn: null };

  //Firebase initialize
  componentDidMount() {
    firebase.initializeApp({
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: ''
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }
      else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );

      case false:
        return <LoginForm />;

      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  textStyle: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center'
  }
};

export default App;
