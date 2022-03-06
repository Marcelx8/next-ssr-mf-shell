import dynamic from "next/dynamic";

const Title = dynamic(() => import('ui/Title'))

export {
  Title
}