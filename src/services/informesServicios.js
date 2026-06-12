import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeServicio {

    reportePorEspecialidades = async (datos) => {
        // 1. Ruta de la plantilla Handlebars
        const plantillaPath = path.join(__dirname, "../utiles/handlebars/turnosPorEspecialidad.hbs");

        // 2. Leer archivo .hbs
        const plantillaHtml = fs.readFileSync(plantillaPath, "utf-8");

        // 3. Compilar plantilla con Handlebars
        const template = Handlebars.compile(plantillaHtml);

        // 4. Inyectar datos en la plantilla
        const html = template({
            especialidades: datos
        });

        // 5. Generar PDF con Puppeteer
        const browser = await puppeteer.launch();
        const pagina = await browser.newPage();
        await pagina.setContent(html);

        // Guardar PDF en disco
        await pagina.pdf({
            path: "reporte_especialidades.pdf", //  nombre del archivo
            format: "A4",
            printBackground: true
        });

        await browser.close();

        console.log(" PDF generado: reporte_especialidades.pdf");
    }
}

