import React, { useState, useEffect } from "react";
import { Accessory } from "../../components/Accessory";

import { BackButton } from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    ProfileScreenNavigationProp,
    RentalPeriod as RentalPeriodType,
    RouteParams,
} from "../../common/interfaces";
import { NavigateEnum } from "../../common/enum";
import { getAccessoryIcon, getPlatformDate } from "../../utils/AppUtil";
import { format } from "date-fns";
import { Alert, StatusBar } from "react-native";
import api from "../../services/api";

export const SchedulingDetails = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodType>(
        {} as RentalPeriodType
    );

    const route = useRoute();
    const { car, dates } = route.params as RouteParams;

    const rentTotal = Number(dates.length * car.rent.price);
    const handleConfirmRent = async () => {
        const schedulesByCar = await api.get(`/schedules_bycar/${car.id}`);

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
        ];

        api.post("schedules_byuser", {
            user_id: 1,
            car,
        });

        api.put(`/schedules_bycar/${car.id}`, {
            id: car.id,
            unavailable_dates,
        })
            .then(() => navigation.navigate(NavigateEnum.schedulingComplete))
            .catch(() =>
                Alert.alert("Não foi possível confirmar o agendamento")
            );
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        setRentalPeriod({
            startFormatted: format(
                getPlatformDate(new Date(dates[0])),
                "dd/MM/yyyy"
            ),
            endFormatted: format(
                getPlatformDate(new Date(dates[dates.length - 1])),
                "dd/MM/yyyy"
            ),
        });
    }, []);

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
                    {car.accessories.map((accessory) => {
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />;
                    })}
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
                        <DateValue>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetail>
                        <RentalPriceQuote>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuote>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
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
