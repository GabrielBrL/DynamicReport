import { Injectable } from '@angular/core';
import { BlendMode, drawText, PDFDocument, PDFFont, PDFHexString, PDFPage, rgb } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  async createPdf(title: string, html: HTMLElement | null): Promise<Uint8Array> {
    // Cria um novo documento PDF
    const pdfDoc = await PDFDocument.create();



    if (html) {
      var page = pdfDoc.addPage();
      var form = pdfDoc.getForm();
      page.scale(1, 1);
      page.setWidth(600);
      const font = await pdfDoc.embedFont("Helvetica");

      // Adicionar um título
      page.drawText(title, {
        x: 25,
        y: 800,
        size: 18,
        font: font,
        color: rgb(0, 0, 0),
      });

      let startY = 730;
      const fieldSpacing = 40;

      var elementos = Array.from(html.children);

      // Adiciona texto à página
      createForm(elementos, startY, fieldSpacing, font);
    }
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;

    function createForm(elementos: Element[], startY: number, fieldSpacing: number, font: PDFFont) {
      elementos.forEach((item, index) => {
        var yPosition = startY - (fieldSpacing * index);
        if (yPosition < 50) {
          page = addNewPage();
          startY = 730;
          elementos = elementos.splice(index);
          createForm(elementos, startY, fieldSpacing, font);
          return;
        }

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

        function addNewPage(): PDFPage {
          var page = pdfDoc.addPage();
          page.scale(1, 1);
          page.setWidth(600);

          // Adicionar um título
          page.drawText(title, {
            x: 25,
            y: 800,
            size: 18,
            font: font,
            color: rgb(0, 0, 0),
          });
          return page;
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
          var selectField = form.createDropdown(randstr(`field-select`));
          var options: string[] = [];
          item.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes.forEach(y => {
            if (y.textContent && y.nodeName != "BUTTON")
              options.push(y.textContent);
          });
          selectField.setOptions(options);
          selectField.addToPage(page, { x: 25, y: yPosition - 10, width: 550, height: 20 });
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
              maxWidth: 545,
              lineHeight:15,
              wordBreaks: [" "]     
            });            
          let qtdSpacing = 0;
          let maxX = 0;
          for (let i = 0; i < item.childNodes[0].childNodes[1].childNodes.length; i++) {
            var label = item.childNodes[0].childNodes[1].childNodes[i].childNodes[0].textContent;
            if (label) {
              maxX = maxX > 30 + font.widthOfTextAtSize(label, 12) ? maxX : 30 + font.widthOfTextAtSize(label, 12);
            }
          }
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
              var checkField = form.createCheckBox(randstr(`field-check-box`));
              qtdSpacing = (20 * i) + 5;
              checkField.addToPage(page, { x: maxX, y: yPosition - (20 * i), width: 15, height: 15 });
            }
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
          var radioField = form.createRadioGroup(randstr(`field-radio`));
          let maxX = 0;
          for (let i = 0; i < item.childNodes[0].childNodes[1].childNodes.length; i++) {
            var label = item.childNodes[0].childNodes[1].childNodes[i].childNodes[0].textContent;
            if (label) {
              maxX = maxX > 30 + font.widthOfTextAtSize(label, 12) ? maxX : 30 + font.widthOfTextAtSize(label, 12);
            }
          }

          for (let i = 0; i < item.childNodes[0].childNodes[1].childNodes.length; i++) {
            var label = item.childNodes[0].childNodes[1].childNodes[i].childNodes[0].textContent;
            if (label) {
              page.drawText(label,
                {
                  x: 25,
                  y: yPosition - (20 * i),
                  size: 12,
                  font: font,
                  color: rgb(0, 0, 0),
                });

              qtdSpacing = (20 * i) + 5;
              radioField.addOptionToPage(label, page, { x: maxX, y: yPosition - (20 * i), width: 15, height: 15, textColor: rgb(0, 0, 0) });
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
          const textField = form.createTextField(randstr(`field-text`));
          textField.addToPage(page, { x: 25, y: yPosition, width: 550, height: 20 });
        }
      });
    }
    function randstr(prefix: string) {
      return Math.random().toString(36).replace('0.', prefix || '');
    }
  }

}