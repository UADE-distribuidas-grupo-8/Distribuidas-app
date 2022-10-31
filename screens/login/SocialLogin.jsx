import {Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Svg} from "react-native-svg";
import BackgroundSvg from "../../assets/background.svg";
import LogoSvg from "../../assets/full_logo.svg";

export const SocialLogin = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <Svg height={"100%"} width={"100%"}>
                    <BackgroundSvg/>
                </Svg>
            </View>
            <View style={styles.logo}>
                <Svg>
                    <LogoSvg/>
                </Svg>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.overflowFix}>
                    <Pressable style={styles.button} android_ripple={{color:"lightgrey", borderless:false}}>
                        <Text style={styles.text}>Soy dueño</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background : {
        zIndex:-1,
        position:"absolute"
    },

    overflowFix:{
        borderRadius:25,
        overflow:"hidden",
        elevation: 5,
        shadowColor: '#52006A',
        marginTop:20,
    },

    logo:{
        width:"60%"
    },

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },

    image: {
    },

    text: {
        fontSize: 20,
        lineHeight: 36,
        fontWeight: "bold",
        textAlign: "center",
        color:"#ECA62E",
    },

    buttonContainer: {
        width:"60%",
    },

    button: {
        textAlign:"center",
        textAlignVertical:"center",
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        padding:5,

    }
});
