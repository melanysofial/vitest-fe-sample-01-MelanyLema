import { describe, it, expect, beforeEach } from 'vitest';
import {
  crearTareaElemento,
  agregarTarea,
  eliminarTarea,
  alternarTarea,
  limpiarCompletadas,
  actualizarContador,
  mostrarError,
} from '../../src/js/dom/todo.js';

// Helper: crea una lista <ul> fresca para cada prueba
function crearLista() {
  return document.createElement('ul');
}

// ============================================================
// Pruebas de integración — manipulación del DOM
// ============================================================
describe('crearTareaElemento', () => {
  it('debe crear un elemento <li> con la clase "tarea-item"', () => {
    const li = crearTareaElemento('Test');
    expect(li.tagName).toBe('LI');
    expect(li.classList.contains('tarea-item')).toBe(true);
  });

  
});

describe('agregarTarea', () => {
  let lista;

  beforeEach(() => {
    lista = crearLista();
  });

  it('debe agregar un <li> a la lista cuando el texto es válido', () => {
    const resultado = agregarTarea('Aprender vitest', lista);
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Aprender vitest');
  });

  it ('debe fomratear el texto antes de antes de agregarlo (primero mayuscula segundo minuscula', () => {
    agregarTarea(' eSTudIAR VeRiFIcaCIon de SW', lista); // <-- Aquí faltaba el parámetro 'lista'
    const span = lista.querySelector('.tarea-texto');
    expect(span.textContent).toBe('Estudiar verificacion de sw');
  });
  
});

describe('eliminarTarea', () => {
  it('debe eliminar el elemento <li> del DOM', () => {
    const lista = crearLista();
    agregarTarea('Tarea a eliminar', lista);
    const li = lista.querySelector('.tarea-item');

    eliminarTarea(li);
    expect(lista.children.length).toBe(0);
  });
});

describe('alternarTarea', () => {
  it('debe agregar la clase "completada" cuando el checkbox está marcado', () => {
    const li = crearTareaElemento('Tarea test');
    const checkbox = li.querySelector('.tarea-checkbox');
    checkbox.checked = true;

    alternarTarea(li, checkbox);
    expect(li.classList.contains('completada')).toBe(true);
  });

  
});

describe('limpiarCompletadas', () => {
  it('debe eliminar solo las tareas completadas', () => {
    const lista = crearLista();
    agregarTarea('Tarea pendiente', lista);
    agregarTarea('Tarea completada', lista);

    // Marcar la segunda como completada
    const items = lista.querySelectorAll('.tarea-item');
    const checkbox = items[1].querySelector('.tarea-checkbox');
    checkbox.checked = true;
    alternarTarea(items[1], checkbox);

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(1);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Tarea pendiente');
  });

  
});

describe('actualizarContador', () => {
  it('debe mostrar "0 tareas" cuando la lista está vacía', () => {
    const lista = crearLista();
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('0 tareas');
  });

  it('debe mostrar "1 tarea" cuando hay exactamente un elemento', () => {
    const lista = crearLista();
    agregarTarea('Única tarea', lista);
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('1 tarea');
  });

  
});

describe('mostrarError', () => {
  it('debe establecer el texto del contenedor con el mensaje de error', () => {
    const contenedor = document.createElement('div');
    mostrarError('Error de prueba', contenedor);
    expect(contenedor.textContent).toBe('Error de prueba');
  });

  
});

// ============================================================
// Pruebas adicionales — Tarea 2
// ============================================================
describe('Pruebas adicionales — Tarea 2', () => {
  let lista;

  beforeEach(() => {
    lista = crearLista();
  });

  it('debe eliminar la tarea de la lista si se da clic en el boton de eliminar', () => {
    const li = crearTareaElemento('Tarea nueva');
    lista.appendChild(li);
    expect(lista.children.length).toBe(1);

    const btnEliminar = li.querySelector('.tarea-eliminar') || li.querySelector('button');
    btnEliminar.click();

    expect(lista.children.length).toBe(0);
  });

  it('debe alternar la clase completada cuando el checkbox cambia de estado', () => {
    const li = crearTareaElemento('Probar evento change');
    const checkbox = li.querySelector('.tarea-checkbox');

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    expect(li.classList.contains('completada')).toBe(true);
  });

  it('debe agregar la tarea con un texto de exactamente 200 caracteres', () => {
    const textoLargo = 'A'.repeat(200);
    const resultado = agregarTarea(textoLargo, lista);

    // Formamos el texto como lo dejaría formatearTexto (Primera Mayúscula, resto minúsculas)
    const textoFormateadoEsperado = 'A' + 'a'.repeat(199);

    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe(textoFormateadoEsperado);
  });

  it('debe dejar la lista vacia si se limpian y todas estaban completadas', () => {
    agregarTarea('Tarea 1', lista);
    agregarTarea('Tarea 2', lista);

    const items = lista.querySelectorAll('.tarea-item');
    items.forEach(item => {
      const checkbox = item.querySelector('.tarea-checkbox');
      checkbox.checked = true;
      alternarTarea(item, checkbox);
    });

    const eliminadas = limpiarCompletadas(lista);
    
    expect(eliminadas).toBe(2);
    expect(lista.children.length).toBe(0);
  });
});