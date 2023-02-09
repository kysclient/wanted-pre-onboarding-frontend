import {Link} from "react-router-dom";
import {Box, Tag} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

const links = {
    github: 'https://github.com/kysclient',
    tistory: ''
};

export function Footer() {
    return(
        <Box textAlign={'center'} w="full" p={6}>
            <Tag style={{marginRight:'10px'}}>
                <a href={links.github}>
                    ⭐️ This app is for {' '} wanted-pre-onboarding-frontend <ExternalLinkIcon />
                </a>
                , happy coding!
            </Tag>
            <Tag  style={{marginRight:'10px'}} >
                🙋 You have questions? plz click my contact button {' '}
            </Tag>
            <Tag>
                <a href={links.github} style={{alignItems:'center'}}>
                    📖 Want to know more about {' '}Kim yu shin <ExternalLinkIcon />
                </a>
            </Tag>
        </Box>
    )
}