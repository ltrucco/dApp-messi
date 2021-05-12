import React from 'react'
import { Container, FormContent, FormH1, FormLabel, FormWrap, Icon, Form, FormInput, FormButton, Text } from './SigninElements'

const Signin = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Messi Finance</Icon>
                    <FormContent>
                        <Form>
                            <FormH1>Sign in to your account</FormH1>
                            <FormLabel htmlFor='for'>Email</FormLabel>
                            <FormInput type='email' required></FormInput>
                            <FormLabel htmlFor='for'>Password</FormLabel>
                            <FormInput type='password' required></FormInput>
                            <FormButton type="submit">Sign in</FormButton>
                            <Text>Forgot password</Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default Signin
