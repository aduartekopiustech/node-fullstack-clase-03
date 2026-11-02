<div align="center">

<a href="https://nodejs.org/en" target="_blank"><img src="https://user-images.githubusercontent.com/3438503/260495760-ca5d8c24-b382-43d9-8fbe-d905b4b208f0.png" width="260" alt="Logo de Node.js" /></a>

# Clase 3 de NodeJS

### Kopius · The Academy · Cohort 05 · M2

**Continuación del reforzamiento de JavaScript: patrones, asincronía, estructuras de datos y closures**

![Node.js](https://img.shields.io/badge/Node.js-24.x-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

</div>

---

## CONTENIDO

1. [Adapter Pattern](#1-adapter-pattern)
2. [Promises](#2-promises)
3. [Async y Await](#3-async-y-await)
4. [Objetos](#4-objetos)
5. [Arrays](#5-arrays)
   - [Principales métodos de arrays](#principales-métodos-de-arrays)
   - [Desestructuración y Spread en arrays](#desestructuración-y-spread-en-arrays)
6. [Referencias](#referencias)

---

> [!NOTE]
> Esta clase continúa el **Reforzamiento de JavaScript** de la [Clase 2](https://github.com/aduartekopiustech/node-fullstack-clase-02). Allí trabajamos `Functions`, `Callbacks` y `Factory Functions`; ahora profundizamos en patrones, asincronía y estructuras de datos, y cerramos con **closures**, el concepto que explica todo lo anterior.

---

## 1. Adapter Pattern

El **patrón adaptador** es un patrón de diseño que permite transformar la estructura de datos o la interfaz de un componente para que sea compatible con otro.

Es especialmente útil cuando consumimos APIs externas y necesitamos adaptar sus respuestas a la estructura utilizada por nuestra aplicación.

**Ejemplo**

Supongamos que una API externa nos devuelve:

```javascript
const apiUser = {
  first_name: "John",
  last_name: "Doe",
};
```

Pero nuestra aplicación utiliza una propiedad llamada `fullName`.

Podemos crear una función adaptadora:

```javascript
const userAdapter = (user) => ({
  fullName: `${user.first_name} ${user.last_name}`,
});

const user = userAdapter(apiUser);

console.log(user.fullName); // John Doe
```

De esta manera, evitamos que nuestra aplicación dependa directamente de la estructura de datos de la API externa.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## 2. Promises

Una **promesa** representa el resultado futuro de una operación que puede completarse correctamente o fallar.

Una promesa puede encontrarse en tres estados:

| Estado        | Significado                            |
| ------------- | -------------------------------------- |
| **Pending**   | La operación todavía no terminó        |
| **Fulfilled** | La operación se completó correctamente |
| **Rejected**  | La operación falló                     |

**Ejemplo**

```javascript
const getUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "John" });
    }, 1000);
  });
};

getUser()
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
```

Después de aproximadamente un segundo, obtenemos:

```text
{ id: 1, name: 'John' }
```

Utilizamos `.then()` para procesar el resultado y `.catch()` para manejar posibles errores.

Las promesas son fundamentales para trabajar con operaciones asíncronas, como peticiones HTTP o consultas a bases de datos.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## 3. Async y Await

`async` y `await` permiten trabajar con promesas utilizando una sintaxis más sencilla y legible.

- **async:** declara una función asíncrona que siempre devuelve una promesa.
- **await:** espera el resultado de una promesa antes de continuar con la ejecución de esa función.

**Ejemplo**

Utilizando la función `getUser()` del ejemplo anterior:

```javascript
const showUser = async () => {
  try {
    const user = await getUser();

    console.log(user.name);
  } catch (error) {
    console.error(error);
  }
};

showUser();
```

**Resultado esperado:**

```text
John
```

Aunque utilizamos `await`, JavaScript no bloquea todo el programa mientras espera la respuesta. La función asíncrona suspende su ejecución y permite que otras tareas continúen.

El bloque `try/catch` permite manejar errores de una forma similar a la utilizada en código síncrono.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## 4. Objetos

Un **objeto** es una estructura de datos que permite almacenar información mediante pares de **clave y valor (key-value)**.

Los objetos son fundamentales en JavaScript porque nos permiten representar entidades, como usuarios, productos, criptomonedas o cualquier elemento de nuestra aplicación.

**Crear un objeto**

```javascript
const user = {
  id: 1,
  name: "John",
  age: 25,
  isActive: true,
};
```

Cada propiedad está formada por una clave (`name`) y un valor (`'John'`).

**Acceder a las propiedades**

Podemos acceder a las propiedades utilizando la notación de punto (`.`) o corchetes (`[]`).

```javascript
console.log(user.name); // John
console.log(user["age"]); // 25
```

**Agregar y modificar propiedades**

```javascript
user.email = "john@example.com";
user.age = 26;

console.log(user);
```

> [!NOTE]
> Aunque declaramos el objeto con `const`, podemos modificar sus propiedades. Lo que no podemos hacer es reasignar la variable `user` a otro objeto.

**Métodos de un objeto**

Un objeto también puede contener funciones, conocidas como métodos.

```javascript
const user = {
  name: "John",
  greet() {
    return `Hello, ${this.name}`;
  },
};

console.log(user.greet()); // Hello, John
```

**Desestructuración de objetos (Object Destructuring)**

La desestructuración permite extraer propiedades de un objeto y asignarlas a variables de manera más sencilla.

**Ejemplo**

```javascript
const crypto = {
  id: "bitcoin",
  symbol: "btc",
  price: 80800,
};

const { symbol, price } = crypto;

console.log(symbol); // btc
console.log(price); // 80800
```

También podemos renombrar las variables:

```javascript
const { price: currentPrice } = crypto;

console.log(currentPrice); // 80800
```

**Spread Operator en objetos (...)**

El operador spread (`...`) permite copiar propiedades de un objeto o combinar varios objetos.

**Ejemplo**

```javascript
const user = {
  name: "John",
  age: 25,
};

const updatedUser = {
  ...user,
  age: 26,
  isActive: true,
};

console.log(updatedUser);
```

**Resultado esperado:**

```javascript
{
  name: 'John',
  age: 26,
  isActive: true
}
```

Este mecanismo resulta especialmente útil para trabajar con **inmutabilidad**, evitando modificar directamente el objeto original.

> [!WARNING]
> Spread realiza una copia superficial (_shallow copy_). Los objetos anidados siguen compartiendo sus referencias.

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## 5. Arrays

Un **array** es una estructura de datos que permite almacenar múltiples valores dentro de una misma variable.

A diferencia de los objetos, sus elementos se organizan mediante índices numéricos que comienzan en `0`.

**Crear un array**

```javascript
const cryptocurrencies = ["Bitcoin", "Ethereum", "Stellar"];
```

**Acceder a sus elementos**

```javascript
console.log(cryptocurrencies[0]); // Bitcoin
console.log(cryptocurrencies[1]); // Ethereum
console.log(cryptocurrencies.length); // 3
```

**Agregar y eliminar elementos**

```javascript
const cryptocurrencies = ["Bitcoin", "Ethereum"];

// Agregar al final
cryptocurrencies.push("Stellar");

// Eliminar el último
cryptocurrencies.pop();

console.log(cryptocurrencies);
```

> [!NOTE]
> Los métodos `push()` y `pop()` modifican el array original.

**Arrays de objetos**

En aplicaciones reales es frecuente trabajar con arrays que contienen objetos.

Por ejemplo, una API puede devolver una colección de criptomonedas:

```javascript
const cryptocurrencies = [
  { id: 1, name: "Bitcoin", price: 80800 },
  { id: 2, name: "Ethereum", price: 3500 },
  { id: 3, name: "Stellar", price: 0.35 },
];
```

Podemos acceder a una propiedad de un objeto dentro del array:

```javascript
console.log(cryptocurrencies[0].name); // Bitcoin
console.log(cryptocurrencies[1].price); // 3500
```

### Principales métodos de arrays

JavaScript proporciona métodos que permiten recorrer, transformar y buscar elementos dentro de un array.

**`forEach()` — Recorrer elementos**

Ejecuta una función por cada elemento del array.

```javascript
const cryptocurrencies = ["Bitcoin", "Ethereum", "Stellar"];

cryptocurrencies.forEach((crypto) => {
  console.log(crypto);
});
```

**Resultado:**

```text
Bitcoin
Ethereum
Stellar
```

**`map()` — Transformar elementos**

Crea un nuevo array aplicando una transformación a cada elemento.

```javascript
const prices = [100, 200, 300];

const updatedPrices = prices.map((price) => price * 2);

console.log(updatedPrices); // [200, 400, 600]
```

El array original permanece sin modificaciones.

**`filter()` — Filtrar elementos**

Crea un nuevo array que contiene únicamente los elementos que cumplen una condición.

```javascript
const prices = [100, 200, 300, 400];

const filteredPrices = prices.filter((price) => price > 200);

console.log(filteredPrices); // [300, 400]
```

**`find()` — Buscar un elemento**

Devuelve el primer elemento que cumple una condición.

```javascript
const cryptocurrencies = [
  { id: 1, name: "Bitcoin" },
  { id: 2, name: "Ethereum" },
  { id: 3, name: "Stellar" },
];

const crypto = cryptocurrencies.find((item) => item.id === 2);

console.log(crypto); // { id: 2, name: 'Ethereum' }
```

Si no encuentra un elemento, devuelve `undefined`.

**`some()` y `every()` — Verificar condiciones**

`some()` comprueba si al menos un elemento cumple una condición.

`every()` comprueba si todos los elementos cumplen una condición.

```javascript
const prices = [100, 200, 300];

const hasExpensive = prices.some((price) => price > 250);
const allPositive = prices.every((price) => price > 0);

console.log(hasExpensive); // true
console.log(allPositive); // true
```

**`reduce()` — Acumular valores**

Permite recorrer un array y generar un único resultado acumulado.

```javascript
const prices = [100, 200, 300];

const total = prices.reduce((accumulator, price) => accumulator + price, 0);

console.log(total); // 600
```

### Desestructuración y Spread en arrays

**Array Destructuring**

Permite extraer elementos de un array y asignarlos a variables.

```javascript
const cryptocurrencies = ["Bitcoin", "Ethereum", "Stellar"];

const [first, second] = cryptocurrencies;

console.log(first); // Bitcoin
console.log(second); // Ethereum
```

También podemos intercambiar valores:

```javascript
let percentageA = 30;
let percentageB = 70;

[percentageA, percentageB] = [percentageB, percentageA];

console.log(percentageA); // 70
console.log(percentageB); // 30
```

**Spread Operator**

Podemos crear un nuevo array sin modificar el original.

```javascript
const cryptocurrencies = ["Bitcoin", "Ethereum"];

const updatedCryptos = [...cryptocurrencies, "Stellar"];

console.log(updatedCryptos);
// ['Bitcoin', 'Ethereum', 'Stellar']
```

<sub>[⬆ Volver al índice](#contenido)</sub>

---

## Referencias

- 📘 [MDN — Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- 📘 [MDN — async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- 📘 [MDN — Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
- 📘 [MDN — Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- 📘 [MDN — Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- 📘 [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- 🛠️ [Refactoring Guru — Adapter](https://refactoring.guru/design-patterns/adapter)

## Mentor

**Ariel Duarte** · Kopius · The Academy

<sub>[⬆ Volver al índice](#contenido)</sub>
