import React, { useEffect, useState } from "react";
import { BackHandler, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Header, HeaderContent, Title, CarsList } from "./styles";
import Logo from "../../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { CarDTO, ProfileScreenNavigationProp } from "../../common/interfaces";
import api from "../../services/api";
import { NavigateEnum } from "../../common/enum";
import { Car } from "../../components/Car";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../styles/theme";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring,
} from "react-native-reanimated";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import LoadAnimation from "../../components/LoadAnimation";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export const Home = () => {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setLoading] = useState(true);

    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
            ],
        };
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        },
    });

    const handleCarPress = (car: CarDTO) => {
        navigation.navigate(NavigateEnum.carDetails, { car });
    };

    const handleMyCars = () => {
        navigation.navigate(NavigateEnum.myCars);
    };

    useEffect(() => {
        let isMounted = true;

        async function fetchCars() {
            try {
                const response = await api.get("/cars");

                if (isMounted) {
                    setCars(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
            return true;
        });
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />
                    {!isLoading && (
                        <Title>{`Total de ${cars.length} carros`}</Title>
                    )}
                </HeaderContent>
            </Header>

            {isLoading ? (
                <LoadAnimation />
            ) : (
                <CarsList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Car data={item} onPress={() => handleCarPress(item)} />
                    )}
                />
            )}

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: "absolute",
                            bottom: 13,
                            right: 22,
                        },
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleMyCars}
                        style={[
                            styles.button,
                            { backgroundColor: theme.colors.main },
                        ]}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            size={32}
                            color={theme.colors.background_primary}
                            onPress={handleMyCars}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});
