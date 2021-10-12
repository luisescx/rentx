import React from "react";
import { StatusBar, View } from "react-native";

import { Container, Header, HeaderContent, Title } from "./styles";
import Logo from "../../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { CarProps } from "../../common/interfaces";

export const Home = () => {
    const dataCar = {
        brand: "Audi",
        name: "RS 5 Coupé",
        rent: {
            period: "Ao dia",
            price: 5,
        },
        thumbnail: require("../../../assets/carsImages/Audi.png"),
    } as CarProps;

    const dataCar2 = {
        brand: "Audi",
        name: "RS 5 Coupé",
        rent: {
            period: "Ao dia",
            price: 5,
        },
        thumbnail: require("../../../assets/carsImages/Porche.png"),
    } as CarProps;

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
                    <Title>Total de 12 carros</Title>
                </HeaderContent>
            </Header>

            <View style={{ padding: 16 }}>
                <Car data={dataCar} />
                <Car data={dataCar2} />
            </View>
        </Container>
    );
};
