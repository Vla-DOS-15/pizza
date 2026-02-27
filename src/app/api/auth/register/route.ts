import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, password, name } = body;

    if (!phone || !password) {
      return NextResponse.json(
        { message: "Телефон та пароль обов'язкові" },
        { status: 400 },
      );
    }

    // Перевіряємо, чи немає вже такого телефону в базі
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Користувач з таким номером вже існує" },
        { status: 409 },
      );
    }

    // Хешуємо пароль перед збереженням
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створюємо користувача
    const newUser = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        name: name || "",
      },
    });

    return NextResponse.json(
      { message: "Успішно зареєстровано", user: { id: newUser.id } },
      { status: 201 },
    );
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    return NextResponse.json(
      { message: "Внутрішня помилка сервера" },
      { status: 500 },
    );
  }
}
