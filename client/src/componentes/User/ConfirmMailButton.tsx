import React from "react";
import axiosPostCall from "../../funciones/axiosPostCall";

interface IProps {
  email: string;
}

function ConfirmMailButton({ email }: IProps) {
  const sendMailHandler = () => {
    axiosPostCall("/users/confirmationSend", { email })
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };

  return (
    <div className="mt-8 p-2 border-2 border-solid border-red-600 rounded-3xl text-red-600 bg-red-300 font-bold">
      <p>
        Su mail no ha sido confirmado. No podrá realizar compras ni comentarios
      </p>
      <p>
        Si hace click en "Enviar Mail", se enviará el correo de confirmación a
        su mail.
      </p>
      <button
        className="p-4 my-4 rounded-lg text-white bg-red-600"
        onClick={sendMailHandler}
      >
        Enviar Mail
      </button>

      <p>Si ha confirmado el mail, vuelva a entrar a su perfil</p>
    </div>
  );
}

export default ConfirmMailButton;
