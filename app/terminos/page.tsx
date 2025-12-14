export default function TermsPage() {
    return (
        <div className="min-h-screen pt-24 px-8 md:px-16 pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Términos y Condiciones</h1>
                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <p>Última actualización: {new Date().toLocaleDateString()}</p>

                    <h3>1. Aceptación de los Términos</h3>
                    <p>
                        Al acceder y utilizar Vōrtika, usted acepta cumplir y estar legalmente obligado por los términos y condiciones descritos en este documento.
                        Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
                    </p>

                    <h3>2. Propiedad Intelectual</h3>
                    <p>
                        Todo el contenido publicado en Vōrtika (textos, gráficos, logotipos, imágenes y código) es propiedad intelectual de Vōrtika o de sus creadores de contenido
                        y está protegido por las leyes de derechos de autor.
                    </p>
                    <p>
                        Se permite compartir fragmentos de nuestro contenido siempre que se cite la fuente y se proporcione un enlace al artículo original.
                    </p>

                    <h3>3. Uso del Sitio</h3>
                    <p>
                        Usted se compromete a usar el sitio solo para fines legales y de una manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute del sitio por parte de cualquier tercero.
                    </p>

                    <h3>4. Exención de Responsabilidad</h3>
                    <p>
                        Vōrtika ofrece contenido con fines informativos y educativos sobre futurismo y tecnología. No ofrecemos asesoramiento legal, financiero o profesional.
                        No nos hacemos responsables de las decisiones tomadas basándose en la información proporcionada en este sitio.
                    </p>

                    <h3>5. Modificaciones</h3>
                    <p>
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
                    </p>
                </div>
            </div>
        </div>
    );
}
