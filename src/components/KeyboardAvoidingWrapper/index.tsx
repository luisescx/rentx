import React from "react";

import {
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
} from "react-native";
import { Container } from "./styles";

const KeyboardAvoidingWrapper = ({ children }) => {
    return (
        <Container>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </Container>
    );
};

export default KeyboardAvoidingWrapper;
