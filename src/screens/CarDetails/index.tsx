import React from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    Container,
    Header,
    Details,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Description,
    Accessories,
    Footer,
    CarImages,
} from "./styles";

import {
    ProfileScreenNavigationProp,
    RouteParams,
} from "../../common/interfaces";
import { NavigateEnum } from "../../common/enum";
import { StatusBar, StyleSheet } from "react-native";
import { getAccessoryIcon } from "../../utils/AppUtil";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import theme from "../../styles/theme";

export const CarDetails = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const route = useRoute();

    const { car } = route.params as RouteParams;

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        };
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            ),
        };
    });

    const handleConfirmation = () => {
        navigation.navigate(NavigateEnum.scheduling, {
            car,
        });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <Container>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor="transparent"
                translucent
            />

            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary },
                ]}
            >
                <Header>
                    <BackButton onPress={handleGoBack} />
                </Header>

                <Animated.View style={sliderCarsStyleAnimation}>
                    <CarImages>
                        <ImageSlider imagesUrl={car.photos} />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 170,
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {car.accessories.map((accessory) => (
                        <Accessory
                            key={accessory.name}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button
                    title="Escolher período do aluguel"
                    onPress={handleConfirmation}
                />
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        overflow: "hidden",
        zIndex: 1,
    },
    back: {
        marginTop: 24,
    },
});
