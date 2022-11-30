import React from "react";
import { Oval } from "react-loader-spinner";

const FormSubmittingLoader = () => {
  return (
    <Oval
      height="5em"
      width="5em"
      color="black"
      wrapperStyle={{}}
      wrapperClass="mt-4"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="yellow"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default FormSubmittingLoader;
