import React, { useState } from "react";
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
    Content,
    Options,
    Option,
    OptionTitle,
} from "./styles";
import { BackButton } from "../../components/BackButton";
import { Feather } from "@expo/vector-icons";
import { ProfileEdit } from "../../common/enum";

const Profile = () => {
    const [profileEdit, setProfileEdit] = useState(ProfileEdit.DATA_EDIT);

    const theme = useTheme();
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSignOut = () => {
        console.log("SignOut");
    };

    const handleProfileEdit = () => {
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

            <Content>
                <Options>
                    <Option
                        onPress={() => setProfileEdit(ProfileEdit.DATA_EDIT)}
                        active={profileEdit === ProfileEdit.DATA_EDIT}
                    >
                        <OptionTitle
                            active={profileEdit === ProfileEdit.DATA_EDIT}
                        >
                            Dados
                        </OptionTitle>
                    </Option>
                    <Option
                        onPress={() =>
                            setProfileEdit(ProfileEdit.PASSWORD_EDIT)
                        }
                        active={profileEdit === ProfileEdit.PASSWORD_EDIT}
                    >
                        <OptionTitle
                            active={profileEdit === ProfileEdit.PASSWORD_EDIT}
                        >
                            Trocar senha
                        </OptionTitle>
                    </Option>
                </Options>
            </Content>
        </Container>
    );
};

export default Profile;
