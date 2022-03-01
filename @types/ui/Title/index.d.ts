import React, {ReactElement} from "react";

type TitleProps = {
  text: string
}

export type UITitle = (TitleProps) => ReactElement;
const Title: UITitle;
export default Title;