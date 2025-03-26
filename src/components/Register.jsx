import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  FormFeedback
} from 'reactstrap';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        terms: false
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        terms: ''
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Validasyon kontrolleri
        if (name === 'email') {
            setErrors(prev => ({
                ...prev,
                email: !validateEmail(value) ? 'Geçerli bir email adresi giriniz' : ''
            }));
        } else if (name === 'password') {
            setErrors(prev => ({
                ...prev,
                password: !validatePassword(value) 
                    ? 'Şifre en az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir' 
                    : ''
            }));
        } else if (name === 'terms') {
            setErrors(prev => ({
                ...prev,
                terms: !checked ? 'Şartları kabul etmelisiniz' : ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            navigate('/success');
        }
    };

    const isFormValid = () => {
        return validateEmail(formData.email) && 
               validatePassword(formData.password) && 
               formData.terms && 
               !Object.values(errors).some(error => error !== '');
    };

    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <div className="register-form">
              <h2 className="mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    invalid={!!errors.email}
                  />
                  <FormFeedback>
                    {errors.email}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    invalid={!!errors.password}
                  />
                  <FormFeedback>
                    {errors.password}
                  </FormFeedback>
                </FormGroup>
                <FormGroup check>
                  <Input 
                    type="checkbox" 
                    id="terms" 
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    invalid={!!errors.terms}
                  />
                  {' '}
                  <Label check for="terms">
                    I accept the terms and conditions
                  </Label>
                  {errors.terms && (
                    <div className="text-danger small">{errors.terms}</div>
                  )}
                </FormGroup>
                <Button 
                  color="primary" 
                  className="mt-3"
                  disabled={!isFormValid()}
                >
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    )
}