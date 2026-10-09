export class Temporal {
  id: number;
  nombre: string;
  edad: number;

  constructor(id: number, nombre: string, edad: number) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
  }
}

export const usuarios: Temporal[] = [];

let ultimoId = 0;

export function generarSiguienteId(): number {
  let mayorIdExistente = 0;
  for (const usuario of usuarios) {
    if (usuario.id > mayorIdExistente) {
      mayorIdExistente = usuario.id;
    }
  }
  ultimoId = Math.max(ultimoId, mayorIdExistente) + 1;
  return ultimoId;
}

 
// N.º | Consulta o prompt utilizado | Objetivo de la consulta | Información o palabras clave obtenidas | ¿Cómo llevó a la siguiente consulta?
// 1 | "Generar la estructura inicial de un proyecto NestJS para la gestión de usuarios con módulo, controlador y servicio." | Crear la arquitectura base del backend para administrar usuarios. | NestJS CLI, UsuariosController, UsuariosService, UsuariosModule, decoradores HTTP. | Necesitaba una forma sencilla de guardar los datos sin configurar una base de datos externa.
// 2 | "Crear un archivo temporal.ts con una clase Usuario y un arreglo en memoria para simular una base de datos." | Configurar un almacén volátil en RAM para persistir información durante la ejecución. | Clase Temporal, export const usuarios = [], almacenamiento temporal en memoria. | Una vez creado el archivo de datos, debía conectar este arreglo con el servicio para manipularlo.
// 3 | "Escribir los métodos CRUD en UsuariosService manipulando el arreglo temporal mediante bucles e iteraciones manuales." | Implementar las operaciones básicas de consulta, registro, actualización y eliminación. | Búsqueda por bucle for...of, operaciones de arreglo, métodos GET, POST, PATCH y DELETE. | Al probar el registro de usuarios, la solicitud no leía los datos enviados en el JSON.
// 4 | "Cómo recibir el cuerpo JSON en una petición POST dentro de un controlador de NestJS usando @Body()." | Corregir la lectura de datos del cliente en las solicitudes de creación. | Decorador @Body(), parseo de payload JSON, DTO de entrada. | Con el registro funcionando, procedí a probar la persistencia de datos en el cliente HTTP.
// 5 | "Ejemplos de cómo probar peticiones GET y POST de usuarios en Postman y verificar las respuestas JSON." | Validar que la API guardara y retornara la lista de usuarios correctamente. | Postman, HTTP Status 200 OK, 201 Created, inspección de JSON en memoria. | Verificado el CRUD básico, quise expandir el proyecto agregando otros verbos del estándar HTTP.
// 6 | "Cómo implementar el método PUT en NestJS para reemplazar completamente un objeto de usuario por su ID." | Permitir la sobreescritura total de un usuario existente en el arreglo. | Verbo PUT, sustitución de propiedades, actualización por identificador. | Decidí agregar métodos informativos para consultar el estado del servidor sin recibir todo el cuerpo.
// 7 | "Cómo retornar únicamente encabezados personalizados como X-Total-Usuarios en una ruta HEAD en NestJS." | Implementar la ruta HEAD /usuarios para enviar métricas del backend omitiendo el payload. | Método HEAD, res.header(), X-Total-Usuarios, respuesta sin body. | Para complementar la inspección de la API, faltaba informar qué métodos HTTP acepta la ruta.
// 8 | "Cómo configurar una respuesta OPTIONS /usuarios que devuelva el encabezado Allow con los métodos soportados." | Exponer los verbos HTTP autorizados mediante el encabezado estándar de comunicación. | Método OPTIONS, encabezado 'Allow', verbos HTTP soportados, inspección REST. | Noté que la lógica de encabezados se repetía, así que busqué optimizar el servicio.
// 9 | "Refactorizar el servicio en NestJS para crear un método auxiliar que construya los encabezados X-Total-Usuarios, X-API-Estado y Allow." | Evitar duplicación de código entre los métodos HEAD y OPTIONS centralizando la creación de cabeceras. | Métodos helper, reutilización de código, controladores más limpios y legibles. | El paso final fue probar en Postman que los encabezados refinados funcionaran correctamente.
// 10 | "Cómo verificar los encabezados HTTP recibidos en Postman al hacer solicitudes HEAD y OPTIONS." | Confirmar que el cliente reciba las métricas y el encabezado Allow con el cuerpo totalmente vacío. | Pestaña Headers en Postman, código 200 OK, verificación de metadatos. | Se confirmó el funcionamiento completo de la API.