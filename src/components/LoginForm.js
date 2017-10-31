import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {

  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state; //Destructure the email & password from state

    this.setState({ error: '', loading: true });

    //Sign in method with a catch
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.onLoginSuccess())
      .catch(() => {
        //Sign up method with a catch
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => this.onLoginSuccess())
          .catch(() => this.onLoginFailure());
      });
  }

  onLoginSuccess() {
    this.setState({ email: '', password: '', loading: false });
  }

  onLoginFailure() {
    this.setState({ error: 'Authentication failed.', loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner spinnerSize={'small'} />;
    }
    return (
      <Button onPress={() => this.onButtonPress()}>
        Log In
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email" placeholder="user@domain.com" onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password" placeholder="paßword" onChangeText={password => this.setState({ password })}
            value={this.state.password} secureTextEntry
          />
        </CardSection>

        { /* This will only appear if the user fails to log in */}
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;