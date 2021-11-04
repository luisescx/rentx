import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import {
    Container,
    Header,
    Title,
    RentalPeriodView,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from "./styles";
import ArrowSvg from "../../../assets/arrow.svg";
import { Button } from "../../components/Button";
import Calendar from "../../components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    ProfileScreenNavigationProp,
    RentalPeriod,
    RouteParams,
} from "../../common/interfaces";
import { NavigateEnum } from "../../common/enum";
import { DateObject, MarkedDateProps } from "react-native-calendars";
import { generateInterval } from "../../components/Calendar/generateInterval";
import { getPlatformDate } from "../../utils/AppUtil";
import { format } from "date-fns";

export const Scheduling = () => {
    const [lastSelectedDate, setLastSelectedDate] = useState<DateObject>(
        {} as DateObject
    );
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
        {} as MarkedDateProps
    );
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
        {} as RentalPeriod
    );

    const route = useRoute();
    const { car } = route.params as RouteParams;
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const theme = useTheme();

    const handleConfirmation = () => {
        if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
            Alert.alert("Selecione um período");
        } else {
            navigation.navigate(NavigateEnum.schedulingDetails, {
                car,
                dates: Object.keys(markedDates),
            });
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleChangeDate = (date: DateObject) => {
        let start = lastSelectedDate.timestamp ? lastSelectedDate : date;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            start: start.timestamp,
            startFormatted: format(
                getPlatformDate(new Date(firstDate)),
                "dd/MM/yyyy"
            ),
            end: end.timestamp,
            endFormatted: format(
                getPlatformDate(new Date(endDate)),
                "dd/MM/yyyy"
            ),
        });
    };

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <BackButton onPress={handleGoBack} color={theme.colors.shape} />

                <Title>
                    Escolha uma {"\n"}
                    data de inicio e {"\n"}
                    fim do aluguel
                </Title>

                <RentalPeriodView>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RentalPeriodView>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmation} />
            </Footer>
        </Container>
    );
};
