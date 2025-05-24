import { Plant } from "../models/plant.model";

interface PlantType {
  product_name: string;
  price: number;
  description: string;
  cycle: ("Annual" | "Biennial" | "Perennial")[];
  image_url: string | null;
  isedible: boolean | null;
  sunlight: "Full" | "Full to part shade" | "Partial shade to full shade";
}

const plantsInserter = async () => {
  const tinyPlantsData: PlantType[] = [
    {
      product_name: "Kale 'Lerchenzungen'",
      price: 42,
      description:
        "This variety of kale has green leaves and curly bits. The plant is usually grown as an annual, but if grown as a perennial, it will form seeds in the second year. It can be grown as baby salad greens or for bunching adult leaves. Leaves are sweeter after a frost and delicious eaten raw, added to salads, sautéed, or added to stews and casseroles.",
      cycle: ["Annual", "Biennial"],
      image_url:
        "https://roztownsend.net/seedly-assets/Kale-Lerchenzungen.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Salsify 'Sandwich Island'",
      price: 36,
      description:
        "Salsify is a perennial plant grown as an annual for it''s edible root and leaves. It does well in cool weather and is cultivated similarly to carrots and parsnips. The leaves look like a clump of coarse grass with starry pink to purple flowers. The greens and flowers can be used in salads. The taproot has an oyster-like taste that can be eaten boiled or mashed. Take extra care not to break the roots while harvesting.",
      cycle: ["Annual", "Perennial"],
      image_url:
        "https://roztownsend.net/seedly-assets/Salsify-Sandwich-Island.webp",
      isedible: true,
      sunlight: "Full",
    },
  ];
  const plantsData: PlantType[] = [
    {
      product_name: "Pumpkin 'Baby Bear'",
      price: 48,
      description:
        "Baby bear pumpkins have slender, sturdy, easy to grip handles. Decorative for autumn, but also great for pies. Stores really well.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Pumpkin-Baby-Bear.webp",
      isedible: true,
      sunlight: "Full",
    },

    {
      product_name: "Beet 'Choggia'",
      price: 35,
      description:
        "Typically grown for its taproot, the leaves of the beet are also edible. The Leaves resemble Swiss chard (but smaller) and are good sautéed. The choggia variety has nice stripes.",
      cycle: ["Annual", "Biennial"],
      image_url: "https://roztownsend.net/seedly-assets/Beets.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },

    {
      product_name: "Onion 'Alisa Craig'",
      price: 27,
      description:
        "White onions tend to have a sharper, more pungent flavor than yellow onions, and thinner, papery skin. They can be eaten cooked or raw - mince and add to salsas and chutneys. It's one of the most versatile veggies around, and easy to grow.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Onion-Alisa-Craig.webp",
      isedible: true,
      sunlight: "Full",
    },

    {
      product_name: "Carrot 'Touchon'",
      price: 56,
      description:
        "Touchon is a classic orange carrot great raw or cooked. Sweet and crunchy!",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Carrot-Touchon.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Kale 'Lerchenzungen'",
      price: 42,
      description:
        "This variety of kale has green leaves and curly bits. The plant is usually grown as an annual, but if grown as a perennial, it will form seeds in the second year. It can be grown as baby salad greens or for bunching adult leaves. Leaves are sweeter after a frost and delicious eaten raw, added to salads, sautéed, or added to stews and casseroles.",
      cycle: ["Annual", "Biennial"],
      image_url:
        "https://roztownsend.net/seedly-assets/Kale-Lerchenzungen.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Salsify 'Sandwich Island'",
      price: 36,
      description:
        "Salsify is a perennial plant grown as an annual for it''s edible root and leaves. It does well in cool weather and is cultivated similarly to carrots and parsnips. The leaves look like a clump of coarse grass with starry pink to purple flowers. The greens and flowers can be used in salads. The taproot has an oyster-like taste that can be eaten boiled or mashed. Take extra care not to break the roots while harvesting.",
      cycle: ["Annual", "Perennial"],
      image_url:
        "https://roztownsend.net/seedly-assets/Salsify-Sandwich-Island.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Corn 'Sweet Nugget'",
      price: 42,
      description:
        "An excellent super-sweet variety harvested mid-season. Has a great yield with long ears and big kernels. Great for barbecuing.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Corn-Sweet-Nugget.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "White Mulberry",
      price: 57,
      description:
        "Mulberry fruit have a deep, sweet flavor and are eaten fresh, made into jams or wine, and baked into desserts. Drape trees with netting to ensure a harvest, since birds love the fruit. Sow the seeds indoors and let them rest for a couple months before planting outside.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/White-Mulberry.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Strawberry 'Merlan'",
      price: 45,
      description:
        "Cute pink flowers showcase this ornamental and tasty strawberry. Berries are large and sweet, but this variety is compact with not much in the way of runners or other messiness. Good for containers or balconies.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Strawberry-Merlan.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Ramps (Wild Garlic)",
      price: 32,
      description:
        "A leafy cousin of leeks, the leaves of ramps are a great spring alternative to other alliums used in cooking. Plant in the spring to let them settle for the year, then harvest next spring. Lovely flowers, too.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Ramps-Wild-Garlic.webp",
      isedible: true,
      sunlight: "Partial shade to full shade",
    },
    {
      product_name: "Dill 'Como'",
      price: 39,
      description:
        "Tasty, fresh, and just a bit licorice-like, dill is a classic culinary herb that every gardener needs in their yards. Use this variety for fresh pickles, fish or salads.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Dill-Como.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Lavender 'Lovely Sky'",
      price: 48,
      description:
        "Soothing, mild and showy! Lovely sky will be a lovely, fragrant addition to any herb garden. This variety is particularly grate for culinary uses such as lavender ice cream or lavender lemonade.",
      cycle: ["Perennial"],
      image_url:
        "https://roztownsend.net/seedly-assets/Lavender-Lovely-Sky.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Basil 'Genovese'",
      price: 35,
      description:
        "The classic big-and-tasty basil. Make sure to keep it sunny and well watered! Use with tomato and mozzarella.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Basil-Genovese.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Tomato 'Paola'",
      price: 50,
      description:
        "A summer favorite on the sweeter-end of the tomato spectrum. Bright, showy and smells great while fruiting.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Tomato-Paola.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Cucumber 'Max'",
      price: 56,
      description:
        "Skip the stores and grow the biggest cucumbers on the block. Great for big salads.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Cucumber-Max.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Calendula",
      price: 42,
      description:
        "Medicinal, culinary and just pretty in the summer. Get some calendula to attract pollinators and keep things cheery.",
      cycle: ["Annual", "Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Calendula.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Chess Flower",
      price: 32,
      description:
        "A unique, purple and white chessboard pattern is the key sign of these spring flowers. Plant them once and keep them as a conversation point in your garden for years to come.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Chess-Flower.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      product_name: "Sunflower 'Ring of Fire'",
      price: 42,
      description:
        "Medium-sized for a sunflower but with gorgeous patterning. Keep it around for a bit of extra warmth in the garden.",
      cycle: ["Annual"],
      image_url:
        "https://roztownsend.net/seedly-assets/Sunflower-Ring-of-Fire.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      product_name: "Nasturtium",
      price: 57,
      description:
        "The leaves are tasty in salads with a peppery kick. Vibrant mix of red, orange and yellow flowers. Unique-shaped seeds to keep as trinkets. Keep track of it, though - these like to crawl!",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Nasturtium.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Poppy 'Lady Bird'",
      price: 45,
      description:
        "The classic summer red poppy with a twist - black bits like a cute lady bug. Medium size and height.",
      cycle: ["Annual", "Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Poppy-Lady-Bird.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Zinnia",
      price: 32,
      description:
        "Easy to grow with heavy, brightly colored blossoms. Can grow singularly with an upright stem or turn into a little shrub. (It's a surprise!)",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Zinnia.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      product_name: "Petunia 'Night Sky'",
      price: 39,
      description:
        "The iconic sign of spring in itty bitty flower form. Great for attracting pollinators and cleaning up any drab but sunny spot in the garden.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Petunia-Night-Sky.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      product_name: "Lingonberry",
      price: 38,
      description:
        "Small and evergreen with tart berries. Big for foragers, but why forage when you can have them in your front yard?",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Lingonberry.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Alpine Strawberry 'Regina'",
      price: 42,
      description:
        "You want strawberry candy in its natural form? Get alpine strawberries! Cute, tiny, with lovely flowers and the best tasting strawberries you've ever had.",
      cycle: ["Perennial"],
      image_url:
        "https://roztownsend.net/seedly-assets/Alpine-Strawberry-Regina.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Bog Myrtle",
      price: 57,
      description:
        "Unappealing name, but the most lovely plant you'll ever smell. Put this in an acidic, wet place where nothing else can grow - and enjoy.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Bog-Myrtle.webp",
      isedible: false,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Pepper 'California Wonder'",
      price: 22,
      description:
        "Big old bell pepper with good size, and a sweet taste. Comes in a mix of red or yellow - or just pick them early and eat them all green.",
      cycle: ["Annual"],
      image_url:
        "https://roztownsend.net/seedly-assets/Pepper-California-Wonder.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Pepper 'Chocobell'",
      price: 45,
      description:
        "A unique bell pepper with a lovely chocolate brown coloring. Tastes a bit sweeter than your average bell.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Pepper-Chocobell.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Borage",
      price: 32,
      description:
        "Weird name, pretty flowers! Borage is also edible and gives a lovely cucumber note to salads and cold dishes.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Borage.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Cabbage 'Sunta'",
      price: 39,
      description:
        "Grow a cabbage. Live your dream. This is a tasty and easy-to-grow variety that is fairly insect-hardy.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Cabbage-Sunta.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Radish 'Red Celebration'",
      price: 38,
      description:
        "Delicate for a radish! Rosy red coloring adds a soft touch to vegetable plates and salads. You can also eat the greens!",
      cycle: ["Annual"],
      image_url:
        "https://roztownsend.net/seedly-assets/Radish-Red-Celebration.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Squash 'Waltham Butternut'",
      price: 39,
      description:
        "Great for thick soups and stews, this is a hardy squash variety that stores well after harvesting.",
      cycle: ["Annual"],
      image_url:
        "https://roztownsend.net/seedly-assets/Squash-Waltham-Butternut.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Eggplant 'Black Beauty'",
      price: 49,
      description:
        "Delicious grilled, roasted, in soups and stews, and breaded and fried. Your classic eggplant has arrived.",
      cycle: ["Annual"],
      image_url:
        "https://roztownsend.net/seedly-assets/Eggplant-Black-Beauty.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Zucchini Squash 'Keesha'",
      price: 49,
      description:
        "Look out, or you will be making zucchini bread for the next six months. This classic summer squash can get huge and plentiful if you are not careful - or if you do it intentionally! You do you.",
      cycle: ["Annual"],
      image_url:
        "https://roztownsend.net/seedly-assets/Zucchini-Squash-Keesha.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Cosmos 'Exsenia'",
      price: 59,
      description:
        "The classic cottage garden flower with a nostalgic air, cosmos are a great ornamental addition to any garden, and easy to grow.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Cosmos-Exsenia.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      product_name: "Pak Choi 'Joi Choi'",
      price: 59,
      description:
        "A dense and crunchy leafy green perfect for stir fries and soups. Get your greens in and grow in spring or autumn!",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Pak-Choi-Joi-Choi.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Fennel",
      price: 38,
      description:
        "A crunchy veg with a taste like anise or licorice, fennel adds a light, punchy note to any stir-fry or pasta dish. Lots of potassium.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Fennel.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Sunflower 'Giganteous'",
      price: 20,
      description:
        "You want those huge sunflowers that look like they could fall over and kill someone? Welp, here they are. The classic sunflower for all your sunflowering needs.",
      cycle: ["Annual"],
      image_url:
        "https://roztownsend.net/seedly-assets/Sunflower-Giganteous.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      product_name: "Marigold 'Red Gem'",
      price: 36,
      description:
        "Adds a dash of color, great for pollinators and a natural pest deterrent. What's not to love about marigolds!",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Marigold-Red-Gem.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      product_name: "Chicory",
      price: 52,
      description:
        "With calm blue flowers on tall stalks, chicory can be a great showpiece for a traditional cottage garden, but it really shines when you roast the roots and grind them up to use as a coffee subsitute. Delicious with notes of caramel and chocolate.",
      cycle: ["Annual", "Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Chicory.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Brussel Sprouts",
      price: 37,
      description:
        "Fun to grow with showy stalks, generates many heads - make sure to cover if the weather turns chilly.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Brussel-Sprouts.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Jalapeño",
      price: 25,
      description:
        "Grows well and plentiful with lots of fresh, spicy peppers!",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Jalapeno.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Evening Primrose",
      price: 27,
      description:
        "Flowers long throughout summer and even into autumn - the tall stalks create visual interest even through winter.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Earthnut-Pea.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      product_name: "Earthnut Pea",
      price: 49,
      description:
        "Historically used to make perfume with the flowers, the earthnut pea is a good trailing climber to have in vacant garden spots where you need to take up a bit of space. While small in yield, the tubers can be delicious roasted.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Earthnut-Pea.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Tomato 'Cherry Cascade",
      price: 55,
      description:
        "Big taste, small tomato. Plentiful and makes a lovely spread of greenery as well as lots of tasty fruits.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Tomato-Cherry-Cascade.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Lettuce",
      price: 38,
      description:
        "Classic iceberg lettuce for summer salads. Good for succession sowing and very productive. Make sure it gets plenty of water.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Lettuce.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Miner's Lettuce",
      price: 48,
      description:
        "Traditionally foraged, miner's lettuce (also known as Winter Purslane) is a nice alternative to lettuce if you want a leafy green in your garden year-round. Spreads easily. Works great as groundcover.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Miners-Lettuce.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Lovage",
      price: 28,
      description:
        "Fantastic in savory dishes with a taste of intense celery, lovage can grow up to two meters tall and will last for years.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Lovage.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Oregano",
      price: 37,
      description:
        "Fragrant and bee-friendly. Dry or use fresh for culinary use. Likes to spread.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Oregano.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Marjoram",
      price: 28,
      description:
        "Traditional culinary herb. Can be cold sensitive depending on planting location and climate. Cover in winter if necessary.",
      cycle: ["Annual", "Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Marjoram.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Peppermint",
      price: 36,
      description:
        "The stronger cousin of spearmint. Intensely refreshing. Be prepared to let it spread if you put it in the ground.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Peppermint.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Spearmint",
      price: 36,
      description:
        "Basic spearmint. Good for drinks, desserts, and cooked dishes. Plant it in a pot and keep it nearby, or plant it in the ground to curse generations to come!",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Spearmint.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Chamomile",
      price: 21,
      description:
        "Easy to sow (throw it in disturbed soil) and easy to grow (sow it and forget it). Harvest and dry in late summer to turn into tea - and sleep well throughout the rest of the year.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Chamomile.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Broccoli 'Ramoso Calabrese'",
      price: 38,
      description:
        "A rich heritage variety. Grows well and easily if protected from pests. Rich flavor.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Broccoli-Ramoso-Calabrese.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Cauliflower 'Bola de Neve'",
      price: 48,
      description:
        "A sturdy heritage variety of cauliflower that is tolerant of most types of summer weather. Great raw or cooked.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Cauliflower-Bola-de-Neve.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Peas 'Sugar Snap'",
      price: 25,
      description:
        "Throw them into stir-frys or salads, if they get that far! You might just eat them all off of the vine. Sugar snap is a classic, productive variety.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Peas-Sugar-Snap.webp",
      isedible: true,
      sunlight: "Full",
    },
    {
      product_name: "Freesia 'Magdalena'",
      price: 52,
      description:
        "Floofy, lovely ornamental and great-smelling. Particularlly nice addition to boquets.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Freesia-Magdalena.webp",
      isedible: false,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Peony 'Opera White'",
      price: 23,
      description:
        "A robust and perennial with big, intricate white blossoms. Divide every few years for better yields.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Peony-Opera-White.webp",
      isedible: false,
      sunlight: "Full to part shade",
    },
    {
      product_name: "Aster 'Blaubox'",
      price: 59,
      description:
        "A classic aster with cute purple flowers.",
      cycle: ["Annual"],
      image_url: "https://roztownsend.net/seedly-assets/Aster-Baubox.webp",
      isedible: false,
      sunlight: "Full",
    },
    {
      product_name: "Catnip",
      price: 39,
      description:
        "Makes a great soothing tea for humans, but drives cats wild! Best to plant in a hanging pot and snip off the occasional stem for kitty use.",
      cycle: ["Perennial"],
      image_url: "https://roztownsend.net/seedly-assets/Catnip.webp",
      isedible: true,
      sunlight: "Full to part shade",
    },
  ];
  try {
    const plants = await Plant.bulkCreate(plantsData);
    console.log(plants.length, "plants added.");
    console.log(plants[0] instanceof Plant);
  } catch (error) {
    console.error("Failed to bulk insert plants", error);
  }
};

export default plantsInserter;
