import React from "react";
import { Accessory } from "../../components/Accessory";

import { BackButton } from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";

import speedSvg from "../../../assets/speed.svg";
import accelerationSvg from "../../../assets/acceleration.svg";
import forceSvg from "../../../assets/force.svg";
import gasolineSvg from "../../../assets/gasoline.svg";
import exchangeSvg from "../../../assets/exchange.svg";
import peopleSvg from "../../../assets/people.svg";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

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
    NavigateEnum,
    ProfileScreenNavigationProp,
} from "../../common/interfaces";

export const CarDetails = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleConfirmation = () => {
        navigation.navigate(NavigateEnum.scheduling);
    };

    return (
        <Container>
            <Header>
                <BackButton />
            </Header>

            <CarImages>
                <ImageSlider
                    imageUrl={[require("../../../assets/carsImages/Audi.png")]}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Accessories>
                    <Accessory name="380km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800 hp" icon={forceSvg} />
                    <Accessory name="Gasolina" icon={gasolineSvg} />
                    <Accessory name="Auto" icon={exchangeSvg} />
                    <Accessory name="2 pessoas" icon={peopleSvg} />
                </Accessories>

                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de
                    lide indultado na praça Real Maestranza de Sevilla. É um
                    belíssimo carro para quem gosta de acelerar.
                </About>
                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de
                    lide indultado na praça Real Maestranza de Sevilla. É um
                    belíssimo carro para quem gosta de acelerar.
                </About>
                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de
                    lide indultado na praça Real Maestranza de Sevilla. É um
                    belíssimo carro para quem gosta de acelerar.
                </About>
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
