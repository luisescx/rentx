import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import theme from "../../styles/theme";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Container, Header, Title, SubTitle, Footer, Form } from "./styles";
import { ProfileScreenNavigationProp } from "../../common/interfaces";
import { NavigateEnum } from "../../common/enum";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleSignIn = async () => {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("E-mail obrigatório")
                    .email("Digite um email válido"),
                password: Yup.string().required("A senha é obrigatória"),
            });

            await schema.validate({ email, password });
            Alert.alert("Tudo certo!");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert("Opa", error.message);
            }

            return Alert.alert(
                "Erro na autenticação",
                "Ocorreu um erro ao fazer login, verifique as credenciais"
            );
        }
    };

    const handleNewAccount = () => {
        navigation.navigate(NavigateEnum.signUpFirstStep);
    };

    return (
        <KeyboardAvoidingWrapper>
            <Container>
                <StatusBar
                    barStyle={"dark-content"}
                    backgroundColor="transparent"
                    translucent
                />

                <Header>
                    <Title>Estamos{"\n"}quase lá.</Title>

                    <SubTitle>
                        Faça seu login para começar{"\n"}
                        uma experiência incrível.
                    </SubTitle>
                </Header>

                <Form>
                    <Input
                        iconName="mail"
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        iconName="lock"
                        placeholder="Senha"
                        isPassword
                        autoCorrect={false}
                        value={password}
                        onChangeText={setPassword}
                    />
                </Form>

                <Footer>
                    <Button
                        title="Login"
                        onPress={handleSignIn}
                        enabled={true}
                        loading={false}
                    />

                    <Button
                        title="Criar conta gratuita"
                        onPress={handleNewAccount}
                        enabled={true}
                        loading={false}
                        color={theme.colors.background_secondary}
                        light
                    />
                </Footer>
            </Container>
        </KeyboardAvoidingWrapper>
    );
};

export default SignIn;
