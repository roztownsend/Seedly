-- Users 
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

--Purchase (contains purchase items)
CREATE TABLE IF NOT EXISTS purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    total_items INTEGER NOT NULL,
    total INTEGER NOT NULL,
    purchase_date TIMESTAMP DEFAULT NOW()
);

--Purchase-items
CREATE TABLE IF NOT EXISTS purchase_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
    plant_id UUID REFERENCES plants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1
);


-- Example: (feature)tasks table (for a task manager app)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

--Plants
CREATE TABLE IF NOT EXISTS plants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,
    cycle VARCHAR(50),
    timeline TEXT,
    image_url TEXT
);

INSERT INTO plants (product_name, price, description, cycle, image_url) VALUES
('Pumpkin ''Baby Bear''', 48, 'Baby bear pumpkins have slender, sturdy, easy to grip handles. Decorative, but also good for pies. Stores really well.', 'Annual', 'https://commons.wikimedia.org/wiki/Category:Pumpkins#/media/File:66b17b745bda0ba65297731a66c0ea15_(24326905485).jpg'),
('Beet ''Choggia''', 35, 'Typically grown for its round or cylindrical taproot, the leaves of the beet are also edible. Leaves resemble Swiss chard on a smaller scale and are good sautéed. The taproot, or beet, ranges in color from deep red to gold, orange, or white and red striped. The beet has a delicious, earthy flavor with a touch of sweetness to it when roasted.', 'Annual, Biennial',  'https://en.wikipedia.org/wiki/Beetroot#/media/File:Detroitdarkredbeets.png'),
('Onion ''Alisa Craig''', 27, 'White onions are a type of onion with white skin and white flesh. They are members of the Allium family along with garlic and leeks. They tend to have a sharper, more pungent flavor than yellow onions, and thinner, papery skin. They can be eaten cooked or raw (mince and add to salsas and chutneys). Make sure to choose a variety suited to your day length.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/1/1b/Onions.jpg'),
('Carrot ''Touchon''', 56, 'Carrots are root vegetables, typically orange. The plant probably originated in Iran and was originally cultivated for its leaves and seeds.', 'Annual', 'https://upload.wikimedia.org/wikipedia/commons/2/22/Carrots_at_a_farmers_market_in_the_Villages_Florida.png'),
('Kale ''Lerchenzungen''', 42, 'This variety of kale has green leaves and curly bits. The plant is usually grown as an annual, but if grown as a perennial, it will form seeds in the second year. It can be grown as baby salad greens or for bunching adult leaves. Leaves are sweeter after a frost and delicious eaten raw, added to salads, sautéed, or added to stews and casseroles.', 'Annual, Biennial', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Boerenkool.jpg/640px-Boerenkool.jpg'),
('Salsify ''Sandwich Island''', 36, 'Salsify, is a perennial plant grown as an annual for it''s edible root and leaves. It does well in cool weather and is cultivated similarly to carrots and parsnips. Salsify''s leaves look like a clump of coarse grass with starry pink to purple flowers. The greens and flowers can be used in salads. The taproot has an oyster-like taste. It can be eaten boiled or mashed. Take extra care not to break the roots while harvesting!', 'Annual, Perennial', 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Tragopogon_porrifolius_root.jpg'),
('Corn ''Sweet Nugget''', 42, 'An excellent super-sweet variety harvested mid-season. Has a great yield with long ears and big kernels. Great for barbecuing!', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/0/0d/Starr-120606-7054-Zea_mays-ears_for_sale-Laulima_Farm_Kipahulu-Maui_%2825026486812%29.jpg'),
('White Mulberry', 57, 'Mulberry fruit have a deep, sweet flavor and are eaten fresh, made into jams or wine, and baked into desserts. Drape trees with netting to ensure a harvest, since birds love the fruit. ', 'Perennial',  'https://upload.wikimedia.org/wikipedia/commons/0/0a/Morus-alba.jpg'),
('Strawberry ''Merlan''', 45, 'Cute pink flowers showcase this ornamental and tasty strawberry. Berries are large and sweet, but this variety is compact with not much in the way of runners or other messiness. Good for containers or balconies.', 'Perennial',  'https://upload.wikimedia.org/wikipedia/commons/0/00/02024_Fragaria_%C3%97_ananassa.jpg'),
('Ramps (Wild Garlic)', 32, 'A leafy cousin of leeks, the leaves of ramps are a great spring alternative to other alliums used in cooking. Plant in the spring to let them settle for the year, then harvest next spring. Lovely flowers, too!', 'Perennial',  'https://upload.wikimedia.org/wikipedia/commons/3/35/Wild_garlic_-_geograph.org.uk_-_7206418.jpg'),
('Dill ''Como''', 39, 'Tasty, fresh, and just a bit licorice-like, dill is a classic culinary herb that every gardener needs in their yards. Use this variety for fresh pickles, fish or salads.', 'Annual',  'https://commons.wikimedia.org/wiki/File:Anethum_graveolens_Ven.JPG'),
('Lavender ''Lovely Sky''', 48, 'Soothing, mild and showy! Lovely sky will be a lovely, fragrant addition to any herb garden. This variety is particularly grate for culinary uses such as lavender ice cream or lavender lemonade.', 'Perennial',  'https://upload.wikimedia.org/wikipedia/commons/7/7e/Lavender_flowers_in_Tihany%2C_Hungary.jpg'),
('Basil ''Genovese''', 35, 'The classic big-and-tasty basil. Make sure to keep it sunny and well watered! Use with tomato and mozzarella.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/9/90/Basil-Basilico-Ocimum_basilicum-albahaca.jpg'),
('Tomato ''Paola''', 50, 'A summer favorite on the sweeter-end of the tomato spectrum. Bright, showy and smells great while fruiting.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/9/91/Tomato2_002.jpg'),
('Cucumber ''Max''', 56, 'Skip the stores and grow the biggest cucumbers on the block. Great for big salads.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/f/f9/Assortiment_de_concombres.jpg'),
('Calendula', 42, 'Medicinal, culinary and just pretty in the summer. Get some calendula to attract pollinators and ward off evil spirits.', 'Annual, Perennial',  'https://commons.wikimedia.org/wiki/File:%E0%A6%A8%E0%A6%BE%E0%A7%B0%E0%A7%8D%E0%A6%9C%E0%A7%80_%E0%A6%AB%E0%A7%81%E0%A6%B2_2.jpg'),
('Chess Flower', 32, 'A unique, purple and white chessboard pattern is the key sign of these spring flowers. Plant them once and keep them as a conversation point in your garden for years to come. ', 'Perennial',  'https://upload.wikimedia.org/wikipedia/commons/0/0d/Fritillaria_meleagris_3.JPG'),
('Sunflower ''Ring of Fire''', 42, 'Medium-sized for a sunflower but with gorgeous patterning. Keep it around for a bit of extra warmth in the garden.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/c/c8/Helianthus_annuus_%DA%AF%D9%84_%D8%A2%D9%81%D8%AA%D8%A7%D8%A8%DA%AF%D8%B1%D8%AF%D8%A7%D9%86_08.jpg'),
('Nasturtium', 57, 'The leaves are tasty in salads with a peppery kick. Vibrant mix of red, orange and yellow flowers. Unique-shaped seeds to keep as trinkets. Keep track of it, though - these like to crawl!', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/e/ea/Nasturtium_at_Nuthurst_West_Sussex_England_02.jpg'),
('Poppy ''Lady Bird''', 45, 'The classic summer red poppy with a twist - black bits like a cute lady bug. Medium size and height.', 'Annual, Perennial',  'https://upload.wikimedia.org/wikipedia/commons/f/f3/Red_Poppy_Flower_-_May_2002_2.jpg'),
('Zinnia', 32, 'Easy to grow with heavy, brightly colored blossoms. Can grow singularly with an upright stem or turn into a little shrub. (It''s a surprise!)', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/d/db/Beautiful_zinnia-cropped-big2.jpg'),
('Petunia ''Night Sky''', 39, 'The iconic sign of spring in itty bitty flower form. Great for attracting pollinators and cleaning up any drab but sunny spot in the garden.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/6/6b/Petunia_night_sky_02.jpg'),
('Lingonberry', 38, 'Small and evergreen with tart berries. Big for foragers, but why forage when you can have them in your front yard?', 'Perennial',  'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vaccinium_vitis-idaea_20060824_003.jpg'),
('Alpine Strawberry ''Regina''', 42, 'You want strawberry candy in its natural form? Get alpine strawberries! Cute, tiny, with lovely flowers and the best tasting strawberries you''ve ever had.', 'Perennial',  'https://upload.wikimedia.org/wikipedia/commons/c/c1/Fragaria_vesca_-_metsmaasikas.jpg'),
('Bog Myrtle', 57, 'Unappealing name, but the most lovely plant you''ll ever smell. Put this in an acidic, wet place where nothing else can grow - and enjoy.', 'Perennial',  'https://upload.wikimedia.org/wikipedia/commons/b/b6/Myrica_gale_Woskownica_europejska_Rezerwat_przyrody_%C5%81azy_2022-06-21_14.jpg'),
('Pepper ''California Wonder''', 22, 'Big old bell pepper with good size, and a sweet taste. Comes in a mix of red or yellow - or just pick them early and eat them all green.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/5/59/Pimiento_morr%C3%B3n_%28Capsicum_annuum%29.jpg'),
('Pepper ''Chocobell''', 45, 'A unique bell pepper with a lovely chocolate brown coloring. Tastes a bit sweeter than your average bell.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/f/f5/Ripening_Pepper%2C_2020-10-17.jpg'),
('Borage', 32, 'Weird name, pretty flowers! Borage is also edible and gives a lovely cucumber note to salads and cold dishes.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/9/96/Borago_officinalis%2C_Santa_Coloma_de_Farners.jpg'),
('Cabbage ''Sunta''', 39, 'Grow a cabbage. Live your dream. This is a tasty and easy-to-grow variety that is fairly insect-hardy.', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/e/ec/Starr_070730-7852_Brassica_oleracea_var._capitata.jpg'),
('Radish ''Red Celebration''', 38, 'Delicate for a radish! Rosy red coloring adds a soft touch to vegetable plates and salads. You can also eat the greens!', 'Annual',  'https://upload.wikimedia.org/wikipedia/commons/4/4f/R%C3%A1banos_exhibidos_en_mercado.jpg')
