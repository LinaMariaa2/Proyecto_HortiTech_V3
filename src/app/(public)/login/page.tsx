/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

export default function page() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Estados para los mensajes de error
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [generalError, setGeneralError] = useState<string>(''); // Para errores de autenticación

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Resetear mensajes de error
        setEmailError('');
        setPasswordError('');
        setGeneralError('');

        let isValid = true;

        // --- Validación de campos obligatorios ---
        if (!email.trim()) {
            setEmailError('El correo electrónico es obligatorio.');
            isValid = false;
        }
        if (!password.trim()) {
            setPasswordError('La contraseña es obligatoria.');
            isValid = false;
        } else {
            // --- Validación de Contraseña Segura (adaptada del código de registro) ---
            const passwordValidationMessages: string[] = [];
            if (password.length < 10) {
                passwordValidationMessages.push('debe tener al menos 10 caracteres.');
            }
            if (!/[A-Z]/.test(password)) {
                passwordValidationMessages.push('debe contener al menos una letra mayúscula.');
            }
            if (!/[0-9]/.test(password)) {
                passwordValidationMessages.push('debe contener al menos un número.');
            }

            if (passwordValidationMessages.length > 0) {
                setPasswordError('La contraseña ' + passwordValidationMessages.join(' y '));
                isValid = false;
            }
        }

        if (!isValid) {
            return; // Si hay errores de validación, detén el envío del formulario
        }

        // --- Simulación de autenticación (aquí iría tu llamada a la API) ---
        console.log('Intentando iniciar sesión con:', email, password);

        // Simula una llamada a una API
        try {
            // Reemplaza esto con tu lógica real de API
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (email === 'test@example.com' && password === 'password123') {
                        resolve({ success: true, message: 'Inicio de sesión exitoso.' });
                    } else if (email === 'test@example.com' && password !== 'password123') {
                        reject({ success: false, message: 'La contraseña es incorrecta.' });
                    } else {
                        reject({ success: false, message: 'Credenciales inválidas.' });
                    }
                }, 1000); // Simula un retraso de 1 segundo
            });

            // Si la autenticación es exitosa, podrías redirigir:
            // import { useRouter } from 'next/navigation';
            // const router = useRouter();
            // router.push('/seleccionRol');
            alert('Inicio de sesión exitoso!'); // Mensaje de éxito temporal
            console.log(response);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) { // Captura el error de la promesa simulada
            if (error.message === 'La contraseña es incorrecta.') {
                setPasswordError(error.message); // Mostrar error específico de contraseña
            } else {
                setGeneralError(error.message || 'Ocurrió un error al iniciar sesión.'); // Otros errores
            }
            console.error('Error de autenticación:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-darkGreen-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-8">
                    <Image src="/images/logo-black-3.svg" alt="Logo de Hotitech" width={150} height={40} className="mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-darkGreen-900">Iniciar Sesión</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tu.correo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sweetGreen-500"
                        />
                        {/* Muestra el mensaje de error si existe */}
                        {emailError && <p className="text-pinkSecondary-600 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sweetGreen-500"
                        />
                        {/* Muestra el mensaje de error si existe */}
                        {passwordError && <p className="text-pinkSecondary-600 text-sm mt-1">{passwordError}</p>}
                    </div>
                    
                    {/* Botón de envío del formulario */}
                    <button type="submit" className="w-full bg-sweetGreen-500 text-white p-3 rounded-md font-semibold hover:bg-sweetGreen-600 transition duration-300">
                        Iniciar Sesión
                    </button>
                </form>

                {/* Muestra el error general de autenticación si existe */}
                {generalError && <p className="text-pinkSecondary-600 text-center mt-4 text-sm">{generalError}</p>}

                <p className="text-center mt-6 text-sm text-gray-600">
                    ¿Olvidó su contraseña?{' '}
                    <Link href="/recpassword" className="text-sweetGreen-600 hover:underline">
                        Recuperar
                    </Link>.
                </p>
            </div>
        </div>
    );
};