import React, {ReactElement} from "react";
import { Heading, HeadingProps } from '@chakra-ui/react';

type TitleProps = HeadingProps & {
  text: string
}

export type UITitle = (TitleProps) => ReactElement;
const Title: UITitle;
export default Title;