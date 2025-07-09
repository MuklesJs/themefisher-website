import Image from "next/image";
import Gravatar from "react-gravatar";

export const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export default function Avatar(props) {
  if (props.src) {
    const { src, preview, ...rest } = props;
    const source = src?.startsWith("http") ? src : `${BUCKET_URL}/${src}`;
    return <Image src={preview ? src : source} {...rest} />;
  } else if (props.email) {
    const { email, ...rest } = props;
    return (
      <Gravatar
        email={props.email}
        className={`rounded-full ${rest.className}`}
        alt={rest.alt}
        size={rest.height || 100}
        default="mp"
      />
    );
  }
}
