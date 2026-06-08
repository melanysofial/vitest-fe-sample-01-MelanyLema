import { describe, it, expect } from 'vitest';
import { validarTexto, formatearTexto } from '../../src/js/utils/texto.js';

// ============================================================
// Pruebas unitarias para validarTexto
// ============================================================
describe('validarTexto', () => {
  // --- Casos válidos ---
  it('debe retornar válido para un texto con 3 o más caracteres', () => {
    const resultado = validarTexto('Comprar pan');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('debe retornar válido para un texto con exactamente 3 caracteres', () => {
    const resultado = validarTexto('ABC');
    expect(resultado.valido).toBe(true);
  });

  it('debe retornar válido para un texto con 200 caracteres (límite)', () => {
    const texto = 'A'.repeat(200);
    const resultado = validarTexto(texto);
    expect(resultado.valido).toBe(true);
  });

  // --- Validar los casos no válidos ---
  it('debe retornar invalido cuando el texto está vacío', () => {
    //Arrange -Act
    const resultado = validarTexto(''); 
    //Assert
    expect(resultado.valido).toBe(false); //tiene que estar vacío
    expect(resultado.error).toContain('no puede estar vacío');
  });

  it('debe retornar invalido cuando el texto tiene menos de 3 caracteres', () => {
    const resultado = validarTexto('Hi');
    expect(resultado.valido).toBe(false);
    expect(resultado.error).toContain('al menos 3 caracteres');
  });

  //Hacer : formatearTexto: texto con caracteres especiales como "árbol" (debe resultar en "Árbol").
  //        formatearTexto: texto que ya está correctamente formateado (no debe alterarse).

});

// ============================================================
// Pruebas unitarias para formatearTexto
// ============================================================
describe('formatearTexto', () => {
  it('debe convertir la primera letra a mayúscula y el resto a minúscula', () => {
    const resultado = formatearTexto('hOLA MUNDO');
    expect(resultado).toBe('Hola mundo');
  });

  it('debe retornar un string vacío si se ingresa un string vacío', () => {
    const resultado = formatearTexto('');
    expect(resultado).toBe('');
  });

// Agregado
  it('debe retornar un string vacío si solo hay espacios', () => {
    const resultado = formatearTexto('   ');
    expect(resultado).toBe('');
  });
  
});
