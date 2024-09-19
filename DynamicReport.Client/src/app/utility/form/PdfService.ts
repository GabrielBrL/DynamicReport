import { Injectable } from '@angular/core';
import { BlendMode, PDFDocument, rgb } from 'pdf-lib';

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
        y: 800,
        size: 18,
        font: font,
        color: rgb(0, 0, 0),
      });

      let startY = 730;
      const fieldSpacing = 40;

      // Adiciona texto à página
      Array.from(html.children).forEach((item, index) => {
        const yPosition = startY - (fieldSpacing * index);
        if (item.id.includes("text")) {
          createTextField();
        }
        if (item.id.includes("radio")) {
          createRadioField();
        }
        if (item.id.includes("checkbox")) {
          createCheckBoxField();
        }
        if (item.id.includes("select")) {
          createSelectField();
        }

        function createSelectField() {
          page.drawText(item.childNodes[0].childNodes[0].textContent || "",
            {
              x: 25,
              y: yPosition + 20,
              size: 12,
              font: font,
              color: rgb(0, 0, 0),
            });
          var selectField = form.createDropdown(`field-select${index}`);
          var options: string[] = [];
          item.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes.forEach(y => {
            console.log(y);
            if (y.textContent && y.nodeName != "BUTTON")
              options.push(y.textContent);
          });
          selectField.setOptions(options);
          selectField.addToPage(page, { x: 25, y: yPosition - 10, width: 545, height: 20 });
          startY -= 10;
        }

        function createCheckBoxField() {
          page.drawText(item.childNodes[0].childNodes[0].textContent || "",
            {
              x: 25,
              y: yPosition + 20,
              size: 12,
              font: font,
              color: rgb(0, 0, 0),
            });
          let qtdSpacing = 0;
          for (let i = 0; i < item.childNodes[0].childNodes[1].childNodes.length; i++) {
            var label = item.childNodes[0].childNodes[1].childNodes[i].childNodes[0].textContent;
            page.drawText(label || "",
              {
                x: 25,
                y: yPosition - (20 * i),
                size: 12,
                font: font,
                color: rgb(0, 0, 0),
              });
            var checkField = form.createCheckBox(`field-check-box${index}${i}`);
            qtdSpacing = (20 * i) + 5;
            checkField.addToPage(page, { x: 25 + (7 * (label?.length || 0)), y: yPosition - (20 * i), width: 15, height: 15 });
          }
          startY -= qtdSpacing;
        }

        function createRadioField() {
          page.drawText(item.childNodes[0].childNodes[0].textContent || "",
            {
              x: 25,
              y: yPosition + 20,
              size: 12,
              font: font,
              color: rgb(0, 0, 0)
            });
          // item.childNodes[0].childNodes[1].childNodes.forEach(p => {
          //   var label = p.childNodes[0].textContent;
          // });
          let qtdSpacing = 0;
          var radioField = form.createRadioGroup(`field-radio${index}`);
          for (let i = 0; i < item.childNodes[0].childNodes[1].childNodes.length; i++) {
            var label = item.childNodes[0].childNodes[1].childNodes[i].childNodes[0].textContent;
            if (label) {
              page.drawText(label || "",
                {
                  x: 25,
                  y: yPosition - (20 * i),
                  size: 12,
                  font: font,
                  color: rgb(0, 0, 0),
                });
              qtdSpacing = (20 * i) + 5;
              radioField.addOptionToPage(label, page, { x: 25 + (6.5 * (label.length || 0)), y: yPosition - (20 * i), width: 15, height: 15 });
            }
          }
          startY -= qtdSpacing;
        }

        function createTextField() {
          page.drawText(item.childNodes[0].textContent || "",
            {
              x: 25,
              y: yPosition + 25,
              size: 12,
              font: font,
              color: rgb(0, 0, 0),
            });
          const textField = form.createTextField(`field-text${index}`);
          textField.addToPage(page, { x: 25, y: yPosition, width: 545, height: 20 });
        }
      });
    }
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }

}