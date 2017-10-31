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
      apiKey: 'AIzaSyAzQg4e-z-3HU91X77zXuyIq-2Hcez_FpA',
      authDomain: 'auth-app-6g6s6.firebaseapp.com',
      databaseURL: 'https://auth-app-6g6s6.firebaseio.com',
      projectId: 'auth-app-6g6s6',
      storageBucket: 'auth-app-6g6s6.appspot.com',
      messagingSenderId: '655203981464'
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