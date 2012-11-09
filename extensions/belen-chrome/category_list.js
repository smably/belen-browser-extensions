// Ad category SELECT boxes are generated based on an HTML string defined in a script block at the bottom of the main page.
// If we catch the page load at just the right time, we can replace that with our own code.
// The following HTML generates an indented, rainbow-coloured category list that is hopefully easier to use than the default.
var catSelectOpts =
	'<option class="cat1-lvl1 cat-lvl1" disabled="disabled">Antiques, Art & Collectables</option>' +
	'<option class="cat1-lvl2 cat-lvl2" value="20038">&nbsp;&nbsp;&nbsp;&nbsp;Antiques</option>' +
	'<option class="cat1-lvl2 cat-lvl2" value="20039">&nbsp;&nbsp;&nbsp;&nbsp;Art</option>' +
	'<option class="cat1-lvl2 cat-lvl2" value="20040">&nbsp;&nbsp;&nbsp;&nbsp;Collectables</option>' +
	'<option class="cat1-lvl2 cat-lvl2" value="20041">&nbsp;&nbsp;&nbsp;&nbsp;Other Antiques, Art & Collectables</option>' +
	'<option class="cat2-lvl1 cat-lvl1" disabled="disabled">Automotive</option>' +
	'<option class="cat2-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Caravan & Campervan</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="20011">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Campervan</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="20012">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Caravan</option>' +
	'<option class="cat2-lvl2 cat-lvl2" value="18320">&nbsp;&nbsp;&nbsp;&nbsp;Cars, Vans & Utes</option>' +
	'<option class="cat2-lvl2 cat-lvl2" value="18460">&nbsp;&nbsp;&nbsp;&nbsp;Heavy, Farming & Agriculture Equipment</option>' +
	'<option class="cat2-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Motorcycles & Scooters</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18627">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessories</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18626">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Motorcycles</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18630">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Motorcycles & Scooters</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18628">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Parts</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18629">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scooters</option>' +
	'<option class="cat2-lvl2 cat-lvl2" value="18375">&nbsp;&nbsp;&nbsp;&nbsp;Other Automotive</option>' +
	'<option class="cat2-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Parts & Accessories</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18473">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Audio, GPS, & Car Alarms</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18474">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Auto Body parts</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18479">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brakes & Suspension</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18475">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine, Engine Parts & Transmission</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18480">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Oil, Coolant & Liquids</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18478">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Parts & Accessories</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18481">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Truck Parts</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18476">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wheels, Tyres & Rims</option>' +
	'<option class="cat2-lvl3 cat-lvl3" value="18482">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wrecking</option>' +
	'<option class="cat2-lvl2 cat-lvl2" value="20037">&nbsp;&nbsp;&nbsp;&nbsp;Trailers</option>' +
	'<option class="cat3-lvl1 cat-lvl1" disabled="disabled">Baby & Children</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18577">&nbsp;&nbsp;&nbsp;&nbsp;Baby Carriers</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18578">&nbsp;&nbsp;&nbsp;&nbsp;Baby Clothing</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18579">&nbsp;&nbsp;&nbsp;&nbsp;Baths</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18580">&nbsp;&nbsp;&nbsp;&nbsp;Cots & Bedding</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18581">&nbsp;&nbsp;&nbsp;&nbsp;Feeding</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18585">&nbsp;&nbsp;&nbsp;&nbsp;Toys - Indoor</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="20042">&nbsp;&nbsp;&nbsp;&nbsp;Kids Clothing</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18582">&nbsp;&nbsp;&nbsp;&nbsp;Maternity Clothing</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18584">&nbsp;&nbsp;&nbsp;&nbsp;Other Baby & Children</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18586">&nbsp;&nbsp;&nbsp;&nbsp;Toys - Outdoor</option>' +
	'<option class="cat3-lvl2 cat-lvl2" value="18583">&nbsp;&nbsp;&nbsp;&nbsp;Prams & Strollers</option>' +
	'<option class="cat4-lvl1 cat-lvl1" disabled="disabled">Boats & Jet Skis</option>' +
	'<option class="cat4-lvl2 cat-lvl2" value="20004">&nbsp;&nbsp;&nbsp;&nbsp;Boat Accessories & Parts</option>' +
	'<option class="cat4-lvl2 cat-lvl2" value="20024">&nbsp;&nbsp;&nbsp;&nbsp;Jet Skis</option>' +
	'<option class="cat4-lvl2 cat-lvl2" value="20025">&nbsp;&nbsp;&nbsp;&nbsp;Kayaks & Paddle</option>' +
	'<option class="cat4-lvl2 cat-lvl2" value="20026">&nbsp;&nbsp;&nbsp;&nbsp;Motorboats & Powerboats</option>' +
	'<option class="cat4-lvl2 cat-lvl2" value="20027">&nbsp;&nbsp;&nbsp;&nbsp;Other Boats & Jet Skis</option>' +
	'<option class="cat4-lvl2 cat-lvl2" value="20028">&nbsp;&nbsp;&nbsp;&nbsp;Sail Boats</option>' +
	'<option class="cat4-lvl2 cat-lvl2" value="20029">&nbsp;&nbsp;&nbsp;&nbsp;Tinnies & Dinghies</option>' +
	'<option class="cat5-lvl1 cat-lvl1" disabled="disabled">Books, Music & Games</option>' +
	'<option class="cat5-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Books</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="20044">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Books</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18587">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Children\\\'s Books</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18588">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comic Books</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18589">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fiction Books</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18590">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Graphic Novels</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18591">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Magazines</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18592">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nonfiction Books</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18593">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Textbooks</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18594">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Travel Guides</option>' +
	'<option class="cat5-lvl2 cat-lvl2" value="18307">&nbsp;&nbsp;&nbsp;&nbsp;CDs & DVDs</option>' +
	'<option class="cat5-lvl2 cat-lvl2" value="18595">&nbsp;&nbsp;&nbsp;&nbsp;Board Games</option>' +
	'<option class="cat5-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Musical Instruments</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18612">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DJ Gear & Lighting</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18608">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Guitars & Amps</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18613">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instrument Accessories</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18609">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Keyboards & Pianos</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18614">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Musical Instruments</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18610">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Percussion & Drums</option>' +
	'<option class="cat5-lvl3 cat-lvl3" value="18611">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Woodwind & Brass</option>' +
	'<option class="cat5-lvl2 cat-lvl2" value="18596">&nbsp;&nbsp;&nbsp;&nbsp;Other Books, Music & Games</option>' +
	'<option class="cat6-lvl1 cat-lvl1" disabled="disabled">Business Services</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="20010">&nbsp;&nbsp;&nbsp;&nbsp;Appliance & Phone Repair</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18461">&nbsp;&nbsp;&nbsp;&nbsp;Automotive</option>' +
	'<option class="cat6-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Building & Trades</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18634">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Airconditioning & Heating</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18635">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Carpentry</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="20014">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Concreting & Paving</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18636">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cleaning</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18637">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Electrical</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="20015">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fencing & Gates</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="20016">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Flooring</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="20017">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Handymen</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18638">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Landscaping & Gardening</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18642">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Building & Trades</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18639">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Painting & Decorating</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18640">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastering & Tiling</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18641">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plumbing</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="20030">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Roofing</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18465">&nbsp;&nbsp;&nbsp;&nbsp;Childcare & Nanny</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18442">&nbsp;&nbsp;&nbsp;&nbsp;Cleaning</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18358">&nbsp;&nbsp;&nbsp;&nbsp;Computer, Telecom & Freelance</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18446">&nbsp;&nbsp;&nbsp;&nbsp;Courses & Training</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="20013">&nbsp;&nbsp;&nbsp;&nbsp;Dress Making & Alterations</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18443">&nbsp;&nbsp;&nbsp;&nbsp;Entertainment</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18469">&nbsp;&nbsp;&nbsp;&nbsp;Graphic & Web Design</option>' +
	'<option class="cat6-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Health & Beauty</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18644">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alternative Therapies</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18645">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beauty Treatments</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18646">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hairdressing</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18647">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Massages</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18648">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Health & Beauty</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18445">&nbsp;&nbsp;&nbsp;&nbsp;Landscaping & Gardening</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18466">&nbsp;&nbsp;&nbsp;&nbsp;Language & Tutoring</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="20009">&nbsp;&nbsp;&nbsp;&nbsp;Mechanics & Garages</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18472">&nbsp;&nbsp;&nbsp;&nbsp;Musicians & Artists</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18360">&nbsp;&nbsp;&nbsp;&nbsp;Other Business Services</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18447">&nbsp;&nbsp;&nbsp;&nbsp;Party & Catering</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18444">&nbsp;&nbsp;&nbsp;&nbsp;Personal Training</option>' +
	'<option class="cat6-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Pet Services</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="20019">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grooming</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="18439">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Pet Services</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="20020">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sitting</option>' +
	'<option class="cat6-lvl3 cat-lvl3" value="20021">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Training</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18448">&nbsp;&nbsp;&nbsp;&nbsp;Photography & Video</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18467">&nbsp;&nbsp;&nbsp;&nbsp;Real Estate</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18643">&nbsp;&nbsp;&nbsp;&nbsp;Removals & Storage</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18449">&nbsp;&nbsp;&nbsp;&nbsp;Resume</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18451">&nbsp;&nbsp;&nbsp;&nbsp;Tax, Insurance & Financial</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18453">&nbsp;&nbsp;&nbsp;&nbsp;Taxi, Chauffeur & Airport Transfer</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18452">&nbsp;&nbsp;&nbsp;&nbsp;Travel Agent</option>' +
	'<option class="cat6-lvl2 cat-lvl2" value="18455">&nbsp;&nbsp;&nbsp;&nbsp;Wedding & Venues</option>' +
	'<option class="cat7-lvl1 cat-lvl1" disabled="disabled">Clothing & Jewellery</option>' +
	'<option class="cat7-lvl2 cat-lvl2" value="18575">&nbsp;&nbsp;&nbsp;&nbsp;Accessories</option>' +
	'<option class="cat7-lvl2 cat-lvl2" value="18574">&nbsp;&nbsp;&nbsp;&nbsp;Bags</option>' +
	'<option class="cat7-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Jewellery</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="18603">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Men\\\'s Jewellery</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="18606">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Jewellery</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="18604">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unisex Jewellery</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="18605">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Watches</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="18602">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Women\\\'s Jewellery</option>' +
	'<option class="cat7-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Men\\\'s Clothing</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20054">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jackets & Coats</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20058">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Men\\\'s Clothing</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20055">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pants & Jeans</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20056">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Swimwear</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20057">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tops</option>' +
	'<option class="cat7-lvl2 cat-lvl2" value="18573">&nbsp;&nbsp;&nbsp;&nbsp;Men\\\'s Shoes</option>' +
	'<option class="cat7-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Women\\\'s Clothing</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="18576">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Women\\\'s Clothing</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20048">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dresses & Skirts</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20047">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jackets & Coats</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20049">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pants & Jeans</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20050">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Socks & Underwear</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20051">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Swimwear</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20052">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tops & Blouses</option>' +
	'<option class="cat7-lvl3 cat-lvl3" value="20053">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wedding</option>' +
	'<option class="cat7-lvl2 cat-lvl2" value="18572">&nbsp;&nbsp;&nbsp;&nbsp;Women\\\'s Shoes</option>' +
	'<option class="cat8-lvl1 cat-lvl1" disabled="disabled">Community</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18324">&nbsp;&nbsp;&nbsp;&nbsp;Activities & Hobbies</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18325">&nbsp;&nbsp;&nbsp;&nbsp;Classes</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="20000">&nbsp;&nbsp;&nbsp;&nbsp;Dance Partners</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18483">&nbsp;&nbsp;&nbsp;&nbsp;Events</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18486">&nbsp;&nbsp;&nbsp;&nbsp;Garage Sale</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18330">&nbsp;&nbsp;&nbsp;&nbsp;Language Swap</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18326">&nbsp;&nbsp;&nbsp;&nbsp;Lost & Found</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18441">&nbsp;&nbsp;&nbsp;&nbsp;Missed Connections</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18327">&nbsp;&nbsp;&nbsp;&nbsp;Musicians & Artists</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18333">&nbsp;&nbsp;&nbsp;&nbsp;Other Community</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18331">&nbsp;&nbsp;&nbsp;&nbsp;Sports Partners</option>' +
	'<option class="cat8-lvl2 cat-lvl2" value="18332">&nbsp;&nbsp;&nbsp;&nbsp;Rideshare & Travel Partners</option>' +
	'<option class="cat9-lvl1 cat-lvl1" disabled="disabled">Electronics & Computer</option>' +
	'<option class="cat9-lvl2 cat-lvl2" value="18625">&nbsp;&nbsp;&nbsp;&nbsp;Audio</option>' +
	'<option class="cat9-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Cameras</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18622">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Digital Camera Accessories</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18621">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Digital Cameras</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18623">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Non Digital Cameras</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18624">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Cameras</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18620">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video Camera Accessories</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18619">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video Cameras</option>' +
	'<option class="cat9-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Computers & Software</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18552">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Components</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18551">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desktops</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18554">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Laptop Accessories</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18553">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Laptops</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18558">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Computers & Software</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18555">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Printers</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18556">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Software</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18557">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Speakers</option>' +
	'<option class="cat9-lvl2 cat-lvl2" value="20046">&nbsp;&nbsp;&nbsp;&nbsp;Other Electronics & Computers</option>' +
	'<option class="cat9-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Phones</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18599">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home Phones</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18598">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mobile Phone Accessories</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18597">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mobile Phones</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18600">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Phones</option>' +
	'<option class="cat9-lvl2 cat-lvl2" value="18316">&nbsp;&nbsp;&nbsp;&nbsp;TV & DVD players</option>' +
	'<option class="cat9-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Video Games & Consoles</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18616">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessories</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18617">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consoles</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18618">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Video Games & Consoles</option>' +
	'<option class="cat9-lvl3 cat-lvl3" value="18615">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video Games</option>' +
	'<option class="cat10-lvl1 cat-lvl1" disabled="disabled">Tickets</option>' +
	'<option class="cat10-lvl2 cat-lvl2" value="20001">&nbsp;&nbsp;&nbsp;&nbsp;Bus, Train & Plane</option>' +
	'<option class="cat10-lvl2 cat-lvl2" value="18484">&nbsp;&nbsp;&nbsp;&nbsp;Concerts</option>' +
	'<option class="cat10-lvl2 cat-lvl2" value="18488">&nbsp;&nbsp;&nbsp;&nbsp;Other Tickets</option>' +
	'<option class="cat10-lvl2 cat-lvl2" value="18485">&nbsp;&nbsp;&nbsp;&nbsp;Sport</option>' +
	'<option class="cat10-lvl2 cat-lvl2" value="20002">&nbsp;&nbsp;&nbsp;&nbsp;Theatre/Film</option>' +
	'<option class="cat11-lvl1 cat-lvl1" disabled="disabled">Home & Garden</option>' +
	'<option class="cat11-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Appliances</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20059">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cooktops & Rangehoods</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20060">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dishwashers</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20061">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fridges & Freezers</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20062">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air Conditioning & Heating</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="18402">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Appliances</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20063">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ovens</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20064">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Small Appliances</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20065">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vaccum Cleaners</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20066">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Washing Machines & Dryers</option>' +
	'<option class="cat11-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Garden</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20067">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BBQ</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20068">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lawn Mowers</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20069">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Garden</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20070">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outdoor Setting</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20071">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pool</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20072">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sheds</option>' +
	'<option class="cat11-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Furniture</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20074">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beds</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20075">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chairs</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20076">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desks</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20077">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mirrors</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20078">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Furniture</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20079">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sofas</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20080">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tables</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20081">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wardrobes</option>' +
	'<option class="cat11-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Home Decor</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20083">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manchester</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20084">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Curtains & Blinds</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20085">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lights & Lamps</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20086">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Soft Furnishings</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20087">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rugs & Carpets</option>' +
	'<option class="cat11-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Tools & DIY</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20090">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hand Tools</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20091">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ladders & Scaffholding</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20092">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Tools & DIY</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20093">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Power Tools</option>' +
	'<option class="cat11-lvl3 cat-lvl3" value="20094">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tool Storage & Benches</option>' +
	'<option class="cat11-lvl2 cat-lvl2" value="18403">&nbsp;&nbsp;&nbsp;&nbsp;Other Home & Garden</option>' +
	'<option class="cat12-lvl1 cat-lvl1" disabled="disabled">Jobs</option>' +
	'<option class="cat12-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Construction & Trades</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18501">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Architecture</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18502">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Building Maintenance</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18504">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engineering</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18505">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Construction & Trades</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18503">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tradesmen & Labour</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18491">&nbsp;&nbsp;&nbsp;&nbsp;Sales & Call Centres</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18384">&nbsp;&nbsp;&nbsp;&nbsp;Farming & Veterinary</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18299">&nbsp;&nbsp;&nbsp;&nbsp;Finance</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18385">&nbsp;&nbsp;&nbsp;&nbsp;Gardening & Landscaping</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18470">&nbsp;&nbsp;&nbsp;&nbsp;Graphic & Web Design</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18464">&nbsp;&nbsp;&nbsp;&nbsp;Health,Sports & Beauty</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18348">&nbsp;&nbsp;&nbsp;&nbsp;Healthcare & Nursing</option>' +
	'<option class="cat12-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Hospitality</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18492">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bar Staff</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="20032">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Baristas</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18343">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chefs & Cooks</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18493">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Concierge</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="20033">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Management</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="20034">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kitchen Hand</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18495">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Hospitality</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18494">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Waiting Staff</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18386">&nbsp;&nbsp;&nbsp;&nbsp;Housekeeping</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18344">&nbsp;&nbsp;&nbsp;&nbsp;IT</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="20036">&nbsp;&nbsp;&nbsp;&nbsp;Real Estate & Housing</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="20035">&nbsp;&nbsp;&nbsp;&nbsp;Legal</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18463">&nbsp;&nbsp;&nbsp;&nbsp;Moving & Removals</option>' +
	'<option class="cat12-lvl2 cat-lvl2" disabled="disabled">&nbsp;&nbsp;&nbsp;&nbsp;Nanny & Babysitting</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18496">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Live-in Nannies</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18497">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Live-out Nannies</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18498">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maternity Nurse</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18499">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nanny Share</option>' +
	'<option class="cat12-lvl3 cat-lvl3" value="18500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Nanny & Babysitting</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18351">&nbsp;&nbsp;&nbsp;&nbsp;Office</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18347">&nbsp;&nbsp;&nbsp;&nbsp;Other Jobs</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18387">&nbsp;&nbsp;&nbsp;&nbsp;Recruitment & HR</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18353">&nbsp;&nbsp;&nbsp;&nbsp;Retail</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18354">&nbsp;&nbsp;&nbsp;&nbsp;Sales & Marketing</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18388">&nbsp;&nbsp;&nbsp;&nbsp;Sports & Healthclub</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18355">&nbsp;&nbsp;&nbsp;&nbsp;Teaching & Childcare</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18428">&nbsp;&nbsp;&nbsp;&nbsp;Training & Development</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18490">&nbsp;&nbsp;&nbsp;&nbsp;Transport & Logistics</option>' +
	'<option class="cat12-lvl2 cat-lvl2" value="18489">&nbsp;&nbsp;&nbsp;&nbsp;Volunteer</option>' +
	'<option class="cat13-lvl1 cat-lvl1" value="18319">Miscellaneous Goods</option>' +
	'<option class="cat14-lvl1 cat-lvl1" disabled="disabled">Pets</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="18456">&nbsp;&nbsp;&nbsp;&nbsp;Birds</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="18435">&nbsp;&nbsp;&nbsp;&nbsp;Cats & Kittens</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="18434">&nbsp;&nbsp;&nbsp;&nbsp;Dogs & Puppies</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="20022">&nbsp;&nbsp;&nbsp;&nbsp;Fish</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="18632">&nbsp;&nbsp;&nbsp;&nbsp;Horses & Ponies</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="18457">&nbsp;&nbsp;&nbsp;&nbsp;Livestock</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="18437">&nbsp;&nbsp;&nbsp;&nbsp;Lost & Found</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="18436">&nbsp;&nbsp;&nbsp;&nbsp;Other Pets</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="18438">&nbsp;&nbsp;&nbsp;&nbsp;Pet Products</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="20023">&nbsp;&nbsp;&nbsp;&nbsp;Rabbits</option>' +
	'<option class="cat14-lvl2 cat-lvl2" value="18649">&nbsp;&nbsp;&nbsp;&nbsp;Reptiles & Amphibians</option>' +
	'<option class="cat15-lvl1 cat-lvl1" disabled="disabled">Real Estate</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18468">&nbsp;&nbsp;&nbsp;&nbsp;Business For Sale</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18363">&nbsp;&nbsp;&nbsp;&nbsp;Couchsurfing</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="20031">&nbsp;&nbsp;&nbsp;&nbsp;Land For Sale</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18365">&nbsp;&nbsp;&nbsp;&nbsp;Office Space & Commercial</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18302">&nbsp;&nbsp;&nbsp;&nbsp;Other Real Estate</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18366">&nbsp;&nbsp;&nbsp;&nbsp;Parking & Storage</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18367">&nbsp;&nbsp;&nbsp;&nbsp;Property For Sale</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18364">&nbsp;&nbsp;&nbsp;&nbsp;Property for Rent</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18511">&nbsp;&nbsp;&nbsp;&nbsp;Roomshare</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18294">&nbsp;&nbsp;&nbsp;&nbsp;Flatshare & Houseshare</option>' +
	'<option class="cat15-lvl2 cat-lvl2" value="18295">&nbsp;&nbsp;&nbsp;&nbsp;Short Term</option>' +
	'<option class="cat16-lvl1 cat-lvl1" disabled="disabled">Sport & Fitness</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18560">&nbsp;&nbsp;&nbsp;&nbsp;Bicycles</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18561">&nbsp;&nbsp;&nbsp;&nbsp;Boxing & Martial Arts</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18562">&nbsp;&nbsp;&nbsp;&nbsp;Camping & Hiking</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18563">&nbsp;&nbsp;&nbsp;&nbsp;Fishing</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18564">&nbsp;&nbsp;&nbsp;&nbsp;Golf</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18565">&nbsp;&nbsp;&nbsp;&nbsp;Gym & Fitness</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18566">&nbsp;&nbsp;&nbsp;&nbsp;Sports Bags</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18569">&nbsp;&nbsp;&nbsp;&nbsp;Other Sports & Fitness</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18559">&nbsp;&nbsp;&nbsp;&nbsp;Racket Sports</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18567">&nbsp;&nbsp;&nbsp;&nbsp;Skateboards & Rollerblades</option>' +
	'<option class="cat16-lvl2 cat-lvl2" value="18568">&nbsp;&nbsp;&nbsp;&nbsp;Surfing</option>';

