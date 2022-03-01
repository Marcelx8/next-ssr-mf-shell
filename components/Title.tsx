import React, { ReactElement } from 'react';

type TitleProps = {
  text: string
}

export default function Title({ text }: TitleProps): ReactElement {
  return (
    <div>
      FROM Shell - {text}
    </div>
  )
}