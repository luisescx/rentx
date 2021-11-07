import React, { useState, useEffect } from "react";
import { StatusBar, FlatList } from "react-native";
import { MyCar, ProfileScreenNavigationProp } from "../../common/interfaces";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from "./styles";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { AntDesign } from "@expo/vector-icons";
import { Loading } from "../../components/Loading";

const MyCars = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [myCars, setMyCars] = useState<MyCar[]>([]);

    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const theme = useTheme();

    const handleGoBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/schedules_byuser?user_id=1");

                setMyCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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
                    Seus agendamentos, {"\n"}
                    estão aqui
                </Title>

                <SubTitle>Conforto, segurança e praticidade</SubTitle>
            </Header>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Appointments>
                        <AppointmentsTitle>
                            Agendamentos Feitos
                        </AppointmentsTitle>
                        <AppointmentsQuantity>
                            {myCars.length}
                        </AppointmentsQuantity>
                    </Appointments>

                    <FlatList
                        data={myCars}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />

                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>
                                            {item.startDate}
                                        </CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>
                                            {item.endDate}
                                        </CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                </Content>
            )}
        </Container>
    );
};

export default MyCars;
