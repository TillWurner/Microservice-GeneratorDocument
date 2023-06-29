import { Injectable } from '@nestjs/common';
import { HttpClient } from './HttpClient.model';
import { Observable } from 'rxjs';
import { Asesor } from './asesor.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as Papa from 'papaparse';

@Injectable({
})
export class AsesoresService {
  private apiUrl = 'http://35.199.108.5/asesores/api'; // URL de la API del servidor principal
  private apiUrl3 = 'http://35.199.108.5/inmuebles/api'; // URL de la API del servidor principal
  private apiUrl4 = 'http://35.199.108.5/transacciones/api'; // URL de la API del servidor principal
  private apiUrl2 = 'http://35.199.108.5/upload'; // URL de la API POST

  constructor(private http: HttpClient) { }

  getAsesores(): Observable<any> {
    const url = `${this.apiUrl}`; // Endpoint para obtener los asesores
    const url2 = `${this.apiUrl3}`; // Endpoint para obtener los inmuebles
    const url3 = `${this.apiUrl4}`; // Endpoint para obtener las transacciones
    return ;
  }

  generatePDF(asesores: Asesor[]): void {
    console.log('Generando PDF');
    console.log('Asesores:', asesores);
    const doc = new jsPDF();
    const content = this.generatePDFContent(asesores);
  
    const generatePDFFunction = () => {
      const element = document.createElement('div');
      element.appendChild(content);
    
      document.body.appendChild(element);
    
      html2canvas(element)
        .then((canvas) => {
          console.log('html2canvas completado');
    
          document.body.removeChild(element);
    
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 210; // A4 paper size
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
          doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          doc.save('asesores.pdf');
        })
        .catch((error) => {
          console.error('Error al convertir contenido a imagen:', error);
        });
    };    
  
    if (document.readyState === 'complete') {
      setTimeout(generatePDFFunction, 500); // Esperar 500 milisegundos (ajusta este valor si es necesario)
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        setTimeout(generatePDFFunction, 500); // Esperar 500 milisegundos (ajusta este valor si es necesario)
      });
    }
  }
  
  
  

  private generatePDFContent(asesores: Asesor[]): HTMLElement {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Código</th>
        </tr>
      </thead>
      <tbody>
        ${asesores
          .map(
            (asesor) => `
            <tr>
              <td>${asesor.nombre}</td>
              <td>${asesor.correo}</td>
              <td>${asesor.telefono}</td>
              <td>${asesor.codigo}</td>
            </tr>
          `
          )
          .join('')}
      </tbody>
    `;

    return table;
  }
  
  generateCSV(asesores: Asesor[]): void {
    const csvData = asesores.map((asesor) => ({
      nombre: asesor.nombre,
      correo: asesor.correo,
      telefono: asesor.telefono,
      codigo: asesor.codigo,
    }));

    const csv = Papa.unparse(csvData);
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', 'asesores.csv');
    link.click();
  }

  
  uploadFile(formData: FormData): void {
    let headers;
    headers = headers.append('Accept', 'application/json');   
     console.log('Archivo enviado al servidor principal'),
      (error) => console.error('Error al enviar el archivo al servidor principal', error)

  }
  

}




@Injectable({
})
export class AsesorService {
  private apiUrl = 'http://35.199.108.5/asesores/api'; // URL de la API del servidor principal
  private apiUrl2 = 'http://35.199.108.5/upload'; // URL de la API POST

  constructor(private http: HttpClient) { }

  getAsesores(): Observable<any> {
    const url = `${this.apiUrl}`; // Endpoint para obtener los asesores
    return;
  }

  generatePDF(asesores: Asesor[]): void {
    console.log('Generando PDF');
    console.log('Asesores:', asesores);
    const doc = new jsPDF();
    const content = this.generatePDFContent(asesores);
  
    const generatePDFFunction = () => {
      const element = document.createElement('div');
      element.appendChild(content);
    
      document.body.appendChild(element);
    
      html2canvas(element)
        .then((canvas) => {
          console.log('html2canvas completado');
    
          document.body.removeChild(element);
    
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 210; // A4 paper size
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
          doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          doc.save('asesores.pdf');
        })
        .catch((error) => {
          console.error('Error al convertir contenido a imagen:', error);
        });
    };    
  
    if (document.readyState === 'complete') {
      setTimeout(generatePDFFunction, 500); // Esperar 500 milisegundos (ajusta este valor si es necesario)
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        setTimeout(generatePDFFunction, 500); // Esperar 500 milisegundos (ajusta este valor si es necesario)
      });
    }
  }
  
  
  

  private generatePDFContent(asesores: Asesor[]): HTMLElement {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Código</th>
        </tr>
      </thead>
      <tbody>
        ${asesores
          .map(
            (asesor) => `
            <tr>
              <td>${asesor.nombre}</td>
              <td>${asesor.correo}</td>
              <td>${asesor.telefono}</td>
              <td>${asesor.codigo}</td>
            </tr>
          `
          )
          .join('')}
      </tbody>
    `;

    return table;
  }
  
  generateCSV(asesores: Asesor[]): void {
    const csvData = asesores.map((asesor) => ({
      nombre: asesor.nombre,
      correo: asesor.correo,
      telefono: asesor.telefono,
      codigo: asesor.codigo,
    }));

    const csv = Papa.unparse(csvData);
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', 'asesores.csv');
    link.click();
  }

  
  uploadFile(formData: FormData): void {
    let headers ;
    headers = headers.append('Accept', 'application/json');
    console.log('Archivo enviado al servidor principal'),
      (error) => console.error('Error al enviar el archivo al servidor principal', error);
  }
  

}
