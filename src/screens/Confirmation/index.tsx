import React from "react";
import { useWindowDimensions } from "react-native";
import LogoSvg from "../../../assets/logo_background_gray.svg";
import DoneSvg from "../../../assets/done.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Content, Title, Message, Footer } from "./styles";
import { StatusBar } from "react-native";
import ConfirmButton from "../../components/ConfirmButton";
import {
    ProfileScreenNavigationProp,
    RouteParams,
} from "../../common/interfaces";

const Confirmation = () => {
    const { width } = useWindowDimensions();

    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const route = useRoute();

    const { confirmation } = route.params as RouteParams;

    const { title, message, nextScreenRoute } = confirmation;

    const handleConfirmRent = () => {
        navigation.navigate(nextScreenRoute);
    };

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>{title}</Title>

                <Message>{message}</Message>
            </Content>

            <Footer>
                <ConfirmButton title={"OK"} onPress={handleConfirmRent} />
            </Footer>
        </Container>
    );
};

export default Confirmation;
