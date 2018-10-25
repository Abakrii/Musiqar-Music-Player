import React , {Component} from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import  DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import OfflineNotice from "../../components/OfflineNotice/OffilneNotice";
import backgroundImage from "../../assets/darkone.jpg";
import {Button} from 'react-native-elements';
import validate from "../../utility/validation";
import {connect} from 'react-redux';
import {tryAuth , authAutoSignIn , fbAuth}  from '../../store/actions/index';

console.disableYellowBox = true;

class AuthScreen extends Component{
    constructor(props){
        super(props);
        Dimensions.addEventListener("change" ,this.updateStyles);
    }
    state={
        viewMode : Dimensions.get("window").height>500 ? "portrait": "landscape",
        authMode:"login",
        controls:{
            email:{
                value:"",
                valid: false,
                validationRules:{
                    isEmail: true
                },
                touched: false
            },
            password:{
                value:"",
                valid: false,
                validationRules:{
                    minLength: 6
                },
                touched: false
            },
            userName:{
                    value:"",
                valid: false,
                validationRules:{
                isName : true
                },
                touched: false

            },

        }
    };
    componentDidMount() {
        this.props.onAutoSignIn();



    }

    static navigatorStyle = {
        navBarHidden: true
    };

    /*****
     *  after return to the default body of screen (portrait)
     */
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);

    };


    /****
     *
     * @param dims  operators conditions ,, update view mode from portorat to landscape by window height
     */
    updateStyles =(dims)=>{
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape",
        });
    };

       switchAuthModeHandler = ()=>{
            this.setState(prevState=>{
                return{
                    authMode: prevState.authMode==="login" ? "signup" : "login"

};

});
};

    /********
     * When onPress Login
     */
    authHandler = ( ) =>{
             if (!this.state.controls.email.valid || !this.state.controls.password.valid) {
      return alert("Please check Your Inputs And Try again");
    }
        const  authData ={
            email:this.state.controls.email.value,
            password:this.state.controls.password.value,
            userName : this.state.controls.userName.value
        };
        this.props.onTryAuth(authData ,this.state.authMode );
    };
    /*****
     *
     * @param key identifer my contorls like email , password , ...
     * @param value
     */
    updateInputState = (key, value) => {
        const { user } = this.state;
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                        ),
                        touched: true
                    }
                }
            };
        });
    };
    render(){
        let userNameInput = null;
        let headingText= null;
        let submitButton1 = (
            <Button
                onPress={this.authHandler}
               title='SUBMIT'
                activeOpacity={1}
                underlayColor="transparent"
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonTitleStyle}
                >
            </Button>
        );
        if(this.state.viewMode==="portrait"){
            headingText=(
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }
        if(this.props.isLoading){
            submitButton1 = <ActivityIndicator/>;
        }

    if(this.state.authMode==="signup"){
                            userNameInput=(
                            <DefaultInput
                                placeholder="Your User Name"
                                placeholderTextColor="white"
                                style={styles.input}
                                value={this.state.controls.userName.value}
                                onChangeText={val => this.updateInputState("userName", val)}
                                valid={this.state.controls.userName.valid}
                                touched={this.state.controls.userName.touched}
                                autoCorrect={false}

                            />
                            );
                        }
        return(
            <ImageBackground source={backgroundImage}   style={styles.backgroundImage}>
                    <OfflineNotice/>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    {headingText}
                     <ButtonWithBackground
                    onPress={this.switchAuthModeHandler}
                >
                         <Text  style={{color: 'white'}}> Switch To {this.state.authMode==="login" ? "signup" : "login"} </Text>
                </ButtonWithBackground>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


                        <View style={styles.inputContainer}>
                            {userNameInput}
                            <DefaultInput
                                placeholder="Your E-mail address"
                                placeholderTextColor="white"
                                          style={styles.input}
                                          value={this.state.controls.email.value}
                                          onChangeText={val=>this.updateInputState("email",val)}
                                          valid={this.state.controls.email.valid}
                                          touched={this.state.controls.email.touched}
                                          autoCorrect={false}
                                          keyboardType="email-address"
                            />
                            <View style={this.state.viewMode==="portrait" ||
                            this.state.authMode==="login"
                                ? styles.portraitPasswordContainer
                                : styles.landscapePasswordContainer}>
                                    <DefaultInput
                                        placeholder="Password"
                                                  placeholderTextColor="white"
                                                  style={styles.input}
                                                  value={this.state.controls.password.value}
                                                  onChangeText={val=>this.updateInputState("password",val)}
                                                  valid={this.state.controls.password.valid}
                                                  touched={this.state.controls.password.touched}
                                                  secureTextEntry
                                    />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {submitButton1}

                   <View style={{paddingVertical: 5}}/>
                    <Text style={{color: 'white'}}>Or</Text>
<View style={{paddingVertical: 5}}/>

                       {/*<ButtonWithBackground*/}
                    {/*onPress={this.switchToFbModeHandler}*/}
                {/*>*/}
                         {/*<Text  style={{color: 'white'}}> Switch To {this.state.authMode==="login" ? "facebookAuth" : "login"} </Text>*/}
                {/*</ButtonWithBackground>*/}
                      <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
           onPress={this.loginWithFacebook}
            {...iconStyles}
          >

             facebook Login

          </Icon.Button>


                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}
const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};
const styles = StyleSheet.create({
    backgroundImage:{
        width:"100%",
        flex:1,

    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    inputContainer:{
        width:"80%",

    },
    input:{
        borderColor:"#bbb",
        color: 'white',

    },
    portraitPasswordContainer:{
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    landscapePasswordContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    buttonStyle:{height: 50,
        width: 250,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#E6E6FA',
        borderRadius: 30
    },
    buttonContainerStyle: {
            marginVertical: 10
        },
    buttonTitleStyle: {
        color:'white'},
});

const mapStateToProps = state =>{
    return{
        isLoading :state.ui.isLoading
    }  ;
};

const mapDispatchToProps = dispatch=>{
    return{
        onTryAuth:(authData , authMode)=> dispatch(tryAuth(authData, authMode)),
        onAutoSignIn:()=> dispatch(authAutoSignIn())
    };
};
export default connect(mapStateToProps ,mapDispatchToProps)(AuthScreen);

