import React, { Component } from "react";
import {
	KeyboardAvoidingView,
	StyleSheet,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	Text,
	Button
} from "react-native";
import { StackNavigator, SafeAreaView } from "react-navigation";

// import { Icon } from "react-native-elements";
import firebase from "react-native-firebase";
import LoginForm from "./loginForm";
import SignUpForm from "./signUpForm";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: false,
			user: null,
			signUpPressed: false
		};

		this.handleOnTryLogin = this.handleOnTryLogin.bind(this);
		this.handleOnTrySignUp = this.handleOnTrySignUp.bind(this);
	}

	handleOnTryLogin(credentials) {
		firebase
			.auth()
			.signInAndRetrieveDataWithEmailAndPassword(
				credentials.id,
				credentials.pwd
			)
			.then(data => {
				this.setState(
					{
						auth: true,
						user: data.user
					},
					() => {
						console.log(this.state);
					}
				);
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
			});
	}

	handleOnTrySignUp({ pressed }) {
		// console.log(pressed)
		this.setState({
			signUpPressed: pressed
		});
	}
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.loginContainer}>
					<Image
						resizeMode="center"
						style={styles.logo}
						source={require("../../images/BAULogoicon.png")}
					/>
				</View>
				<View>
					{!this.state.auth &&
						!this.state.signUpPressed && (
							<LoginForm
								onTrySignUp={this.handleOnTrySignUp}
								onTryLogin={this.handleOnTryLogin}
							/>
						)}
					{this.state.signUpPressed && <SignUpForm />}
					{this.state.auth && (
						<Text>Welcome {this.state.user.email}</Text>
					)}
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const LoginStack = StackNavigator(
	{
		Login: { screen: LoginForm },
		SignUp: { screen: SignUpForm }
	},
	{
		header: ({ goBack }) => ({
			left: <Text onPress={() => goBack()}>Back</Text>
		})
	}
);

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2c3e50"
	},
	loginContainer: {
		alignItems: "center",
		flexGrow: 1,
		justifyContent: "center"
	},
	logo: {
		position: "absolute",
		width: 300,
		height: 100
	},
	buttonContainer: {
		backgroundColor: "#2980b6",
		paddingVertical: 15
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		fontWeight: "700"
	}
});
