const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")

const app = express()
const PORT = process.env.PORT || 4500

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password", // Cambia esto por tu contraseña de MySQL
  database: "domi_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Inicializar la base de datos
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection()

    // Crear tabla de usuarios si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        user_type ENUM('establecimiento', 'domigo', 'domicliente') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    connection.release()
    console.log("Base de datos inicializada correctamente")
  } catch (error) {
    console.error("Error inicializando la base de datos:", error)
  }
}

// Inicializar la base de datos al arrancar el servidor
initializeDatabase()

// Rutas de autenticación
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password, userType } = req.body

    // Validación básica
    if (!username || !email || !password || !userType) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son obligatorios",
      })
    }

    // Verificar si el usuario ya existe
    const [existingUsers] = await pool.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username])

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        error: "El usuario o correo ya está registrado",
      })
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insertar usuario en la base de datos
    const [result] = await pool.query("INSERT INTO users (username, email, password, user_type) VALUES (?, ?, ?, ?)", [
      username,
      email,
      hashedPassword,
      userType,
    ])

    if (result.affectedRows > 0) {
      // Obtener el usuario recién creado
      const [users] = await pool.query("SELECT id, username, email, user_type FROM users WHERE id = ?", [
        result.insertId,
      ])

      return res.status(201).json({
        success: true,
        user: users[0],
      })
    } else {
      return res.status(500).json({
        success: false,
        error: "Error al crear el usuario",
      })
    }
  } catch (error) {
    console.error("Error en el registro:", error)
    return res.status(500).json({
      success: false,
      error: "Error en el servidor",
    })
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body

    // Validación básica
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son obligatorios",
      })
    }

    // Buscar usuario por nombre de usuario
    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [username])

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas",
      })
    }

    const user = users[0]

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas",
      })
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "tu_secreto_jwt", // Cambia esto por una clave secreta más segura
      { expiresIn: "7d" },
    )

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        userType: user.user_type,
      },
    })
  } catch (error) {
    console.error("Error en el inicio de sesión:", error)
    return res.status(500).json({
      success: false,
      error: "Error en el servidor",
    })
  }
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
})
