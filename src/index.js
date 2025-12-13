const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/usuarios', require('./routers/usuarioRoutes'));
app.use('/api/sobre-mi', require('./routers/sobreMiRoutes'));
app.use('/api/experiencia', require('./routers/experienciaRoutes'));
app.use('/api/educacion', require('./routers/educacionRoutes'));
app.use('/api/proyectos', require('./routers/proyectoRoutes'));
app.use('/api/webs', require('./routers/webRoutes'));
app.use('/api/marcas', require('./routers/marcaRoutes'));
app.use('/api/tecnologias', require('./routers/tecnologiaRoutes'));
app.use('/api/contacto', require('./routers/contactoRoutes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});