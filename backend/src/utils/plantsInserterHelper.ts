import { Plant } from "../models/plant.model";

interface PlantType {
  productName: string;
  price: string;
  description: string;
  cycle: ("Annual" | "Biennial" | "Perennial")[];
  imageUrl: string | null;
  isedible: boolean | null;
  sunlight: "Full" | "Full to part shade" | "Partial shade to full shade";
}

const plantsInserter = async () => {
  const plantsData: PlantType[] = [
    {
      productName: "Kale 'Lerchenzungen'",
      price: "42",
      description:
        "This variety of kale has green leaves and curly bits. The plant is usually grown as an annual, but if grown as a perennial, it will form seeds in the second year. It can be grown as baby salad greens or for bunching adult leaves. Leaves are sweeter after a frost and delicious eaten raw, added to salads, sautéed, or added to stews and casseroles.",
      cycle: ["Annual", "Biennial"],
      imageUrl: "https://roztownsend.net/seedly-assets/Kale-Lerchenzungen.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Salsify 'Sandwich Island'",
      price: "36",
      description:
        "Salsify is a perennial plant grown as an annual for it''s edible root and leaves. It does well in cool weather and is cultivated similarly to carrots and parsnips. The leaves look like a clump of coarse grass with starry pink to purple flowers. The greens and flowers can be used in salads. The taproot has an oyster-like taste that can be eaten boiled or mashed. Take extra care not to break the roots while harvesting.",
      cycle: ["Annual", "Perennial"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Salsify-Sandwich-Island.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Corn 'Sweet Nugget'",
      price: "42",
      description:
        "An excellent super-sweet variety harvested mid-season. Has a great yield with long ears and big kernels. Great for barbecuing.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Corn-Sweet-Nugget.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "White Mulberry",
      price: "57",
      description:
        "Mulberry fruit have a deep, sweet flavor and are eaten fresh, made into jams or wine, and baked into desserts. Drape trees with netting to ensure a harvest, since birds love the fruit. Sow the seeds indoors and let them rest for a couple months before planting outside.",
      cycle: ["Perennial"],
      imageUrl: "https://roztownsend.net/seedly-assets/White-Mulberry.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Strawberry 'Merlan'",
      price: "45",
      description:
        "Cute pink flowers showcase this ornamental and tasty strawberry. Berries are large and sweet, but this variety is compact with not much in the way of runners or other messiness. Good for containers or balconies.",
      cycle: ["Perennial"],
      imageUrl: "https://roztownsend.net/seedly-assets/Strawberry-Merlan.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Ramps (Wild Garlic)",
      price: "32",
      description:
        "A leafy cousin of leeks, the leaves of ramps are a great spring alternative to other alliums used in cooking. Plant in the spring to let them settle for the year, then harvest next spring. Lovely flowers, too.",
      cycle: ["Perennial"],
      imageUrl: "https://roztownsend.net/seedly-assets/Ramps-Wild-Garlic.webp",
      isedible: true,
      sunlight: "Partial shade to full shade",
    },
    {
      productName: "Dill 'Como'",
      price: "39",
      description:
        "Tasty, fresh, and just a bit licorice-like, dill is a classic culinary herb that every gardener needs in their yards. Use this variety for fresh pickles, fish or salads.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Dill-Como.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Lavender 'Lovely Sky'",
      price: "48",
      description:
        "Soothing, mild and showy! Lovely sky will be a lovely, fragrant addition to any herb garden. This variety is particularly grate for culinary uses such as lavender ice cream or lavender lemonade.",
      cycle: ["Perennial"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Lavender-Lovely-Sky.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Basil 'Genovese'",
      price: "35",
      description:
        "The classic big-and-tasty basil. Make sure to keep it sunny and well watered! Use with tomato and mozzarella.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Basil-Genovese.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Tomato 'Paola'",
      price: "50",
      description:
        "A summer favorite on the sweeter-end of the tomato spectrum. Bright, showy and smells great while fruiting.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Tomato-Paola.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Cucumber 'Max'",
      price: "56",
      description:
        "Skip the stores and grow the biggest cucumbers on the block. Great for big salads.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Cucumber-Max.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Calendula",
      price: "42",
      description:
        "Medicinal, culinary and just pretty in the summer. Get some calendula to attract pollinators and keep things cheery.",
      cycle: ["Annual", "Perennial"],
      imageUrl: "https://roztownsend.net/seedly-assets/Calendula.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Chess Flower",
      price: "32",
      description:
        "A unique, purple and white chessboard pattern is the key sign of these spring flowers. Plant them once and keep them as a conversation point in your garden for years to come.",
      cycle: ["Perennial"],
      imageUrl: "https://roztownsend.net/seedly-assets/Chess-Flower.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      productName: "Sunflower 'Ring of Fire'",
      price: "42",
      description:
        "Medium-sized for a sunflower but with gorgeous patterning. Keep it around for a bit of extra warmth in the garden.",
      cycle: ["Annual"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Sunflower-Ring-of-Fire.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      productName: "Nasturtium",
      price: "57",
      description:
        "The leaves are tasty in salads with a peppery kick. Vibrant mix of red, orange and yellow flowers. Unique-shaped seeds to keep as trinkets. Keep track of it, though - these like to crawl!",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Nasturtium.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Poppy 'Lady Bird'",
      price: "45",
      description:
        "The classic summer red poppy with a twist - black bits like a cute lady bug. Medium size and height.",
      cycle: ["Annual", "Perennial"],
      imageUrl: "https://roztownsend.net/seedly-assets/Poppy-Lady-Bird.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Zinnia",
      price: "32",
      description:
        "Easy to grow with heavy, brightly colored blossoms. Can grow singularly with an upright stem or turn into a little shrub. (It's a surprise!)",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Zinnia.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      productName: "Petunia 'Night Sky'",
      price: "39",
      description:
        "The iconic sign of spring in itty bitty flower form. Great for attracting pollinators and cleaning up any drab but sunny spot in the garden.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Petunia-Night-Sky.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      productName: "Lingonberry",
      price: "38",
      description:
        "Small and evergreen with tart berries. Big for foragers, but why forage when you can have them in your front yard?",
      cycle: ["Perennial"],
      imageUrl: "https://roztownsend.net/seedly-assets/Lingonberry.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },
    {
      productName: "Alpine Strawberry 'Regina'",
      price: "42",
      description:
        "You want strawberry candy in its natural form? Get alpine strawberries! Cute, tiny, with lovely flowers and the best tasting strawberries you've ever had.",
      cycle: ["Perennial"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Alpine-Strawberry-Regina.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Bog Myrtle",
      price: "57",
      description:
        "Unappealing name, but the most lovely plant you'll ever smell. Put this in an acidic, wet place where nothing else can grow - and enjoy.",
      cycle: ["Perennial"],
      imageUrl: "https://roztownsend.net/seedly-assets/Bog-Myrtle.webp",
      isedible: false,
      sunlight: "Full to part shade",
    },
    {
      productName: "Pepper 'California Wonder'",
      price: "22",
      description:
        "Big old bell pepper with good size, and a sweet taste. Comes in a mix of red or yellow - or just pick them early and eat them all green.",
      cycle: ["Annual"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Pepper-California-Wonder.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Pepper 'Chocobell'",
      price: "45",
      description:
        "A unique bell pepper with a lovely chocolate brown coloring. Tastes a bit sweeter than your average bell.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Pepper-Chocobell.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Borage",
      price: "32",
      description:
        "Weird name, pretty flowers! Borage is also edible and gives a lovely cucumber note to salads and cold dishes.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Borage.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Cabbage 'Sunta'",
      price: "39",
      description:
        "Grow a cabbage. Live your dream. This is a tasty and easy-to-grow variety that is fairly insect-hardy.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Cabbage-Sunta.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Radish 'Red Celebration'",
      price: "38",
      description:
        "Delicate for a radish! Rosy red coloring adds a soft touch to vegetable plates and salads. You can also eat the greens!",
      cycle: ["Annual"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Radish-Red-Celebration.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: 'Squash "Waltham Butternut"',
      price: "39",
      description:
        "Great for thick soups and stews, this is a hardy squash variety that stores well after harvesting.",
      cycle: ["Annual"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Squash-Waltham-Butternut.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: 'Eggplant "Black Beauty"',
      price: "49",
      description:
        "Delicious grilled, roasted, in soups and stews, and breaded and fried. Your classic eggplant has arrived.",
      cycle: ["Annual"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Eggplant-Black-Beauty.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: 'Zucchini Squash "Keesha"',
      price: "49",
      description:
        "Look out, or you will be making zucchini bread for the next six months. This classic summer squash can get huge and plentiful if you are not careful - or if you do it intentionally! You do you.",
      cycle: ["Annual"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Zucchini-Squash-Keesha.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: 'Cosmos "Exsenia"',
      price: "59",
      description:
        "The classic cottage garden flower with a nostalgic air, cosmos are a great ornamental addition to any garden, and easy to grow.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Cosmos-Exsenia.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      productName: 'Pak Choi "Joi Choi"',
      price: "59",
      description:
        "A dense and crunchy leafy green perfect for stir fries and soups. Get your greens in and grow in spring or autumn!",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Pak-Choi-Joi-Choi.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: "Fennel",
      price: "38",
      description:
        "A crunchy veg with a taste like anise or licorice, fennel adds a light, punchy note to any stir-fry or pasta dish. Lots of potassium.",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Fennel.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      productName: 'Sunflower "Giganteous"',
      price: "20",
      description:
        "You want those huge sunflowers that look like they could fall over and kill someone? Welp, here they are. The classic sunflower for all your sunflowering needs.",
      cycle: ["Annual"],
      imageUrl:
        "https://roztownsend.net/seedly-assets/Sunflower-Giganteous.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      productName: 'Marigold "Red Gem"',
      price: "36",
      description:
        "Adds a dash of color, great for pollinators and a natural pest deterrent. What's not to love about marigolds!",
      cycle: ["Annual"],
      imageUrl: "https://roztownsend.net/seedly-assets/Marigold-Red-Gem.webp",
      isedible: false,
      sunlight: "Full",
    },
  ];
  try {
    const plants = await Plant.bulkCreate(plantsData);
    console.log(plants.length);
    console.log(plants[0] instanceof Plant);
  } catch (error) {
    console.error("Failed to bulk insert plants", error);
  }
};

export default plantsInserter;
