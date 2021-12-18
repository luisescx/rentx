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
    Section,
} from "./styles";
import { BackButton } from "../../components/BackButton";
import { Feather } from "@expo/vector-icons";
import { ProfileEdit } from "../../common/enum";
import Input from "../../components/Input";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useAuth } from "../../hooks/auth";

const Profile = () => {
    const [profileEdit, setProfileEdit] = useState(ProfileEdit.DATA_EDIT);

    const theme = useTheme();
    const navigation = useNavigation();
    const { user } = useAuth();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSignOut = () => {
        console.log("SignOut");
    };

    return (
        <KeyboardAvoidingWrapper>
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

                <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                    <Options>
                        <Option
                            onPress={() =>
                                setProfileEdit(ProfileEdit.DATA_EDIT)
                            }
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
                                active={
                                    profileEdit === ProfileEdit.PASSWORD_EDIT
                                }
                            >
                                Trocar senha
                            </OptionTitle>
                        </Option>
                    </Options>

                    {profileEdit === ProfileEdit.DATA_EDIT ? (
                        <Section>
                            <Input
                                iconName="user"
                                placeholder="Nome"
                                autoCorrect={false}
                                defaultValue={user.name}
                            />
                            <Input
                                iconName="mail"
                                editable={false}
                                autoCorrect={false}
                                defaultValue={user.email}
                            />
                            <Input
                                iconName="credit-card"
                                placeholder="CNH"
                                keyboardType="numeric"
                                defaultValue={user.driverLicense}
                            />
                        </Section>
                    ) : (
                        <Section>
                            <Input
                                iconName="lock"
                                placeholder="Senha atual"
                                autoCorrect={false}
                                editable={false}
                            />
                            <Input
                                iconName="lock"
                                placeholder="Nova senha"
                                autoCorrect={false}
                            />
                            <Input
                                iconName="lock"
                                placeholder="Repetir senha"
                                autoCorrect={false}
                            />
                        </Section>
                    )}
                </Content>
            </Container>
        </KeyboardAvoidingWrapper>
    );
};

export default Profile;
