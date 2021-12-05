import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useTheme } from "styled-components";
import { NavigateEnum } from "../../../common/enum";
import {
    ProfileScreenNavigationProp,
    RouteParams,
} from "../../../common/interfaces";
import { BackButton } from "../../../components/BackButton";
import Bullet from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import Input from "../../../components/Input";
import KeyboardAvoidingWrapper from "../../../components/KeyboardAvoidingWrapper";
import api from "../../../services/api";

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle,
} from "./styles";

const SignUpSecondStep = () => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const theme = useTheme();
    const route = useRoute();

    const { user } = route.params as RouteParams;

    const handleBack = () => {
        navigation.goBack();
    };

    const handleConfirm = async () => {
        if (!password || !passwordConfirm) {
            return Alert.alert("Informe a senha e a confirmação dela.");
        }

        if (password !== passwordConfirm) {
            return Alert.alert("As senhas não são iguais");
        }

        await api
            .post("/users", {
                name: user.name,
                email: user.email,
                driver_license: user.driverLicense,
                password,
            })
            .then(() => {
                navigation.navigate(NavigateEnum.confirmation, {
                    confirmation: {
                        title: "Conta Criada",
                        message: `Agora é só fazer login\ne aproveitar`,
                        nextScreenRoute: NavigateEnum.signIn,
                    },
                });
            })
            .catch(() => {
                Alert.alert("Opa", "Não foi possível cadastrar");
            });
    };

    return (
        <KeyboardAvoidingWrapper>
            <Container>
                <Header>
                    <BackButton onPress={handleBack} />

                    <Steps>
                        <Bullet active />
                        <Bullet active={false} />
                    </Steps>
                </Header>

                <Title>Crie sua{"\n"}conta</Title>

                <Subtitle>
                    Faça seu cadastro de{"\n"}
                    forma rápida e fácil
                </Subtitle>

                <Form>
                    <FormTitle>2. Dados</FormTitle>

                    <Input
                        iconName="lock"
                        placeholder="Senha"
                        isPassword
                        autoCorrect={false}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Input
                        iconName="lock"
                        placeholder="Repetir senha"
                        isPassword
                        autoCorrect={false}
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                    />
                </Form>

                <Button
                    title="Cadastrar"
                    color={theme.colors.success}
                    onPress={handleConfirm}
                />
            </Container>
        </KeyboardAvoidingWrapper>
    );
};

export default SignUpSecondStep;
