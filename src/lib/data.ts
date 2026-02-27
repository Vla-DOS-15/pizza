import { Ingredient, Product } from "./types";

export const INGREDIENTS: Record<string, Ingredient> = {
  chicken: {
    id: "chicken",
    name: { uk: "Курка", en: "Chicken" },
    category: "meat",
    price: 35,
  },
  salami: {
    id: "salami",
    name: { uk: "Салямі", en: "Salami" },
    category: "meat",
    price: 45,
  },
  pepperoni: {
    id: "pepperoni",
    name: { uk: "Пепероні", en: "Pepperoni" },
    category: "meat",
    price: 50,
  },
  bacon: {
    id: "bacon",
    name: { uk: "Бекон", en: "Bacon" },
    category: "meat",
    price: 55,
  },
  ham: {
    id: "ham",
    name: { uk: "Шинка", en: "Ham" },
    category: "meat",
    price: 45,
  },

  mozzarella: {
    id: "mozzarella",
    name: { uk: "Моцарела", en: "Mozzarella" },
    category: "cheese",
    price: 40,
  },
  cheddar: {
    id: "cheddar",
    name: { uk: "Чедер", en: "Cheddar" },
    category: "cheese",
    price: 45,
  },
  parmesan: {
    id: "parmesan",
    name: { uk: "Пармезан", en: "Parmesan" },
    category: "cheese",
    price: 60,
  },
  dorblu: {
    id: "dorblu",
    name: { uk: "Дорблю", en: "Blue Cheese" },
    category: "cheese",
    price: 65,
  },
  feta: {
    id: "feta",
    name: { uk: "Фета", en: "Feta" },
    category: "cheese",
    price: 40,
  },

  tomatoes: {
    id: "tomatoes",
    name: { uk: "Помідори", en: "Tomatoes" },
    category: "vegetables",
    price: 20,
  },
  mushrooms: {
    id: "mushrooms",
    name: { uk: "Печериці", en: "Mushrooms" },
    category: "vegetables",
    price: 25,
  },
  onions: {
    id: "onions",
    name: { uk: "Кримська цибуля", en: "Red Onions" },
    category: "vegetables",
    price: 15,
  },
  bellPepper: {
    id: "bellPepper",
    name: { uk: "Болгарський перець", en: "Bell Pepper" },
    category: "vegetables",
    price: 25,
  },
  olives: {
    id: "olives",
    name: { uk: "Маслини", en: "Olives" },
    category: "vegetables",
    price: 30,
  },
  pineapple: {
    id: "pineapple",
    name: { uk: "Ананаси", en: "Pineapple" },
    category: "vegetables",
    price: 35,
  },
  pickles: {
    id: "pickles",
    name: { uk: "Мариновані огірки", en: "Pickles" },
    category: "vegetables",
    price: 20,
  },
  jalapeno: {
    id: "jalapeno",
    name: { uk: "Халапеньйо", en: "Jalapeno" },
    category: "vegetables",
    price: 30,
  },

  tomatoSauce: {
    id: "tomatoSauce",
    name: { uk: "Томатний соус", en: "Tomato Sauce" },
    category: "sauces",
    price: 15,
  },
  whiteSauce: {
    id: "whiteSauce",
    name: { uk: "Вершковий соус", en: "White Sauce" },
    category: "sauces",
    price: 15,
  },
  garlicSauce: {
    id: "garlicSauce",
    name: { uk: "Часниковий соус", en: "Garlic Sauce" },
    category: "sauces",
    price: 15,
  },
  bbqSauce: {
    id: "bbqSauce",
    name: { uk: "Соус BBQ", en: "BBQ Sauce" },
    category: "sauces",
    price: 20,
  },
  cheeseSauce: {
    id: "cheeseSauce",
    name: { uk: "Сирний соус", en: "Cheese Sauce" },
    category: "sauces",
    price: 20,
  },
};

