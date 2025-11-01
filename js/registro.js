// Registro.js
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { 
  getFirestore, collection, addDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA6i5fOo7_g_GyvVDZqA3KdI0wL46LSBmw",
    authDomain: "studio-6064256749-30e66.firebaseapp.com",
    projectId: "studio-6064256749-30e66",
    storageBucket: "studio-6064256749-30e66.appspot.com",
    messagingSenderId: "196390592287",
    appId: "1:196390592287:web:302538191937b337735a2a"
  };
// 🔧 Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Captura del formulario
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtiene los valores del formulario
  const usuario = document.getElementById("Usu").value.trim();
  const clave = document.getElementById("Contra").value.trim();
  const correo = document.getElementById("Corr").value.trim();
  const direccion = document.getElementById("Dire").value.trim();
  const telefono = document.getElementById("Tel").value.trim();

  // Validación simple
  if (!usuario || !clave || !correo || !direccion || !telefono) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    // Guarda los datos en Firestore
    await addDoc(collection(db, "usuarios"), {
      usuario,
      clave,
      correo,
      direccion,
      telefono,
      fechaRegistro: new Date()
    });

    alert("✅ Cuenta creada exitosamente. Serás redirigido a iniciar sesión...");

    // 🔄 Redirección después de 2 segundos
    setTimeout(() => {
      window.location.href = "login.html"; // 🔁 Cambia esto si tu archivo tiene otro nombre
    }, 2000);

  } catch (error) {
    console.error("❌ Error al guardar los datos:", error);
    alert("Hubo un error al crear la cuenta. Revisa la consola.");
  }
});
