import React from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';

export default function Success() {
    return (
        <Container>
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <div className="mt-5">
                        <Alert color="success">
                            <h4 className="alert-heading">Başarılı!</h4>
                            <p>Form başarıyla gönderildi.</p>
                        </Alert>
                    </div>
                </Col>
            </Row>
        </Container>
    );
} 