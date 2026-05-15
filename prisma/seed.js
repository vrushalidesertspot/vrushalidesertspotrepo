const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  const cakes = [
    {
      name: "Classic Chocolate Truffle",
      category: "Chocolate Cakes",
      price: 899,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
      description: "Rich chocolate layers with smooth truffle filling, topped with chocolate ganache",
      isAvailable: true,
    },
    {
      name: "Red Velvet Dream",
      category: "Birthday Cakes",
      price: 999,
      image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800",
      description: "Classic red velvet with cream cheese frosting and elegant decorations",
      isAvailable: true,
    },
    {
      name: "Vanilla Bean Paradise",
      category: "Birthday Cakes",
      price: 799,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
      description: "Light and fluffy vanilla cake with real vanilla bean specks and buttercream",
      isAvailable: true,
    },
    {
      name: "Black Forest Delight",
      category: "Chocolate Cakes",
      price: 849,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
      description: "Traditional black forest with cherries, whipped cream, and chocolate shavings",
      isAvailable: true,
    },
    {
      name: "Butterscotch Crunch",
      category: "Birthday Cakes",
      price: 749,
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800",
      description: "Caramel butterscotch cake with crunchy praline and caramel drizzle",
      isAvailable: true,
    },
    {
      name: "Pineapple Paradise",
      category: "Birthday Cakes",
      price: 699,
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800",
      description: "Fresh pineapple cake with whipped cream and cherry topping",
      isAvailable: true,
    },
    {
      name: "Death by Chocolate",
      category: "Chocolate Cakes",
      price: 1099,
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800",
      description: "Ultimate chocolate experience with multiple chocolate layers and fudge",
      isAvailable: true,
    },
    {
      name: "Strawberry Shortcake",
      category: "Birthday Cakes",
      price: 849,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
      description: "Light sponge cake with fresh strawberries and whipped cream",
      isAvailable: true,
    },
  ]

  console.log("Seeding cakes...")
  for (const cake of cakes) {
    await prisma.cake.create({
      data: cake
    })
  }
  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