// In order to the category box HTML, we must swap in our version at the correct time.
// This must happen before manageAds.js is run, because it pulls Belen.tns.controller.vars inside an enclosure.
// If we perform the insertion too late, manageAds.js will have already run.
// Too early and the inline script will redefine Belen.tns.controller.vars and our changes here will not have any effect.
// We rely on the "beforeload" event (WebKit only), which runs before external resources, such a scripts, are processed.
// We want to run this code right before manageAds.js, but after the inline JS has run.
function setCatSelectOpts(evt) {

    // Check that the source of the beforeload event is the manageAds script
    if (evt.srcElement.tagName == "SCRIPT" && evt.srcElement.src.match(/manageAds\.js$/)) {

		// Chrome extensions have no access to variables defined on the page, so we have to inject a script
		var newScript = document.createElement("script");
		newScript.setAttribute("type", "text/javascript");
		var newScriptText = "Belen.tns.controller.vars.catSelectOpts = '" + catSelectOpts + "';";
		newScript.appendChild(document.createTextNode(newScriptText));

		// While we are at it, set up a stylesheet to style the new category select box
		var newStyle = document.createElement("style");
		newStyle.setAttribute("type", "text/css");
		var newStyleText =
			".cat-lvl1             { color: #FFF; }\n";
		newStyleText +=
			".cat-lvl2,.cat-lvl3   { color: #000; }\n\n";

		// Pretty colours generated using hand-picked hues beginning here:
		// http://tristen.ca/hcl-picker/#/clh/6/0/6C2E23/FEC7A9
		newStyleText +=
			".cat1-lvl1,.cat9-lvl1  { background-color: #8F4738; }\n" +
			".cat2-lvl1,.cat10-lvl1 { background-color: #7C5320; }\n" +
			".cat3-lvl1,.cat11-lvl1 { background-color: #5D5F1E; }\n" +
			".cat4-lvl1,.cat12-lvl1 { background-color: #236845; }\n" +
			".cat5-lvl1,.cat13-lvl1 { background-color: #2C627A; }\n" +
			".cat6-lvl1,.cat14-lvl1 { background-color: #545A7C; }\n" +
			".cat7-lvl1,.cat15-lvl1 { background-color: #6B5377; }\n" +
			".cat8-lvl1,.cat16-lvl1 { background-color: #8D4557; }\n\n";

		newStyleText +=
			".cat1-lvl2,.cat9-lvl2  { background-color: #E8A388; }\n" +
			".cat2-lvl2,.cat10-lvl2 { background-color: #D8AB76; }\n" +
			".cat3-lvl2,.cat11-lvl2 { background-color: #BEB575; }\n" +
			".cat4-lvl2,.cat12-lvl2 { background-color: #96BD93; }\n" +
			".cat5-lvl2,.cat13-lvl2 { background-color: #A0B7BF; }\n" +
			".cat6-lvl2,.cat14-lvl2 { background-color: #B8B0C1; }\n" +
			".cat7-lvl2,.cat15-lvl2 { background-color: #C8ABBC; }\n" +
			".cat8-lvl2,.cat16-lvl2 { background-color: #E5A2A2; }\n\n";

		newStyleText +=
			".cat1-lvl3,.cat9-lvl3  { background-color: #FEC7A9; }\n" +
			".cat2-lvl3,.cat10-lvl3 { background-color: #F3CC9D; }\n" +
			".cat3-lvl3,.cat11-lvl3 { background-color: #E0D39C; }\n" +
			".cat4-lvl3,.cat12-lvl3 { background-color: #C6D9B0; }\n" +
			".cat5-lvl3,.cat13-lvl3 { background-color: #CDD4CF; }\n" +
			".cat6-lvl3,.cat14-lvl3 { background-color: #DDCFD0; }\n" +
			".cat7-lvl3,.cat15-lvl3 { background-color: #E8CCCD; }\n" +
			".cat8-lvl3,.cat16-lvl3 { background-color: #FCC6BB; }";
			
		newStyle.appendChild(document.createTextNode(newStyleText));

		// Add the script and stylesheet to the page; the script will be run immediately after insertion
		document.body.appendChild(newScript);
		document.body.appendChild(newStyle);
    }
}

// Before any external resources are loaded, swap out the category select HTML
document.addEventListener('beforeload', setCatSelectOpts, true);
