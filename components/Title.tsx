import React, { ReactElement } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

type TitleProps = HeadingProps & {
  text: string
}

export default function Title({ text }: TitleProps): ReactElement {
  return (
    <Heading as="h1" marginTop="5" marginLeft="5" fontSize="3xl" color="blue">
      FROM Shell - {text}
    </Heading>
  )
}
