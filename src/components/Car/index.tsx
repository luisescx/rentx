import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageSourcePropType } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";

import GasolineSvg from "../../../assets/gasoline.svg";
import {
    CarProps,
    NavigateEnum,
    ProfileScreenNavigationProp,
} from "../../common/interfaces";

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

interface Props extends RectButtonProps {
    data: CarProps;
}

export const Car = ({ data }: Props) => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const carImage = data.thumbnail as ImageSourcePropType; // verificar se é possivel tipar direto na interface

    const handleCarPress = () => {
        navigation.navigate(NavigateEnum.carDetails);
    };

    return (
        <Container onPress={handleCarPress}>
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
