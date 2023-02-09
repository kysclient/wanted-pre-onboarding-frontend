import {Box, Container, Flex, HStack} from "@chakra-ui/react";
import {ColorModeButton} from "../ColorModeButton";
import {WantedLogo} from "../Logo";
import {ConnectButton} from "../ConnectionButton";
import {LogoutButton} from "../LogoutButton";


export function Header() {
    return (
        <Box borderBottom="1px" borderBottomColor="chakra-border-color">
            <Container maxW="container.xl" p={'10px'}>
                <Flex align="center" justify="space-between">
                    <WantedLogo />
                    <HStack gap={'10px'}>
                        <ConnectButton />
                        {
                            localStorage.getItem("ACCESS_TOKEN") !== null &&
                            <LogoutButton />
                        }
                        <ColorModeButton />
                    </HStack>
                </Flex>
            </Container>
        </Box>
    )
}