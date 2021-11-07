import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS,
} from "react-native-reanimated";
import { Container } from "./styles";
import BrandSvg from "../../../assets/brand.svg";
import LogoSvg from "../../../assets/logo.svg";
import { useNavigation } from "@react-navigation/native";
import { NavigateEnum } from "../../common/enum";
import { ProfileScreenNavigationProp } from "../../common/interfaces";

const Splash = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const splashAnimation = useSharedValue(0);

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                splashAnimation.value,
                [0, 25, 50],
                [1, 0.1, 0]
            ),
            transform: [
                {
                    translateX: interpolate(
                        splashAnimation.value,
                        [0, 50],
                        [0, 75],
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                splashAnimation.value,
                [0, 25, 50],
                [0, 0.3, 1],
                Extrapolate.CLAMP
            ),
            transform: [
                {
                    translateX: interpolate(
                        splashAnimation.value,
                        [0, 50],
                        [-50, 0],
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    });

    const startApp = () => {
        navigation.navigate(NavigateEnum.home);
    };

    useEffect(() => {
        splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
            "worklet";
            runOnJS(startApp)();
        });
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />

            <Animated.View style={[brandStyle, { position: "absolute" }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyle, { position: "absolute" }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    );
};

export default Splash;
