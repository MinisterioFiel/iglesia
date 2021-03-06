import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FormFooter from '../../utility/formFooter/FormFooter';
import FormHeader from '../../utility/formHeader/FormHeader';
import Input from '../../utility/Input/Input';
import Button from '../../utility/Button/Button';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { ValidacionNombre } from '../Validaciones/ValidacionNombre';
import { ValidacionTel } from '../Validaciones/ValidacionTel';
import { ValidacionesOpciones } from '../Validaciones/ValidacionOpciones';
import Popup from '../../utility/popup/Popup';
import { device } from '../../Responsive/Responsive';
import { ValidacionFecha } from '../Validaciones/ValidacionFecha';
import { ValidacionEdad } from '../Validaciones/ValidacionEdad';

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

    &:last-child {
      letter-spacing: 1px;

      @media ${device.tablet} {
        letter-spacing: 3px !important;
      }
    }
  }
`;

const FormPresentacion = () => {
  const [info, setinfo] = useState({
    fecha: '',
    nombreNino: '',
    edadNino: '',
    nombrePadre: '',
    nombreMadre: '',
    telefono: '',
    servicioAsistir: '',
    nombreLider: '',
    tiempoAsistir: '',
  });

  const form = useRef();

  const {
    fecha,
    nombreNino,
    edadNino,
    nombrePadre,
    nombreMadre,
    telefono,
    servicioAsistir,
    nombreLider,
    tiempoAsistir,
  } = info;

  //////// Validacion
  const [start, setStart] = useState(true);

  ///Validaciones States
  const [VoFFecha, setVoFFecha] = useState({ VoF: '', error: '' });
  const [VoFNombre, setVoFnNombre] = useState({ VoF: '', error: '' });
  const [VoFEdad, setVoFEdad] = useState({ VoF: '', error: '' });
  const [VoFPadre, setVoFPadre] = useState({ VoF: '', error: '' });
  const [VoFMadre, setVoFMadre] = useState({ VoF: '', error: '' });
  const [VoFTel, setVoFTel] = useState({ VoF: '', error: '' });
  const [VoFServicio, setVoFServicio] = useState({ VoF: '', error: '' });
  const [VoFLider, setVoFLider] = useState({ VoF: '', error: '' });
  const [VoFAsistir, setVoFAsistir] = useState({ VoF: '', error: '' });
  const [popup, setpopup] = useState('');
  const [textpopup, settextpopup] = useState('');
  ///Validaciones States

  useEffect(() => {
    if (start === true) {
      return;
    } else {
      //////// Validacion Nombres
      setVoFnNombre(ValidacionNombre(nombreNino, 3, 40));

      ////// Validacion Telefono
      setVoFTel(ValidacionTel(telefono));

      /////Validacion padre
      setVoFPadre(ValidacionNombre(nombrePadre, 3, 40));

      setVoFMadre(ValidacionNombre(nombreMadre, 3, 40));
      ////Validacion Servicio
      setVoFServicio(ValidacionesOpciones(servicioAsistir));

      ///Validacion Edad
      setVoFEdad(ValidacionEdad(edadNino));

      ///Validacion Fecha
      setVoFFecha(ValidacionFecha(fecha));

      //Validacion Asistir
      setVoFAsistir(ValidacionNombre(tiempoAsistir, 3, 25));

      //Validacion Lider
      setVoFLider(ValidacionNombre(nombreLider, 3, 25));
    }
  }, [
    fecha,
    nombreNino,
    edadNino,
    nombrePadre,
    nombreMadre,
    telefono,
    servicioAsistir,
    nombreLider,
    tiempoAsistir,
    start,
  ]);

  const save = (inf) => {
    const { value, name } = inf;

    setinfo({ ...info, [name]: value.toUpperCase() });
  };

  const send = async (e) => {
    e.preventDefault();

    setStart(false);

    ///Validacion De todos
    if (
      nombreNino === '' ||
      edadNino === '' ||
      telefono === '' ||
      fecha === '' ||
      nombreLider === '' ||
      nombrePadre === '' ||
      nombreMadre === '' ||
      tiempoAsistir === '' ||
      !nombreNino.match(/^[a-zA-Z??????????A????????????\s]+$/) ||
      !nombrePadre.match(/^[a-zA-Z??????????A????????????\s]+$/) ||
      !nombreMadre.match(/^[a-zA-Z??????????A????????????\s]+$/) ||
      !telefono.match('[0-9]{4}[0-9]{4}') ||
      telefono.length > 8 ||
      edadNino < 1 ||
      edadNino > 17 ||
      nombrePadre.length < 3 ||
      nombreMadre.length < 3 ||
      nombrePadre.length > 40 ||
      nombreMadre.length > 40 ||
      nombreNino.length < 3 ||
      nombreNino.length > 40
    ) {
      return;
    }

    setStart(true);
    setpopup(true);

    emailjs
      .sendForm(
        'service_f8qnxvp',
        'template_6n89jci',
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
      .post(`https://iglesia-palabra-fiel.herokuapp.com/api/presentacionNino`, {
        fecha,
        nombreNino,
        edadNino,
        nombrePadre,
        nombreMadre,
        telefono,
        servicioAsistir,
        nombreLider,
        tiempoAsistir,
      })
      .then((res) => {
        console.log(res);
        settextpopup(res.data);
      });

    setinfo({
      nombreNino: '',
      telefono: '',
      nombreLider: '',
      nombreMadre: '',
      nombrePadre: '',
      fecha: '',
      servicioAsistir: '',
      tiempoAsistir: '',
      edadNino: '',
    });
  };
  return (
    <>
      <FormHeader>PRESENTACI??N DE NI??OS</FormHeader>
      <Container>
        <Flex>
          <Form onSubmit={send} ref={form}>
            <Input
              placeholder="Fecha"
              type="date"
              name="fecha"
              Change={save}
              validation={VoFFecha.VoF}
              error={VoFFecha.error}
            />
            <Input
              placeholder="Nombre completo del ni??o (a)"
              type="text"
              name="nombreNino"
              Change={save}
              validation={VoFNombre.VoF}
              error={VoFNombre.error}
            />
            <Input
              placeholder="Edad del ni??o"
              type="number"
              name="edadNino"
              min="1"
              max="15"
              Change={save}
              validation={VoFEdad.VoF}
              error={VoFEdad.error}
            />
            <Input
              placeholder="Nombre del padre"
              type="text"
              name="nombrePadre"
              Change={save}
              validation={VoFPadre.VoF}
              error={VoFPadre.error}
            />
            <Input
              placeholder="Nombre de la Madre"
              type="text"
              name="nombreMadre"
              Change={save}
              validation={VoFMadre.VoF}
              error={VoFMadre.error}
            />
            <Input
              placeholder="No. tel??fono (XXXXXXXX)"
              type="tel"
              name="telefono"
              Change={save}
              validation={VoFTel.VoF}
              error={VoFTel.error}
            />
            <Input
              Default="Servicio al que asiste dia domingo"
              valores={[
                { opciones: '8:00 A.M.', id: '1' },
                { opciones: '10:00 A.M.', id: '2' },
              ]}
              type="text"
              tipo="option"
              name="servicioAsistir"
              Change={save}
              validation={VoFServicio.VoF}
              error={VoFServicio.error}
            />
            <Input
              placeholder="Nombre de L??der"
              type="text"
              name="nombreLider"
              Change={save}
              validation={VoFLider.VoF}
              error={VoFLider.error}
            />
            <Input
              placeholder="Tiempo de asistir a la iglesia"
              type="text"
              name="tiempoAsistir"
              Change={save}
              validation={VoFAsistir.VoF}
              error={VoFAsistir.error}
            />

            <Button
              color="primary"
              center="center"
              width="full"
              type="submit"
              style={{ marginTop: '20px', background: '#9873BC' }}
            >
              Enviar
            </Button>
          </Form>

          <Footer>
            <FormFooter>
              Ense??a al ni??o el camino en que debe andar, <br />
              y aun cuando sea viejo no se apartara de el. <br />
              Proverbios 22:6
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

export default FormPresentacion;
