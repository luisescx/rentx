import React, { useState } from "react";
import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>["name"];
    isPassword?: boolean;
    value?: string;
}

const Input = ({ iconName, isPassword, value, ...rest }: Props) => {
    const [isPasswordVisible, setPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const theme = useTheme();

    const handlePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setIsFilled(!!value);
    };

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={
                        isFocused || isFilled
                            ? theme.colors.main
                            : theme.colors.text_detail
                    }
                />
            </IconContainer>

            <InputText
                onFocus={handleFocus}
                onBlur={handleBlur}
                secureTextEntry={isPassword && isPasswordVisible}
                isFocused={isFocused}
                value={value}
                {...rest}
            />

            {isPassword ? (
                <BorderlessButton onPress={handlePasswordVisibility}>
                    <IconContainer isFocused={isFocused}>
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
