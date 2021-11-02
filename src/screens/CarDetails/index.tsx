import React from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    Container,
    Header,
    CarImages,
    Content,
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
} from "./styles";

import {
    ProfileScreenNavigationProp,
    RouteParams,
} from "../../common/interfaces";
import { NavigateEnum } from "../../common/enum";
import { StatusBar } from "react-native";
import { getAccessoryIcon } from "../../utils/AppUtil";

export const CarDetails = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const route = useRoute();

    const { car } = route.params as RouteParams;

    const handleConfirmation = () => {
        navigation.navigate(NavigateEnum.scheduling);
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

            <Header>
                <BackButton onPress={handleGoBack} />
            </Header>

            <CarImages>
                <ImageSlider imageUrl={car.photos} />
            </CarImages>

            <Content>
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

                <About>{car.about}</About>
            </Content>

            <Footer>
                <Button
                    title="Escolher período do aluguel"
                    onPress={handleConfirmation}
                />
            </Footer>
        </Container>
    );
};
