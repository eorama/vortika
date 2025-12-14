export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Política de Privacidad</h1>
                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <p>Última actualización: {new Date().toLocaleDateString()}</p>

                    <h3>1. Introducción</h3>
                    <p>
                        Bienvenido a Vōrtika. Nos tomamos muy en serio su privacidad. Esta política describe cómo recopilamos, usamos y protegemos su información personal
                        cuando interactúa con nuestra plataforma de contenido sobre el futuro post-laboral.
                    </p>

                    <h3>2. Datos que Recopilamos</h3>
                    <p>
                        Actualmente, Vōrtika es principalmente una plataforma informativa. Podemos recopilar datos técnicos anónimos como:
                    </p>
                    <ul>
                        <li>Dirección IP y tipo de navegador.</li>
                        <li>Páginas visitadas y tiempo de permanencia.</li>
                        <li>Preferencias de idioma.</li>
                    </ul>
                    <p>
                        Si decide suscribirse a nuestro boletín, recopilaremos su dirección de correo electrónico únicamente para enviarle actualizaciones.
                    </p>

                    <h3>3. Uso de la Información</h3>
                    <p>
                        Utilizamos la información recopilada para:
                    </p>
                    <ul>
                        <li>Mejorar la experiencia de usuario y el rendimiento del sitio.</li>
                        <li>Analizar tendencias de lectura para crear mejor contenido.</li>
                        <li>Enviar comunicaciones (solo si se ha suscrito explícitamente).</li>
                    </ul>

                    <h3>4. Cookies</h3>
                    <p>
                        Utilizamos cookies esenciales para recordar sus preferencias (como el estado de la animación o el idioma). No utilizamos cookies de rastreo publicitario invasivo.
                    </p>

                    <h3>5. Contacto</h3>
                    <p>
                        Si tiene preguntas sobre esta política, puede contactarnos a través de nuestras redes sociales o en privacidad@vortika.org.
                    </p>
                </div>
            </div>
        </div>
    );
}
