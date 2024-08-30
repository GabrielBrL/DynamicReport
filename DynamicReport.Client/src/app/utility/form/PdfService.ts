import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  async createPdf(html: HTMLElement | null): Promise<Uint8Array> {
    // Cria um novo documento PDF
    const pdfDoc = await PDFDocument.create();

    if (html) {
      const page = pdfDoc.addPage();
      const form = pdfDoc.getForm();

      const font = await pdfDoc.embedFont("Helvetica");

      // Adicionar um título
      page.drawText('Formulário Dinâmico', {
        x: 200,
        y: 750,
        size: 18,
        font: font,
        color: rgb(0, 0, 0),
      });

      let startY = 700;
      const fieldSpacing = 50;

      // Adiciona texto à página
      Array.from(html.children).forEach((item, index) => {
        const yPosition = startY - index * fieldSpacing;
        if (item.id.includes("text")) {
          const textField = form.createTextField(`field-text${index}`);
          textField.setText('Digite aqui...');
          textField.addToPage(page, { x: 20, y: yPosition, width: 550, height: 20 });
        }
        if (item.id.includes("radio")) {
          const radioField = form.createRadioGroup(`field-radio${index}`);
          radioField.addOptionToPage("Opt1", page, { x: 20, y: yPosition - 25, width: 15, height: 15 });
          radioField.addOptionToPage("Opt2", page, { x: 20, y: yPosition, width: 15, height: 15 });
          startY -= 5;
        }
        if (item.id.includes("checkbox")) {
          for (let i = 0; i < item.childNodes[0].childNodes[1].childNodes.length; i++) {
            var checkField = form.createCheckBox(`field-check-box${index}${i}`);
            checkField.addToPage(page, { x: 20, y: yPosition - (20 * i), width: 15, height: 15 });
            startY -= 5;
          }
        }
      });

      // Adiciona um campo de texto editável
    }
    // Adiciona uma página ao documento

    // Serializa o documento PDF para um array de bytes
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }

}