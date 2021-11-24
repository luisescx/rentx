import React, { useState } from "react";
import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>["name"];
    isPassword?: boolean;
}

const Input = ({ iconName, isPassword, ...rest }: Props) => {
    const [isPasswordVisible, setPasswordVisible] = useState(true);
    const theme = useTheme();

    const handlePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <Container>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={theme.colors.text_detail}
                />
            </IconContainer>

            <InputText
                {...rest}
                secureTextEntry={isPassword && isPasswordVisible}
            />

            {isPassword ? (
                <BorderlessButton onPress={handlePasswordVisibility}>
                    <IconContainer>
                        <Feather
                            name={isPasswordVisible ? "eye" : "eye-off"}
                            size={24}
                            color={theme.colors.text_detail}
                        />
                    </IconContainer>
                </BorderlessButton>
            ) : null}
        </Container>
    );
};

export default Input;
