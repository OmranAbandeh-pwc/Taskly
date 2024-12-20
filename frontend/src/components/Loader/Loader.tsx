import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <Oval
      height="180"
      width="180"
      color="#646EC8"
      secondaryColor="#646EC8"
      ariaLabel="loading"
    />
  );
};

export default Loader;
