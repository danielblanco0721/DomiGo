"use server"

import { sql } from "@/lib/db"
import { cookies } from "next/headers"

// Añadir estas funciones simples para simular hash y compare
async function hash(password: string, saltRounds: number): Promise<string> {
  // En un entorno real, usarías bcrypt.hash
  return `hashed_${password}`
}

async function compare(password: string, hashedPassword: string): Promise<boolean> {
  // En un entorno real, usarías bcrypt.compare
  return hashedPassword === `hashed_${password}`
}

export async function registerUser(formData: FormData) {
  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const userType = formData.get("userType") as string

  // Validación básica
  if (!username || !email || !password || !confirmPassword || !userType) {
    return { success: false, error: "Todos los campos son obligatorios" }
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Las contraseñas no coinciden" }
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} OR username = ${username}
    `

    if (existingUser.length > 0) {
      return { success: false, error: "El usuario o correo ya está registrado" }
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 10)

    // Insertar usuario en la base de datos
    const result = await sql`
      INSERT INTO users (username, email, password, user_type, created_at)
      VALUES (${username}, ${email}, ${hashedPassword}, ${userType}, NOW())
      RETURNING id, username, email, user_type
    `

    if (result.length > 0) {
      return { success: true, user: result[0] }
    } else {
      return { success: false, error: "Error al crear el usuario" }
    }
  } catch (error) {
    console.error("Error en el registro:", error)
    return { success: false, error: "Error en el servidor" }
  }
}

export async function loginUser(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { success: false, error: "Todos los campos son obligatorios" }
  }

  try {
    // Buscar usuario por nombre de usuario en lugar de email
    const users = await sql`
      SELECT * FROM users WHERE username = ${username}
    `

    if (users.length === 0) {
      return { success: false, error: "Credenciales inválidas" }
    }

    const user = users[0]

    // Verificar contraseña
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return { success: false, error: "Credenciales inválidas" }
    }

    // Crear sesión
    const session = {
      userId: user.id,
      username: user.username,
      email: user.email,
      userType: user.user_type,
    }

    // Guardar sesión en cookies
    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    })

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        userType: user.user_type,
      },
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error)
    return { success: false, error: "Error en el servidor" }
  }
}
