import { Category, Series, Article } from './types';

export const CATEGORIES: Category[] = [
    {
        id: '1',
        title: 'El Fin del Trabajo',
        description: 'Explora el colapso del modelo laboral tradicional y la economía post-trabajo.',
        slug: 'fin-del-trabajo',
        iconName: 'BriefcaseOff',
        image: '/images/categories/end-of-work.jpg',
    },
    {
        id: '2',
        title: 'Sociedad Postlaboral',
        description: 'Nuevas formas de vivir, convivir y relacionarse sin rol productivo.',
        slug: 'sociedad-postlaboral',
        iconName: 'Users',
        image: '/images/categories/post-work-society.jpg',
    },
    {
        id: '3',
        title: 'Poder y Gobernanza',
        description: 'Tecnocracia, poder algorítmico y legislación posthumana.',
        slug: 'poder-gobernanza',
        iconName: 'Scale',
        image: '/images/categories/governance.jpg',
    },
    {
        id: '4',
        title: 'Identidad y Sentido',
        description: 'Redefinición del ser humano, trascendencia y ego sin productividad.',
        slug: 'identidad-sentido',
        iconName: 'Fingerprint',
        image: '/images/categories/identity.jpg',
    },
    {
        id: '5',
        title: 'Tecnología Autónoma',
        description: 'IA general, robótica social y sistemas de decisión no humanos.',
        slug: 'tecnologia-autonoma',
        iconName: 'Bot',
        image: '/images/categories/autonomous-tech.jpg',
    },
    {
        id: '6',
        title: 'Cultura y Creatividad',
        description: 'Estéticas automatizadas y arte sin necesidad de venta.',
        slug: 'cultura-creatividad',
        iconName: 'Palette',
        image: '/images/categories/culture.jpg',
    },
    {
        id: '7',
        title: 'Ecología Posthumana',
        description: 'Relación entre naturaleza, tecnología y humanidad.',
        slug: 'ecologia',
        iconName: 'Leaf',
        image: '/images/categories/ecology.jpg',
    },
    {
        id: '8',
        title: 'Acción en el Presente',
        description: 'Guías y reflexiones sobre lo que podemos hacer hoy.',
        slug: 'accion-presente',
        iconName: 'Zap',
        image: '/images/categories/action.jpg',
    },
];

export const SERIES: Series[] = [
    {
        id: 's1',
        title: 'Del Homo Faber al Homo Inútil',
        description: 'Una crónica de la transición hacia la irrelevancia económica humana.',
        slug: 'homo-faber-homo-inutil',
        coverImage: '/images/series/homo-inutil.jpg',
        categoryId: '1',
        articleCount: 5,
    },
    {
        id: 's2',
        title: 'Dioses de Silicio',
        description: 'Entendiendo a las nuevas entidades que gobernarán nuestras decisiones.',
        slug: 'dioses-silicio',
        coverImage: '/images/series/silicon-gods.jpg',
        categoryId: '5',
        articleCount: 3,
    },
];

export const ARTICLES: Article[] = [
    {
        id: 'a1',
        title: 'La Gran Renuncia Involuntaria',
        excerpt: 'Cuando el mercado laboral te expulsa, no es una crisis, es una evolución.',
        content: `
            <p className="mb-6">El mercado laboral, tal como lo conocemos, está experimentando una transformación sísmica. No se trata simplemente de una recesión cíclica o de un ajuste temporal, sino de un cambio fundamental en la estructura misma de cómo generamos valor y distribuimos recursos en la sociedad.</p>
            
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">El fin de la era industrial</h2>
            <p className="mb-6">Durante más de dos siglos, la ética del trabajo ha sido el pilar central de nuestra identidad. Nos definimos por lo que hacemos, por nuestra profesión, por nuestra contribución productiva. Sin embargo, la automatización avanzada y la inteligencia artificial están desmantelando esta premisa pieza por pieza.</p>
            
            <p className="mb-6">Imaginemos un futuro no muy lejano donde la mayoría de las tareas cognitivas y físicas son realizadas por algoritmos y robots con una eficiencia y precisión inalcanzables para el ser humano. ¿Qué sucede entonces con la "dignidad del trabajo"? ¿Qué ocurre cuando la "Gran Renuncia" deja de ser voluntaria y se convierte en una expulsión sistémica?</p>
            
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">La ilusión de la reconversión</h2>
            <p className="mb-6">Se nos dice constantemente que debemos "reinventarnos", aprender a programar, adaptarnos. Pero la velocidad del cambio tecnológico supera con creces nuestra capacidad biológica y social de adaptación. La obsolescencia humana no es un fallo del sistema, es una característica del progreso tecnológico desenfrenado bajo la lógica actual.</p>
            
            <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <p className="mb-6">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            
            <p className="mb-6">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Hacia una nueva identidad</h2>
            <p className="mb-6">La solución no reside en luchar contra la corriente, intentando competir con máquinas en su propio juego. La solución radica en redefinir lo que significa ser humano. Debemos desacoplar la supervivencia económica de la productividad laboral. La Renta Básica Incondicional no es solo una medida económica, es la base material para una nueva libertad.</p>
            
            <p className="mb-6">Estamos ante la oportunidad de liberar el potencial humano de la servidumbre del salario. De explorar la creatividad, el cuidado, la filosofía, el arte y la conexión comunitaria no como hobbies marginales, sino como el centro de nuestra existencia.</p>
            
            <p className="mb-6">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
            
            <p className="mb-6">Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
             <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <p className="mb-6">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            
            <p className="mb-6">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
             <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <p className="mb-6">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            
            <p className="mb-6">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">El largo camino a casa</h2>
            <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className="mb-6">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            <p className="mb-6">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            
            <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className="mb-6">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
             <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className="mb-6">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
        `,
        slug: 'gran-renuncia-involuntaria',
        seriesId: 's1',
        orderInSeries: 1,
        publishedAt: '2025-01-15',
        readTime: '5 min',
        coverImage: '/images/articles/resignation.jpg',
        tags: ['Economía', 'Futuro'],
    },
    {
        id: 'a2',
        title: 'Renta Básica: ¿Libertad o Control?',
        excerpt: 'Analizando las implicaciones éticas del dinero gratis universal.',
        content: 'Contenido del artículo...',
        slug: 'renta-basica-control',
        seriesId: 's1',
        orderInSeries: 2,
        publishedAt: '2025-01-22',
        readTime: '7 min',
        coverImage: '/images/articles/ubi.jpg',
        tags: ['UBI', 'Política'],
    },
];
