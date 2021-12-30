import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../components/Button";
import { Alert } from "react-native";
import * as Yup from "yup";
import { User } from "../../common/interfaces";

const Profile = () => {
    const { user, signOut, updateUser } = useAuth();

    const [profileEdit, setProfileEdit] = useState(ProfileEdit.DATA_EDIT);
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverlicense] = useState(user.driverLicense);

    const theme = useTheme();
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleAvatarSelect = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        if (result["uri"]) {
            setAvatar(result["uri"]);
        }
    };

    const handleProfileUpdate = async () => {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required("CNH é obrigatória"),
                name: Yup.string().required("Nome é obrigatório"),
            });

            const data = { name, driverLicense };
            await schema.validate(data);

            const updatedUser = {
                id: user.id,
                name,
                driverLicense,
                avatar,
            } as User;

            await updateUser(updatedUser);

            Alert.alert("Usuário atualizado");
        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                Alert.alert("Opa", e.message);
                return;
            }
            Alert.alert("Não foi possível atualizar o perfil");
        }
    };

    const handleSignOut = () => {
        Alert.alert(
            "Tem certeza?",
            "Se você sair, irá precisar de internet para conectar-se novamente",
            [
                {
                    text: "Cancelar",
                    onPress: () => {},
                },
                {
                    text: "Sair",
                    onPress: () => signOut(),
                },
            ]
        );
    };

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener("blur", () => {
                setAvatar(user.avatar);
                setName(user.name);
                setDriverlicense(user.driverLicense);
            });

            return unsubscribe;
        }, [])
    );

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
                        {!!avatar && <Photo source={{ uri: avatar }} />}

                        <PhotoButton onPress={handleAvatarSelect}>
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
                                value={name}
                                onChangeText={setName}
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
                                value={driverLicense}
                                onChangeText={setDriverlicense}
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

                    <Button
                        title="Salvar alterações"
                        onPress={handleProfileUpdate}
                    />
                </Content>
            </Container>
        </KeyboardAvoidingWrapper>
    );
};

export default Profile;
