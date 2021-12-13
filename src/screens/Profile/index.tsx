import React from "react";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
} from "./styles";
import { BackButton } from "../../components/BackButton";
import { Feather } from "@expo/vector-icons";

const Profile = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSignOut = () => {
        console.log("SignOut");
    };

    return (
        <Container>
            <Header>
                <HeaderTop>
                    <BackButton
                        color={theme.colors.shape}
                        onPress={handleGoBack}
                    />

                    <HeaderTitle>Editar Perfil</HeaderTitle>

                    <LogoutButton onPress={handleSignOut}>
                        <Feather
                            name="power"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </LogoutButton>
                </HeaderTop>

                <PhotoContainer>
                    <Photo
                        source={{ uri: "https://github.com/luisescx.png" }}
                    />

                    <PhotoButton onPress={handleSignOut}>
                        <Feather
                            name="camera"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </PhotoButton>
                </PhotoContainer>
            </Header>
        </Container>
    );
};

export default Profile;
