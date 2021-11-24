import React from "react";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import theme from "../../styles/theme";

import { Container, Header, Title, SubTitle, Footer, Form } from "./styles";

const SignIn = () => {
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
                    />

                    <Input
                        iconName="lock"
                        placeholder="Senha"
                        isPassword
                        autoCorrect={false}
                    />
                </Form>

                <Footer>
                    <Button
                        title="Login"
                        onPress={() => {}}
                        enabled={true}
                        loading={false}
                    />

                    <Button
                        title="Criar conta gratuita"
                        color={theme.colors.background_secondary}
                        onPress={() => {}}
                        enabled={true}
                        loading={false}
                        light
                    />
                </Footer>
            </Container>
        </KeyboardAvoidingWrapper>
    );
};

export default SignIn;
