import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('Email inválido').required('Email obrigatório'),
  message: Yup.string().required('Mensagem obrigatória'),
  interest: Yup.string().required('Interesse obrigatório')
});

const ContactForm: React.FC = () => {
    const [popupMessage, setPopupMessage] = React.useState<string | null>(null);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
        interest: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post('http://localhost:8000/contact/', values);
            console.log('Resposta da API:', response.data);
            resetForm();
            
            // Definindo a mensagem da pop-up com base na resposta da API
            setPopupMessage(response.data.msg);
            setTimeout(() => setPopupMessage(null), 3000);  // Ocultar a pop-up após 3 segundos
            } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            } finally {
            setSubmitting(false);
            }
      }}
    >
      {({ isSubmitting }) => (
        <div>
            {popupMessage && (
            <div style={popupStyle}>
              {popupMessage}
            </div>
          )}
        <Form>
            <div>
                <label htmlFor="name">Nome:</label>
                <Field type="text" id="name" name="name" />
                <StyledErrorMessage name="name" component="div" />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" />
                <StyledErrorMessage name="email" component="div" />
            </div>
            <div>
                <label htmlFor="message">Mensagem:</label>
                <Field as="textarea" id="message" name="message" />
                <StyledErrorMessage name="message" component="div" />
            </div>
            <div>
                <label htmlFor="interest">Interesse:</label>
                <Field type="text" id="interest" name="interest" />
                <StyledErrorMessage name="interest" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
                Enviar
            </button>
            </Form>
        </div>
      )}
    </Formik>
  );
}

// Componente ErrorMessage personalizado com estilo
const StyledErrorMessage: React.FC<any> = (props) => (
    <ErrorMessage {...props} style={errorStyle} />
);

// Estilos CSS para a mensagem de erro
const errorStyle: React.CSSProperties = {
    color: 'red',
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 'bold'
  };

const popupStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  };
  

export default ContactForm;
