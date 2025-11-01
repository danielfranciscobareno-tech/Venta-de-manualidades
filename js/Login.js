// registro.js
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA6i5fOo7_g_GyvVDZqA3KdI0wL46LSBmw",
    authDomain: "studio-6064256749-30e66.firebaseapp.com",
    projectId: "studio-6064256749-30e66",
    storageBucket: "studio-6064256749-30e66.firebasestorage.app",
    messagingSenderId: "196390592287",
    appId: "1:196390592287:web:302538191937b337735a2a"
  };

// 🔧 Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Captura el formulario
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("Usu").value.trim();
  const clave = document.getElementById("Contra").value.trim();

  if (!usuario || !clave) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    // 🔍 Buscar usuario en Firestore
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("usuario", "==", usuario), where("clave", "==", clave));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("✅ Inicio de sesión exitoso. Redirigiendo...");

      // Puedes guardar datos en localStorage si deseas mantener la sesión
      localStorage.setItem("usuario", usuario);

      // 🔄 Redirigir a otra página (ajusta el nombre si es diferente)
      setTimeout(() => {
        window.location.href = "productos.html";
      }, 1500);
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }

  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    alert("Hubo un error al iniciar sesión. Revisa la consola.");
  }
});