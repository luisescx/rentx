import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { NavigateEnum } from "../../../common/enum";
import {
    ProfileScreenNavigationProp,
    UserDTO,
} from "../../../common/interfaces";
import { BackButton } from "../../../components/BackButton";
import Bullet from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import Input from "../../../components/Input";
import KeyboardAvoidingWrapper from "../../../components/KeyboardAvoidingWrapper";
import * as Yup from "yup";
import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle,
} from "./styles";
import { Alert } from "react-native";

const SignUpFirstStep = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [driverLicense, setDriverLicense] = useState("");

    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleBack = () => {
        navigation.goBack();
    };

    const handleNextStep = async () => {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required("CNH é obrigatória"),
                email: Yup.string()
                    .email("Email Inválido")
                    .required("E-mail é obrigatório"),
                name: Yup.string().required("Nome é obrigatório"),
            });

            const data = { name, email, driverLicense } as UserDTO;
            await schema.validate(data);

            navigation.navigate(NavigateEnum.signUpSecondStep, {
                user: data,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert("Opa", error.message);
            }

            return Alert.alert(
                "Erro ao cadastrar",
                "Ocorreu um erro ao fazer cadastro, tente novamente mais tarde"
            );
        }
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
                    <FormTitle>1. Dados</FormTitle>

                    <Input
                        iconName="user"
                        placeholder="Nome"
                        onChangeText={setName}
                        value={name}
                    />

                    <Input
                        iconName="mail"
                        placeholder="E-mail"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value={email}
                    />

                    <Input
                        iconName="credit-card"
                        placeholder="CNH"
                        keyboardType="numeric"
                        onChangeText={setDriverLicense}
                        value={driverLicense}
                    />
                </Form>

                <Button title="Próximo" onPress={handleNextStep} />
            </Container>
        </KeyboardAvoidingWrapper>
    );
};

export default SignUpFirstStep;
