import styled from "styled-components";
import {ReactNode} from "react";

type Props = {
    children: string | ReactNode;
    pageName: string;
};

const Wrap = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

export function Wrapper({ children }: Props) {
    return (
        <Wrap>
            {children}
        </Wrap>
    )
}