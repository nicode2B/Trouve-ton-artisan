// frontend/src/components/ContactForm.js

import React, { useState } from 'react';
import {Card,  Form, Button, Alert } from 'react-bootstrap';
import { submitContactForm } from '../services/api';

const ContactForm = ({ artisanName, artisanEmail, className }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    // Statut de l'envoi : null, 'success', 'error', 'loading'
    const [status, setStatus] = useState(null); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation basique
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: "Veuillez remplir tous les champs obligatoires (Nom, Email, Message)." });
            return;
        }

        setStatus({ type: 'loading', message: "Envoi en cours..." });

        try {
            // Utilise la fonction de simulation de votre fichier api.js
            const result = await submitContactForm(artisanEmail, formData); 

            if (result.success) {
                setStatus({ type: 'success', message: "Votre message a été envoyé avec succès ! L'artisan vous contactera prochainement." });
                // Réinitialise le formulaire
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus({ type: 'error', message: result.message || "Une erreur est survenue lors de l'envoi du message." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Une erreur réseau est survenue. Veuillez réessayer plus tard." });
        }
    };

    return (
         <Card className={`p-4 ${className}`}>
            <h4 className="mb-4 text-dark">Contacter {artisanName}</h4>
            
            {/* Affichage du statut */}
            {status && (
                <Alert variant={status.type === 'success' ? 'success' : status.type === 'error' ? 'danger' : 'info'} className="mb-3">
                    {status.message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="formName">Nom complet *</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required disabled={status && status.type === 'loading'} id="formName" autoComplete="name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="formEmail">Adresse Email *</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required disabled={status && status.type === 'loading'} id="formEmail" autoComplete="email"/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="formPhone">Téléphone (Optionnel)</Form.Label>
                    <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={status && status.type === 'loading'} id="formPhone" autoComplete="tel" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="formMessage">Votre Message *</Form.Label>
                    <Form.Control as="textarea" rows={5} name="message" value={formData.message} onChange={handleChange} required disabled={status && status.type === 'loading'} id="formMessage" autoComplete="off"/>
                </Form.Group>

                <Button className="w-100 mt-3 btn-gradient-green d-block mx-auto" type="submit" disabled={status && status.type === 'loading'}>
                    {status && status.type === 'loading' ? "Envoi..." : "Envoyer le message"}
                </Button>
            </Form>
        </Card>
    );
};

export default ContactForm;