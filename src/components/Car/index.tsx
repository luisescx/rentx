import React from "react";
import { ImageSourcePropType } from "react-native";

import GasolineSvg from "../../../assets/gasoline.svg";
import { CarProps } from "../../common/interfaces";

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from "./styles";

interface Props {
    data: CarProps;
}

export const Car = ({ data }: Props) => {
    const carImage = data.thumbnail as ImageSourcePropType; // verificar se é possivel tipar direto na interface

    return (
        <Container>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg />
                    </Type>
                </About>
            </Details>

            <CarImage source={carImage} resizeMode="contain" />
        </Container>
    );
};
