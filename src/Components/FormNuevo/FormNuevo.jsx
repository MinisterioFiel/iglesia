import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FormFooter from '../../utility/formFooter/FormFooter';
import FormHeader from '../../utility/formHeader/FormHeader';
import Input from '../../utility/Input/Input';
import emailjs from 'emailjs-com';
import axios from 'axios';
import Button from '../../utility/Button/Button';
import { ValidacionNombre } from '../Validaciones/ValidacionNombre';
import { ValidacionTel } from '../Validaciones/ValidacionTel';
import Popup from '../../utility/popup/Popup';
import { device } from '../../Responsive/Responsive';
import { ValidacionBox } from '../Validaciones/ValidacionBox';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  width: 100%;

  @media ${device.tablet} {
    width: 40%;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 20px;
  width: 100%;

  & p {
    font-size: 13px;

    @media ${device.tablet} {
      font-size: 16px;
    }

    &:first-child {
      letter-spacing: 1px !important;

      @media ${device.tablet} {
        letter-spacing: 4px !important;
      }
    }

    &:last-child {
      letter-spacing: 1px;

      @media ${device.tablet} {
        letter-spacing: 3px !important;
      }
    }
  }
`;

const FormNuevo = () => {
  const [info, setinfo] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    mensaje: '',
  });

  const { nombre, apellido, telefono, mensaje } = info;

  const form = useRef();
  const [textpopup, settextpopup] = useState();
  //////// Validacion
  const [start, setStart] = useState(true);

  const [popup, setpopup] = useState('');

  ///Validaciones States
  const [VoFNombre, setVoFNombre] = useState({ VoF: '', error: '' });
  const [VoFApellido, setVoFApellido] = useState({ VoF: '', error: '' });
  const [VoFTelefono, setVoFTelefono] = useState({ VoF: '', error: '' });
  const [VoFTextArea, setVoFTextArea] = useState({ VoF: '', error: '' });
  ///Validaciones States

  useEffect(() => {
    if (start === true) {
      return;
    } else {
      //////// Validacion Nombres
      setVoFNombre(ValidacionNombre(nombre, 3, 25));

      //////// Validacion Apellido
      setVoFApellido(ValidacionNombre(apellido, 3, 25));

      ////// Validacion Telefono
      setVoFTelefono(ValidacionTel(telefono));

      ///Validacion textArea
      setVoFTextArea(ValidacionBox(mensaje));
    }
  }, [nombre, apellido, telefono, mensaje, start]);

  const save = (inf) => {
    const { value, name } = inf;

    setinfo({ ...info, [name]: value });
  };

  const send = async (e) => {
    e.preventDefault();

    setStart(false);

    ///Validacion De todos
    if (
      nombre === '' ||
      apellido === '' ||
      telefono === '' ||
      mensaje === '' ||
      nombre.length < 3 ||
      nombre.length > 25 ||
      apellido.length < 3 ||
      apellido.length > 25 ||
      !nombre.match(/^[a-zA-Z??????????A????????????\s]+$/) ||
      !apellido.match(/^[a-zA-Z??????????A????????????\s]+$/) ||
      !telefono.match('[0-9]{4}[0-9]{4}') ||
      telefono.length > 8 ||
      VoFNombre.VoF === true ||
      VoFApellido.VoF === true ||
      VoFTelefono.VoF === true ||
      VoFTextArea.VoF === true
    ) {
      return;
    }
    setStart(true);
    setpopup(true);

    emailjs
      .sendForm(
        'service_f8qnxvp',
        'template_wqiik7l',
        e.target,
        'user_jflobi4DYtpXXfMyGSlL3'
      )
      .then(
        () => {
          settextpopup('Fue Enviado Exitosamente');
        },
        () => {
          settextpopup('Algo Salio Mal Intente Despues o mas Tarde');
        }
      );

    axios
      .post(`https://iglesia-palabra-fiel.herokuapp.com/api/soyNuevo`, {
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        telefono: telefono.toUpperCase(),
        mensaje: mensaje.toUpperCase(),
      })
      .then((res) => {
        console.log(res);
        settextpopup(res.data);
      });
  };
  //////// Validacion

  return (
    <>
      <FormHeader color="green">soy nuevo</FormHeader>
      <Container>
        <Flex>
          <Form ref={form} onSubmit={send}>
            <Input
              placeholder="Nombre"
              type="text"
              name="nombre"
              Change={save}
              validation={VoFNombre.VoF}
              error={VoFNombre.error}
              value={nombre}
            />
            <Input
              placeholder="Apellido"
              type="text"
              name="apellido"
              Change={save}
              validation={VoFApellido.VoF}
              error={VoFApellido.error}
              value={apellido}
            />
            <Input
              placeholder="Tel??fono de contacto (XXXXXXXX)"
              type="tel"
              name="telefono"
              Change={save}
              validation={VoFTelefono.VoF}
              error={VoFTelefono.error}
              value={telefono}
            />
            <Input
              tipo="textarea"
              name="mensaje"
              placeholder="Mensaje/Pregunta:"
              Change={save}
              value={mensaje}
              validation={VoFTextArea.VoF}
              error={VoFTextArea.error}
            />
            <Button
              color="primary"
              center="center"
              width="full"
              type="submit"
              style={{ marginTop: '20px', background: '#12AFAF' }}
            >
              Enviar
            </Button>
          </Form>

          <Footer>
            <FormFooter tipo="Main">
              !Te damos la bienvenida a la familia Palabra Fiel!
            </FormFooter>
            <FormFooter>
              Por lo tanto, si alguno esta en Cristo, es una nueva creacion.
              <br /> ??Lo viejo ha pasado, ha llegado ya lo nuevo! 2 <br />{' '}
              Corintios 5:17
            </FormFooter>
          </Footer>
        </Flex>
      </Container>
      <Popup
        show={popup}
        onHide={() => setpopup(false)}
        titulo="Espere un momento..."
        reload={true}
      >
        {textpopup && (
          <h3>
            Tu informaci??n ha sido enviada exitosamente, le daremos seguimiento
            a tu solicitud
          </h3>
        )}
      </Popup>
    </>
  );
};

export default FormNuevo;
