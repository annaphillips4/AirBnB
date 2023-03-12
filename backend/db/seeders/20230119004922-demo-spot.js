'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        address: '4159 East Street',
        city: 'Lumberton',
        state: 'Texas',
        country: 'USA',
        lat: 40.2436,
        lng: 109.0146,
        name: 'Naturalist Boudoir',
        description: "Nestled in the heart of the Big Thicket, our Naturalist Boudoir B&B has everything you need to revitalize your senses. Extremely private area for the naturalist with outdoor hot tub and shower. We welcome all guests to experience our lovely Naturalist Boudoir & reconnect with your special someone. Should your dates not be available for this cabin, please check out our additional cabins...Naturalist Boudoir TOO, Naturalist Boudoir on Point & Naturalist Boudoir RITZ. Check my profile for all. Ready to unplug and get back to nature, come check out Naturalist Boudoir. Naturalist Boudoir is an unusual space where one can get back to nature in a peaceful, private setting. As you are actually in nature, you may encounter God's creatures of the woods.",
        price: 359,
        ownerId: 1,
      },
      {
        address: '31 Brookfield Road',
        city: 'Austin',
        state: 'Texas',
        country: 'USA',
        lat: 64.2008,
        lng: 149.4937,
        name: 'The Beehive',
        description: "Clean, Zen modern backyard cottage, easy access to SXSW, convention center, great dining, and public transportation. Gorgeous, peaceful space, close to the action but perfect for rest and recharging. Easy access to SXSW, ACL, F1 and all festivals. Enjoy this clean, modern cottage nestled in a cozy but convenient Central East Austin neighborhood. Inspired by Japanese teahouses, this backyard cottage provides easy access to SXSW venues, ACL Fest, downtown, great restaurants, and public transportation while offering a peaceful retreat for resting and recharging. Gorgeous light, vaulted ceilings, and an open floor plan make this unique 1 BR/1BA feel spacious, calm, and inviting. The Beehive features a full kitchen, roomy indoor and outdoor showers, a lovely work space, all-new furnishings and fixtures and a queen bed as well as a double foldout couch. (Please note: there is no tv or cable - the better to recharge. Since I work in tv, I find it encourages me to play records on the record player instead. There are plenty of books as well!) The Beehive is an easy bike, scooter or Lyft ride to downtown and UT. And there are great tacos, sandwiches, BBQ and coffee within walking distance. The train and bus lines are all handy. Blow dryer, iron and ironing board, washer and dryer are all included as well. If you want to see a great photo spread on the Beehive, do a search for the magazine Tribeza and 'downsizing'. They did a nice article on the place and you can see more pics. Access to the Beehive is a short walk down the driveway to the back of the main house. You will have total privacy in back with no shared common areas.",
        price: 284,
        ownerId: 1,
      },
      {
        address: '265 Gladstone Road',
        city: 'Hot Springs',
        state: 'Arkansas',
        country: 'USA',
        lat: 35.5403,
        lng: 79.7480,
        name: 'The Nest of Hot Springs',
        description: `Enjoy a morning cup of coffee on your private covered veranda with teak furniture overlooking the valley with the lake peeking thru the foliage in the distance. You can relax in the 7 person hot tub that is recessed with a large ledge perfect for cocktails and food. There is also an outdoor shower with hot water that is nestled between the towering pine trees popping up thru the deck.
        Inside you will be transported to another world of soft sweeping ceilings of the African Tent. The pillow top king sized bed with down pillows and comforter is flanked by two nightstands with power outlet to charge your phones. The controls for the ceiling fan is within arm reach from the bed for maximum control. There is a desk for working or putting on your makeup using the mahogany British campaign shaving mirror. You can also play music from the Alexa video speaker that will fill the tent with your favorite tunes.
        The stainless refrigerator also has an ice maker. There is a wall oven and microwave drawer with an insta pot. The kitchen is fully stocked with everything you will need to cook a wonderful dinner. The outdoor grill has a side burner for any other cooking needed for a cook top.
        The living space has a custom down filled sleeper sofa and matching ottoman. There is a leather camping styled oversized chair with a side table. The 55" TV on the wall is tied into a basic Dish package. We offer free wifi and if you want to stream video, we suggest you bring your own Roku or firestick.
        The bathroom is a spa like experience. It has a free standing tub with a hand sprayer. The amenities are provided from Roam for your convenience. Two monogramed cotton bathrobes are also provided. There is a toilet room with a door that holds the heated seat bidet toilet. You will never sit on a cold bidet again at The Nest!
        The closet in the bathroom houses two baggage racks and an iron and mini ironing board. The linens for the fold out sofa bed are also located in this closet. Extra linens are in the vanity drawers and in the toilet room. We also provide a hair blow dryer at the vanity.`,
        price: 399,
        ownerId: 1,
      },
      {
        address: '3589 Laburnum Grove',
        city: 'St. Augustine',
        state: 'Florida',
        country: 'USA',
        lat: 35.5403,
        lng: 79.7480,
        name: 'The Pink House',
        description: `The PINK HOUSE, recently upgraded in July of 2021, is a tropical pool home located in the desirable Davis Shores neighborhood. A short 5-minute walk over the Bridge of Lions, and you are in the heart of historic downtown St Augustine.    This home has been upgraded and appointed with brand new modern furnishings with every detail considered for a luxury vacation lifestyle in mind.  The pool is heated to 80 degrees fahrenheit during the winter months.`,
        price: 443,
        ownerId: 2,
      },
      {
        address: '79 Gateside Crescent',
        city: 'Sanibel',
        state: 'Florida',
        country: 'USA',
        lat: 35.5403,
        lng: 79.7480,
        name: 'Shorewood 3B',
        description: `Shorewood 3B is a beautiful three bedroom penthouse vacation rental condominium located in world renowned Sanibel Island. Our top floor private vacation rental condo features nearly 2500 sq ft of living space with three bedrooms and three bathrooms, an expansive private screened lanai, rooftop sun deck and private poolside cabana room with ping pong and tons of beach equipment. As soon as you walk in, you'll know why you booked Shorewood 3B with the newly updated kitchen, flooring and much more. Our vacation home offers plenty of space for up to six guests with a very comfortable king sized bed in the master bedroom suite, queen sized bed in the first guest bedroom suite and two twin beds in the second guest bedroom. The master bedroom and queen guest bedroom each have en-suite bathrooms with another full hall bathroom easily accessible to guests. Unit has been updated to add a new dining set, all new mattresses and furniture pieces! You will also have access to a private ground level cabana near the pool equipped with tons of beach equipment, seating and a ping pong table. On-site amenities at Shorewood include a very nice heated pool and tennis court. With the central location, it is very easy to walk or bike to a nearby restaurant or more shops and restaurants along Periwinkle Way.`,
        price: 781,
        ownerId: 3,
      },
      {
        address: '323 St. Theresas Close',
        city: 'Yellowknife',
        state: 'Northwest Territories',
        country: 'Canada',
        lat: 35.5403,
        lng: 79.7480,
        name: 'Aurora Lodge Houseboat ',
        description: `The Aurora Lodge is a 2200 square foot houseboat located on Vee Lake, 20 minute drive outside of Yellowknife. The lodge has two rooms, each with a queen size bed and a personal heater. The living area includes the kitchen, bar and lounge area with a wood burning fireplace. There's also 2 decks and the entire lake, for aurora viewing. The Aurora Lodge is FULLY OFF THE GRID. In SUMMER we must hike down a trail 5-10 minutes walk depending on your speed. Then we cross the lake in canoe. 5-10 minutes. In WINTER the Lodge freezes into the ice and you can drive right to the house. The location, 17 kilometers outside of Yellowknife, and allows for amazing Aurora viewing far from City light pollution. The lodge is FULLY OFF THE GRID -it is completely self-sufficient, relying on propane gas for heat and appliances. We also have a wood fireplace. For POWER we use generator and solar panels that stores power in batteries for electricity. The hosts live upstairs and will be there to make sure all systems run properly and the guests can focus on enjoying their visit without worries.`,
        price: 156,
        ownerId: 4,
      },
      {
        address: '846 Longworth Road North',
        city: 'Kerhonkson',
        state: 'New York',
        country: 'USA',
        lat: 35.5403,
        lng: 79.7480,
        name: 'The Black A-Frame',
        description: `The Black A-frame is a two bed two bath 1961 cabin set on a private road in the heart of the Catskills in Kerhonkson, NY. It was named the "Coolest A-frame in NY" by the New York Post in 2020. Relax in the open dinning room with original wood ceilings and beams and enjoy a home cooked meal made in the renovated chef's kitchen, or walk outdoors to soak in the magic of the Catskills through the endless wooded views from the back yard!`,
        price: 355,
        ownerId: 5,
      },
      {
        address: '2643 Hague Terrace',
        city: 'Crane Hill',
        state: 'Alabama',
        country: 'USA',
        lat: 35.5403,
        lng: 79.7480,
        name: 'Wanderlust Treehouse',
        description: `Our very unique treehouse is nestled into the treetops on 40 acres of completely secluded property. Great for a couples retreat, honeymoon, or spiritual reconnecting. Get away from it all and enjoy the nature trails and 2 acre lake(seasonal at times)to pass the time and be able to really unwind. Sit and enjoy your morning coffee outside on the deck as you may be able to catch a peak at the deer and other small animals making their way. `,
        price: 350,
        ownerId: 6,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