export const ALL_INGREDIENTS_LIST = Object.values(INGREDIENTS);

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    category: "pizza",
    name: { uk: "М'ясна", en: "Meat Supreme" },
    description: {
      uk: "Ситна піца з куркою, салямі, беконом та подвійним сиром на томатній основі.",
      en: "Hearty pizza with chicken, salami, bacon, and double cheese on a tomato base.",
    },
    imageUrl: "/images/pizza-meat.png",
    variations: [
      { size: 30, price: 285, weight: 580 },
      { size: 40, price: 380, weight: 890 },
    ],
    allowedCrusts: [
      { type: "thin", price: 0 },
      { type: "thick", price: 0 },
    ],
    allowedEdges: [
      { type: "standard", price: 0 },
      { type: "cheese", price: 50 },
      { type: "sausage", price: 65 },
    ],
    defaultIngredients: [
      INGREDIENTS.tomatoSauce,
      INGREDIENTS.mozzarella,
      INGREDIENTS.chicken,
      INGREDIENTS.salami,
      INGREDIENTS.bacon,
    ],
  },
  {
    id: "p2",
    category: "pizza",
    name: { uk: "Пепероні", en: "Pepperoni" },
    description: {
      uk: "Класична піца з великою кількістю пікантної пепероні та тягучою моцарелою.",
      en: "Classic pizza with lots of spicy pepperoni and stretchy mozzarella.",
    },
    imageUrl: "/images/pizza-pepperoni.png",
    variations: [
      { size: 30, price: 250, weight: 520 },
      { size: 40, price: 340, weight: 800 },
    ],
    allowedCrusts: [
      { type: "thin", price: 0 },
      { type: "thick", price: 0 },
    ],
    allowedEdges: [
      { type: "standard", price: 0 },
      { type: "cheese", price: 50 },
      { type: "sausage", price: 65 },
    ],
    defaultIngredients: [
      INGREDIENTS.tomatoSauce,
      INGREDIENTS.mozzarella,
      INGREDIENTS.pepperoni,
    ],
  },
  {
    id: "p3",
    category: "pizza",
    name: { uk: "Чотири Сири", en: "Four Cheese" },
    description: {
      uk: "Ідеальне поєднання моцарели, чедеру, пармезану та благородного дорблю на вершковій основі.",
      en: "Perfect blend of mozzarella, cheddar, parmesan, and noble blue cheese on a creamy base.",
    },
    imageUrl: "/images/pizza-4cheese.png",
    variations: [
      { size: 30, price: 295, weight: 490 },
      { size: 40, price: 395, weight: 750 },
    ],
    allowedCrusts: [
      { type: "thin", price: 0 },
      { type: "thick", price: 0 },
    ],
    allowedEdges: [
      { type: "standard", price: 0 },
      { type: "cheese", price: 50 },
    ],
    defaultIngredients: [
      INGREDIENTS.whiteSauce,
      INGREDIENTS.mozzarella,
      INGREDIENTS.cheddar,
      INGREDIENTS.parmesan,
      INGREDIENTS.dorblu,
    ],
  },
  {
    id: "p4",
    category: "pizza",
    name: { uk: "Гавайська", en: "Hawaiian" },
    description: {
      uk: "Тропічна класика: ніжна шинка, солодкі ананаси та моцарела.",
      en: "Tropical classic: tender ham, sweet pineapples, and mozzarella.",
    },
    imageUrl: "/images/pizza-hawaiian.png",
    variations: [
      { size: 30, price: 260, weight: 540 },
      { size: 40, price: 350, weight: 820 },
    ],
    allowedCrusts: [
      { type: "thin", price: 0 },
      { type: "thick", price: 0 },
    ],
    allowedEdges: [
      { type: "standard", price: 0 },
      { type: "cheese", price: 50 },
      { type: "sausage", price: 65 },
    ],
    defaultIngredients: [
      INGREDIENTS.whiteSauce,
      INGREDIENTS.mozzarella,
      INGREDIENTS.ham,
      INGREDIENTS.pineapple,
    ],
  },
  {
    id: "p5",
    category: "pizza",
    name: { uk: "BBQ з куркою", en: "Chicken BBQ" },
    description: {
      uk: "Насичений смак завдяки соусу барбекю, курці, бекону та кримській цибулі.",
      en: "Rich flavor thanks to BBQ sauce, chicken, bacon, and red onions.",
    },
    imageUrl: "/images/pizza-bbq.png",
    variations: [
      { size: 30, price: 275, weight: 560 },
      { size: 40, price: 365, weight: 850 },
    ],
    allowedCrusts: [
      { type: "thin", price: 0 },
      { type: "thick", price: 0 },
    ],
    allowedEdges: [
      { type: "standard", price: 0 },
      { type: "cheese", price: 50 },
      { type: "sausage", price: 65 },
    ],
    defaultIngredients: [
      INGREDIENTS.bbqSauce,
      INGREDIENTS.mozzarella,
      INGREDIENTS.chicken,
      INGREDIENTS.bacon,
      INGREDIENTS.onions,
    ],
  },

  {
    id: "b1",
    category: "burger",
    name: { uk: "Класичний Чізбургер", en: "Classic Cheeseburger" },
    description: {
      uk: "Соковита яловича котлета, сир чедер, свіжі томати, мариновані огірки та фірмовий соус.",
      en: "Juicy beef patty, cheddar cheese, fresh tomatoes, pickles, and signature sauce.",
    },
    imageUrl: "/images/burger-cheese.png",
    price: 185,
  },
  {
    id: "b2",
    category: "burger",
    name: { uk: "Подвійний Чізбургер", en: "Double Cheeseburger" },
    description: {
      uk: "Для тих, хто дуже голодний: дві яловичі котлети та подвійна порція сиру чедер.",
      en: "For the very hungry: two beef patties and a double portion of cheddar cheese.",
    },
    imageUrl: "/images/burger-double.png",
    price: 245,
  },
  {
    id: "b3",
    category: "burger",
    name: { uk: "Кріспі Чікен", en: "Crispy Chicken" },
    description: {
      uk: "Хрустка куряча котлета, свіжий салат, томати та ніжний часниковий соус.",
      en: "Crispy chicken patty, fresh lettuce, tomatoes, and tender garlic sauce.",
    },
    imageUrl: "/images/burger-chicken.png",
    price: 175,
  },
  {
    id: "b4",
    category: "burger",
    name: { uk: "BBQ Бекон", en: "BBQ Bacon Burger" },
    description: {
      uk: "Яловича котлета, хрусткий бекон, цибулеві кільця, чедер та насичений соус BBQ.",
      en: "Beef patty, crispy bacon, onion rings, cheddar, and rich BBQ sauce.",
    },
    imageUrl: "/images/burger-bbq.png",
    price: 215,
  },

  {
    id: "n1",
    category: "nuggets",
    name: { uk: "Курячі нагетси (6 шт)", en: "Chicken Nuggets (6 pcs)" },
    description: {
      uk: "Ніжне куряче філе в хрусткій золотистій паніровці.",
      en: "Tender chicken fillet in crispy golden breading.",
    },
    imageUrl: "/images/nuggets.png",
    price: 95,
  },
  {
    id: "n2",
    category: "nuggets",
    name: { uk: "Курячі нагетси (9 шт)", en: "Chicken Nuggets (9 pcs)" },
    description: {
      uk: "Більше нагетсів для тебе та друзів.",
      en: "More nuggets for you and your friends.",
    },
    imageUrl: "/images/nuggets-large.png",
    price: 135,
  },
  {
    id: "n3",
    category: "nuggets",
    name: { uk: "Сирні кульки з халапеньйо", en: "Jalapeno Cheese Balls" },
    description: {
      uk: "Хрусткі кульки з розплавленим сиром та пікантним перцем халапеньйо.",
      en: "Crispy balls with melted cheese and spicy jalapeno pepper.",
    },
    imageUrl: "/images/cheese-balls.png",
    price: 125,
  },
  {
    id: "n4",
    category: "nuggets",
    name: { uk: "Картопля Фрі", en: "French Fries" },
    description: {
      uk: "Класична, хрустка зовні та м'яка всередині. Ідеально підходить до бургерів.",
      en: "Classic, crispy on the outside and soft inside. Perfect with burgers.",
    },
    imageUrl: "/images/fries.png",
    price: 75,
  },

  {
    id: "d1",
    category: "drinks",
    name: { uk: "Кока-Кола", en: "Coca-Cola" },
    description: {
      uk: "Класичний освіжаючий напій.",
      en: "Classic refreshing drink.",
    },
    imageUrl: "/images/cola.png",
    variations: [
      { volume: 0.33, price: 35 },
      { volume: 0.5, price: 45 },
      { volume: 1.0, price: 75 },
    ],
  },
  {
    id: "d2",
    category: "drinks",
    name: { uk: "Спрайт", en: "Sprite" },
    description: {
      uk: "Освіжаючий лимонно-лаймовий смак.",
      en: "Refreshing lemon-lime flavor.",
    },
    imageUrl: "/images/sprite.png",
    variations: [
      { volume: 0.33, price: 35 },
      { volume: 0.5, price: 45 },
      { volume: 1.0, price: 75 },
    ],
  },
  {
    id: "d3",
    category: "drinks",
    name: { uk: "Сік Апельсиновий Rich", en: "Rich Orange Juice" },
    description: {
      uk: "100% апельсиновий сік без додавання цукру.",
      en: "100% orange juice with no added sugar.",
    },
    imageUrl: "/images/juice.png",
    variations: [
      { volume: 0.5, price: 55 },
      { volume: 1.0, price: 95 },
    ],
  },
  {
    id: "d4",
    category: "drinks",
    name: { uk: "Вода BonAqua (негазована)", en: "BonAqua Water (Still)" },
    description: {
      uk: "Чиста питна вода для втамування спраги.",
      en: "Pure drinking water to quench your thirst.",
    },
    imageUrl: "/images/water.png",
    variations: [
      { volume: 0.5, price: 30 },
      { volume: 1.5, price: 45 },
    ],
  },
];
