import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";   //  
import puppeteer from "puppeteer";     // 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeServicio {

    static async reportePorEspecialidades(datos) {
        // 1. Ruta de la plantilla Handlebars
        const plantillaPath = path.join(__dirname, "../utiles/handlebars/turnosPorEspecialidad.hbs");


        // 2. Leer archivo .hbs
        const plantillaHtml = fs.readFileSync(plantillaPath, "utf-8");

        // 3. Compilar plantilla con Handlebars
        const template = Handlebars.compile(plantillaHtml);

        // 4. Inyectar datos en la plantilla
        const html = template({ especialidades: datos });

        // 5. Generar PDF con Puppeteer
        const browser = await puppeteer.launch();
        const pagina = await browser.newPage();
        await pagina.setContent(html);

        const buffer = await pagina.pdf({
            format: "A4",
            printBackground: true
        });

        await browser.close();

        return buffer; // devolvemos el PDF como buffer
    }
}