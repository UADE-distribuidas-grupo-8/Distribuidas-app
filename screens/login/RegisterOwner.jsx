import {KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {Svg} from "react-native-svg";
import BackgroundSvg from "../../assets/images/background.svg";
import LogoSvg from "../../assets/images/full_logo.svg";
import {useState} from "react";
import {ownerRegister} from "../../service/ownerService";
import useUser from "../../components/context/user/useUser";
import {FadeView} from "react-native-fadeview-wrapper";
import {useTranslation} from "react-i18next";

export const RegisterOwner = ({navigation}) => {
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const {user, changeUser} = useUser()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const register = () => {
        if (password.match(passwordRepeat)){
            setError(false)
            ownerRegister({username, password}).then((res)=> {
                if(res.status === 400){
                    setErrorMessage(res.statusText || "Error de sistema. Intente en unos minutos")
                    setError(true)
                } else {
                    console.log(res)
                    changeUser(res.data)
                    setError(false)
                    navigation.navigate("OwnerNav", "OwnerLanding")
                }
            }).catch(e=>{
                setErrorMessage(e.statusText)
                setError(true)
            })
        } else {
            setError(true)
            setErrorMessage("Las contraseñas no coinciden")
        }
    }

    const goToScreen = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <Svg height={"100%"} width={"100%"}>
                    <BackgroundSvg/>
                </Svg>
            </View>
            <View style={styles.imageContainer}>
                <Svg height={"100%"}  width={"100%"}>
                    <LogoSvg></LogoSvg>
                </Svg>
            </View>
            <FadeView style={[styles.errorContainer]} visible={error}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </FadeView>
            <KeyboardAvoidingView style={styles.inputContainer}>
                <TextInput autoComplete={"username"} clearButtonMode={"while-editing"}
                           onChangeText={(text) => setUsername(text)} placeholderTextColor={"#49515833"}
                           placeholder={"E-mail"} style={styles.input} value={username}/>
                <TextInput autoComplete={"password"} clearButtonMode={"while-editing"} secureTextEntry
                           onChangeText={(text) => setPassword(text)} placeholderTextColor={"#49515833"}
                           placeholder={"Contraseña"} style={styles.input} value={password}/>
                <TextInput autoComplete={"password"} clearButtonMode={"while-editing"} secureTextEntry
                           onChangeText={(text) => setPasswordRepeat(text)} placeholderTextColor={"#49515833"}
                           placeholder={"Repetir contraseña"} style={styles.input} value={passwordRepeat}/>
            </KeyboardAvoidingView>
            <View >
                <Pressable android_ripple={{color:"lightgrey", borderless:false}} onPress={()=>goToScreen("OwnerLogin")}>
                    <Text style={styles.text}>Si ya tenés usuario,
                        <Text style={{color:"red"}}> ¡Ingresa acá!</Text>
                    </Text>
                </Pressable>
                <Pressable android_ripple={{color:"lightgrey", borderless:false}} style={styles.button} onPress={()=> register()}>
                    <Text style={styles.buttonText}>Registrarme</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background : {
        zIndex:-1,
        position:"absolute"
    },
    container:{
        flex:1,
        justifyContent:"space-around",
        alignItems:"center",
        paddingVertical:50
    },
    inputContainer:{
        width:"70%",
        flex:1,
        justifyContent:"flex-end",
        alignItems:"stretch"
    },
    input:{
        flex:1,
        maxHeight:40,
        minHeight:40,
        backgroundColor:"white",
        borderRadius:25,
        elevation:5,
        borderColor:"black",
        borderWidth:1,
        borderStyle:"solid",
        marginTop:15,
        paddingHorizontal:15,
    },
    text:{
        color:"black",
        marginVertical:50,
        textAlign:"center",
    },
    button: {
        textAlign:"center",
        textAlignVertical:"center",
        backgroundColor:"#FFFFFF",
        borderRadius:15,
        padding:5,
        elevation:5
    },
    buttonText:{
        fontSize: 20,
        lineHeight: 36,
        fontWeight: "bold",
        textAlign: "center",
        color:"#ECA62E",
    },
    imageContainer:{
        flex:1
    },
    errorContainer: {
        display:"flex",
        backgroundColor:"#DA4343",
        height:"10%",
        width:"90%",
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10
    },
    errorText:{
        color:"white",
    },
})