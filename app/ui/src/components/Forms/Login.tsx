import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import React, {useState} from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const rand = () => {
        const value = Math.floor(Math.random() * 4)
        const arr =[
            'https://images.unsplash.com/photo-1603807008857-ad66b70431aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1352&q=80'
            , 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1352&q=80'
            , 'https://images.unsplash.com/photo-1599045118108-bf9954418b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1352&q=80'
            , 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1352&q=80'
        ]
        return arr[value]
    }
    const str = rand();

    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // 👈️ prevent page refresh
    
        // 👇️ access input values here
        console.log('Email 👉️', email);
        console.log('Password 👉️', password);
    
        // 👇️ clear all input values in the form
        setEmail('');
        setPassword('');
    };

    return (
        <ChakraProvider>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'2xl'}>Conecte a sua conta</Heading>
                        <form onSubmit={handleSubmit}>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input type="email" onChange={event => setEmail(event.target.value)} value={email}/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Senha</FormLabel>
                                <Input type="password" onChange={event => setPassword(event.target.value)} value={password}/>
                            </FormControl>
                            <Stack spacing={6}>
                                <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                    <Checkbox>Lembrar dos dados?</Checkbox>
                                    <Link color={'green.200'}>Esqueceu a senha?</Link>
                                </Stack>
                                <Button colorScheme={'green'} variant={'solid'} backgroundColor={'green.100'} type={'submit'}>
                                Entrar
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Flex>
                <Flex flex={1}>
                    <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={str}
                    />
                </Flex>
            </Stack>
        </ChakraProvider>
    );
}
