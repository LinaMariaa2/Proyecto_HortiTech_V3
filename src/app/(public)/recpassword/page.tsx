"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importa el componente Image de Next.js

export default function RecpasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!email.trim()) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }

    // Aquí iría la lógica para enviar el correo de recuperación
    // Por ejemplo, una llamada a la API: await axios.post('/api/send-reset-email', { email });

    // Simulación de envío de correo
    setTimeout(() => {
      setMensaje(`Se ha enviado un código a ${email}. Por favor, ingrésalo a continuación.`);
      setShowCodeInput(true);
    }, 1000);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Por favor, ingresa el código.');
      return;
    }

    // Aquí iría la lógica para verificar el código
    // Por ejemplo, una llamada a la API: await axios.post('/api/verify-code', { email, code });

    // Simulación de verificación
    if (code === '123456') { // Código de ejemplo para simular éxito
        setMensaje('Código verificado. ¡Puedes restablecer tu contraseña!');
        // Aquí podrías redirigir al usuario a una página para cambiar la contraseña
        // Por ejemplo: router.push('/reset-password?email=' + email + '&code=' + code);
    } else {
        setError('El código ingresado es incorrecto. Por favor, inténtalo de nuevo.');
        setMensaje('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkGreen-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/images/logo-black-3.svg" alt="Logo de Hotitech" width={150} height={40} className="mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-darkGreen-900">Recuperar Contraseña</h1>
          <p className="text-sm text-gray-600 mt-2">Ingresa tu correo para recibir un código de verificación.</p>
        </div>

        {/* Muestra los mensajes de éxito o error globales */}
        {mensaje && !error && (
            <p className="text-sweetGreen-600 text-center mb-4">{mensaje}</p>
        )}
        {error && (
            <p className="text-pinkSecondary-600 text-center mb-4 text-sm">{error}</p>
        )}

        {/* Primer Formulario: Solicitud de Correo */}
        {!showCodeInput && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sweetGreen-500"
                placeholder="tu.correo@ejemplo.com"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={showCodeInput}
              className="w-full bg-sweetGreen-500 text-white p-3 rounded-md font-semibold hover:bg-sweetGreen-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Enviar Correo de Recuperación
            </button>
          </form>
        )}

        {/* Segundo Formulario: Ingreso de Código */}
        {showCodeInput && (
          <form onSubmit={handleCodeSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="code">
                Ingresa el Código de Verificación
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sweetGreen-500"
                placeholder="Ej: 123456"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-sweetGreen-500 text-white p-3 rounded-md font-semibold hover:bg-sweetGreen-600 transition duration-300"
            >
              Verificar Código
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link href="/login" className="inline-block text-sweetGreen-600 hover:underline font-medium">
            &larr; Volver a Inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
};