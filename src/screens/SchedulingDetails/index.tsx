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
import { Feather } from "@expo/vector-icons";

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
    Description,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetail,
    RentalPriceQuote,
    RentalPriceTotal,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../common/interfaces";
import { NavigateEnum } from "../../common/enum";

export const SchedulingDetails = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleConfirmRent = () => {
        navigation.navigate(NavigateEnum.schedulingComplete);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <Container>
            <Header>
                <BackButton onPress={handleGoBack} />
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

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetail>
                        <RentalPriceQuote>R$ 580 x3 diárias</RentalPriceQuote>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    </RentalPriceDetail>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title="Alugar Agora"
                    color={theme.colors.success}
                    onPress={handleConfirmRent}
                />
            </Footer>
        </Container>
    );
};
