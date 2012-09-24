// Ad category SELECT boxes are generated based on an HTML string defined in a script block at the bottom of the main page.
// If we catch the page load at just the right time, we can replace that with our own code.
// The following HTML generates an indented, rainbow-coloured category list that is hopefully easier to use than the default.
var catSelectOpts =
	'<option disabled="disabled" class="cat1-lvl1 cat-lvl1">Automotive</option>' +
	'<option disabled="disabled" class="cat1-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Caravan &amp; Campervan</option>' +
	'<option value="20011"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Campervan</option>' +
	'<option value="20012"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Caravan</option>' +
	'<option value="18320"       class="cat1-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Cars</option>' +
	'<option value="18460"       class="cat1-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Heavy, Farming &amp; Agriculture Equipment</option>' +
	'<option disabled="disabled" class="cat1-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Motorcycles &amp; Scooters</option>' +
	'<option value="18627"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessories</option>' +
	'<option value="18626"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Motorcycles</option>' +
	'<option value="18630"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Motorcycles &amp; Scooters</option>' +
	'<option value="18628"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Parts</option>' +
	'<option value="18629"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scooters</option>' +
	'<option value="18375"       class="cat1-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Other Automotive</option>' +
	'<option disabled="disabled" class="cat1-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Parts &amp; Accessories</option>' +
	'<option value="18473"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Audio, GPS, &amp; Car Alarms</option>' +
	'<option value="18474"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Auto Body parts</option>' +
	'<option value="18479"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brakes &amp; Suspension</option>' +
	'<option value="18475"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine, Engine Parts &amp; Transmission</option>' +
	'<option value="18480"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Oil, Coolant &amp; Liquids</option>' +
	'<option value="18478"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Parts &amp; Accessories</option>' +
	'<option value="18481"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Truck Parts</option>' +
	'<option value="18476"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wheels, Tyres &amp; Rims</option>' +
	'<option value="18482"       class="cat1-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wrecking</option>' +
	'<option value="20037"       class="cat1-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Trailers</option>' +
	'<option value="18404"       class="cat1-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Van &amp; Ute</option>' +
	'<option disabled="disabled" class="cat2-lvl1 cat-lvl1">Boats &amp; Jet Skis</option>' +
	'<option value="20004"       class="cat2-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Boat Accessories &amp; Parts</option>' +
	'<option value="20024"       class="cat2-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Jet Skis</option>' +
	'<option value="20025"       class="cat2-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Kayaks &amp; Paddle</option>' +
	'<option value="20026"       class="cat2-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Motorboats &amp; Powerboats</option>' +
	'<option value="20027"       class="cat2-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Other Boats &amp; Jet Skis</option>' +
	'<option value="20028"       class="cat2-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Sail Boats</option>' +
	'<option value="20029"       class="cat2-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Tinnies &amp; Dinghies</option>' +
	'<option disabled="disabled" class="cat3-lvl1 cat-lvl1">Business Services</option>' +
	'<option value="20010"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Appliance &amp; Phone Repair</option>' +
	'<option value="18461"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Automotive</option>' +
	'<option disabled="disabled" class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Building &amp; Trades</option>' +
	'<option value="18634"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Airconditioning &amp; Heating</option>' +
	'<option value="18635"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Carpentry</option>' +
	'<option value="20014"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Concreting &amp; Paving</option>' +
	'<option value="18636"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cleaning</option>' +
	'<option value="18637"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Electrical</option>' +
	'<option value="20015"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fencing &amp; Gates</option>' +
	'<option value="20016"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Flooring</option>' +
	'<option value="20017"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Handymen</option>' +
	'<option value="18638"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Landscaping &amp; Gardening</option>' +
	'<option value="18642"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Building &amp; Trades</option>' +
	'<option value="18639"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Painting &amp; Decorating</option>' +
	'<option value="18640"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastering &amp; Tiling</option>' +
	'<option value="18641"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plumbing</option>' +
	'<option value="20030"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Roofing</option>' +
	'<option value="18465"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Childcare &amp; Nanny</option>' +
	'<option value="18442"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Cleaning</option>' +
	'<option value="18358"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Computer, Telecom &amp; Freelance</option>' +
	'<option value="18446"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Courses &amp; Training</option>' +
	'<option value="20013"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Dress Making &amp; Alterations</option>' +
	'<option value="18443"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Entertainment</option>' +
	'<option value="18469"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Graphic &amp; Web Design</option>' +
	'<option disabled="disabled" class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Health &amp; Beauty</option>' +
	'<option value="18644"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alternative Therapies</option>' +
	'<option value="18645"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beauty Treatments</option>' +
	'<option value="18646"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hairdressing</option>' +
	'<option value="18647"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Massages</option>' +
	'<option value="18648"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Health &amp; Beauty</option>' +
	'<option value="18445"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Landscaping &amp; Gardening</option>' +
	'<option value="18466"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Language &amp; Tutoring</option>' +
	'<option value="20009"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Mechanics &amp; Garages</option>' +
	'<option value="18472"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Musicians &amp; Artists</option>' +
	'<option value="18360"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Other Business Services</option>' +
	'<option value="18447"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Party &amp; Catering</option>' +
	'<option value="18444"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Personal Training</option>' +
	'<option disabled="disabled" class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Pet Services</option>' +
	'<option value="20019"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grooming</option>' +
	'<option value="18439"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Pet Services</option>' +
	'<option value="20020"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sitting</option>' +
	'<option value="20021"       class="cat3-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Training</option>' +
	'<option value="18448"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Photography &amp; Video</option>' +
	'<option value="18467"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Real Estate</option>' +
	'<option value="18643"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Removals &amp; Storage</option>' +
	'<option value="18449"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Resume</option>' +
	'<option value="18451"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Tax, Insurance &amp; Financial</option>' +
	'<option value="18453"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Taxi, Chauffeur &amp; Airport Transfer</option>' +
	'<option value="18452"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Travel Agent</option>' +
	'<option value="18455"       class="cat3-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Wedding &amp; Venues</option>' +
	'<option disabled="disabled" class="cat4-lvl1 cat-lvl1">Community</option>' +
	'<option value="18324"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Activities &amp; Hobbies</option>' +
	'<option value="18325"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Classes</option>' +
	'<option value="20000"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Dance Partners</option>' +
	'<option value="18483"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Events</option>' +
	'<option value="18486"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Garage Sale</option>' +
	'<option value="18330"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Language Swap</option>' +
	'<option value="18326"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Lost &amp; Found</option>' +
	'<option value="18441"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Missed Connections</option>' +
	'<option value="18327"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Musicians &amp; Artists</option>' +
	'<option value="18333"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Other Community</option>' +
	'<option value="18331"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Sports Partners</option>' +
	'<option value="18332"       class="cat4-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Rideshare &amp; Travel Partners</option>' +
	'<option disabled="disabled" class="cat5-lvl1 cat-lvl1">Tickets</option>' +
	'<option value="20001"       class="cat5-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Bus, Train &amp; Plane</option>' +
	'<option value="18484"       class="cat5-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Concerts</option>' +
	'<option value="18488"       class="cat5-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Other Tickets</option>' +
	'<option value="18485"       class="cat5-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Sport</option>' +
	'<option value="20002"       class="cat5-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Theatre/Film</option>' +
	'<option disabled="disabled" class="cat6-lvl1 cat-lvl1">Jobs</option>' +
	'<option disabled="disabled" class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Construction &amp; Trades</option>' +
	'<option value="18501"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Architecture</option>' +
	'<option value="18502"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Building Maintenance</option>' +
	'<option value="18504"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engineering</option>' +
	'<option value="18505"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Construction &amp; Trades</option>' +
	'<option value="18503"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tradesmen &amp; Labour</option>' +
	'<option value="18491"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Sales &amp; Call Centres</option>' +
	'<option value="18384"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Farming &amp; Veterinary</option>' +
	'<option value="18299"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Finance</option>' +
	'<option value="18385"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Gardening &amp; Landscaping</option>' +
	'<option value="18470"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Graphic &amp; Web Design</option>' +
	'<option value="18464"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Health,Sports &amp; Beauty</option>' +
	'<option value="18348"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Healthcare &amp; Nursing</option>' +
	'<option disabled="disabled" class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Hospitality</option>' +
	'<option value="18492"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bar Staff</option>' +
	'<option value="20032"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Baristas</option>' +
	'<option value="18343"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chefs &amp; Cooks</option>' +
	'<option value="18493"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Concierge</option>' +
	'<option value="20033"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Management</option>' +
	'<option value="20034"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kitchen Hand</option>' +
	'<option value="18495"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Hospitality</option>' +
	'<option value="18494"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Waiting Staff</option>' +
	'<option value="18386"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Housekeeping</option>' +
	'<option value="18344"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;IT</option>' +
	'<option value="20036"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Real Estate &amp; Housing</option>' +
	'<option value="20035"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Legal</option>' +
	'<option value="18463"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Moving &amp; Removals</option>' +
	'<option disabled="disabled" class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Nanny &amp; Babysitting</option>' +
	'<option value="18496"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Live-in Nannies</option>' +
	'<option value="18497"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Live-out Nannies</option>' +
	'<option value="18498"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maternity Nurse</option>' +
	'<option value="18499"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nanny Share</option>' +
	'<option value="18500"       class="cat6-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Nanny &amp; Babysitting</option>' +
	'<option value="18351"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Office</option>' +
	'<option value="18347"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Other Jobs</option>' +
	'<option value="18387"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Recruitment &amp; HR</option>' +
	'<option value="18353"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Retail</option>' +
	'<option value="18354"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Sales &amp; Marketing</option>' +
	'<option value="18388"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Sports &amp; Healthclub</option>' +
	'<option value="18355"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Teaching &amp; Childcare</option>' +
	'<option value="18428"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Training &amp; Development</option>' +
	'<option value="18490"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Transport &amp; Logistics</option>' +
	'<option value="18489"       class="cat6-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Volunteer</option>' +
	'<option disabled="disabled" class="cat7-lvl1 cat-lvl1">Pets</option>' +
	'<option value="18456"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Birds</option>' +
	'<option value="18435"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Cats &amp; Kittens</option>' +
	'<option value="18434"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Dogs &amp; Puppies</option>' +
	'<option value="20022"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Fish</option>' +
	'<option value="18632"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Horses &amp; Ponies</option>' +
	'<option value="18457"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Livestock</option>' +
	'<option value="18437"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Lost &amp; Found</option>' +
	'<option value="18436"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Other Pets</option>' +
	'<option value="18438"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Pet Products</option>' +
	'<option value="20023"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Rabbits</option>' +
	'<option value="18649"       class="cat7-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Reptiles &amp; Amphibians</option>' +
	'<option disabled="disabled" class="cat8-lvl1 cat-lvl1">Real Estate</option>' +
	'<option value="18363"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Couchsurfing</option>' +
	'<option value="20031"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Land For Sale</option>' +
	'<option value="18365"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Office Space &amp; Commercial</option>' +
	'<option value="18302"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Other Real Estate</option>' +
	'<option value="18366"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Parking &amp; Storage</option>' +
	'<option value="18367"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Property For Sale</option>' +
	'<option value="18364"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Property for Rent</option>' +
	'<option value="18511"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Roomshare</option>' +
	'<option value="18294"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Flatshare &amp; Houseshare</option>' +
	'<option value="18295"       class="cat8-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Short Term</option>' +
	'<option disabled="disabled" class="cat9-lvl1 cat-lvl1">Stuff for Sale</option>' +
	'<option value="18297"       class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Antiques &amp; Collectables</option>' +
	'<option value="18625"       class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Audio</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Baby &amp; Maternity</option>' +
	'<option value="18577"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Baby Carriers</option>' +
	'<option value="18578"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Baby Clothing</option>' +
	'<option value="18579"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Baths</option>' +
	'<option value="18580"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cots &amp; Bedding</option>' +
	'<option value="18581"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feeding</option>' +
	'<option value="18585"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Indoor Toys</option>' +
	'<option value="18582"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maternity Clothing</option>' +
	'<option value="18584"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Baby &amp; Maternity</option>' +
	'<option value="18586"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outdoor Toys</option>' +
	'<option value="18583"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prams &amp; Strollers</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Books &amp; Games</option>' +
	'<option value="18587"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Children\\\'s Books</option>' +
	'<option value="18588"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comic Books</option>' +
	'<option value="18589"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fiction Books</option>' +
	'<option value="18595"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Games</option>' +
	'<option value="18590"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Graphic Novels</option>' +
	'<option value="18591"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Magazines</option>' +
	'<option value="18592"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Non Fiction Books</option>' +
	'<option value="18596"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Books &amp; Games</option>' +
	'<option value="18593"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Textbooks</option>' +
	'<option value="18594"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Travel Guides</option>' +
	'<option value="18468"       class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Business For Sale</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Cameras</option>' +
	'<option value="18622"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Digital Camera Accessories</option>' +
	'<option value="18621"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Digital Cameras</option>' +
	'<option value="18623"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Non Digital Cameras</option>' +
	'<option value="18624"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Cameras</option>' +
	'<option value="18620"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video Camera Accessories</option>' +
	'<option value="18619"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video Cameras</option>' +
	'<option value="18307"       class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;CDs &amp; DVDs</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Clothing</option>' +
	'<option value="18575"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessories</option>' +
	'<option value="18574"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bags</option>' +
	'<option value="18571"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Men\\\'s Clothing</option>' +
	'<option value="18573"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Men\\\'s Shoes</option>' +
	'<option value="18576"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Clothing</option>' +
	'<option value="18570"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Women\\\'s Clothing</option>' +
	'<option value="18572"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Women\\\'s Shoes</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Computers &amp; Software</option>' +
	'<option value="18552"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Components</option>' +
	'<option value="18551"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desktops</option>' +
	'<option value="18554"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Laptop Accessories</option>' +
	'<option value="18553"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Laptops</option>' +
	'<option value="18558"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Computers &amp; Software</option>' +
	'<option value="18555"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Printers</option>' +
	'<option value="18556"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Software</option>' +
	'<option value="18557"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Speakers</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Home &amp; Garden</option>' +
	'<option value="18402"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Appliances</option>' +
	'<option value="18398"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Backyard &amp; Bbq</option>' +
	'<option value="18399"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bedroom</option>' +
	'<option value="18400"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kitchen</option>' +
	'<option value="18401"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Living room</option>' +
	'<option value="18403"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Home &amp; Garden</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Jewellery</option>' +
	'<option value="18603"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Men\\\'s Jewellery</option>' +
	'<option value="18606"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Jewellery</option>' +
	'<option value="18604"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unisex Jewellery</option>' +
	'<option value="18605"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Watches</option>' +
	'<option value="18602"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Women\\\'s Jewellery</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Musical Instruments</option>' +
	'<option value="18612"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DJ Gear &amp; Lighting</option>' +
	'<option value="18608"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Guitars &amp; Amps</option>' +
	'<option value="18613"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instrument Accessories</option>' +
	'<option value="18609"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Keyboards &amp; Pianos</option>' +
	'<option value="18614"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Musical Instruments</option>' +
	'<option value="18610"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Percussion &amp; Drums</option>' +
	'<option value="18611"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Woodwind &amp; Brass</option>' +
	'<option value="18319"       class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Other Stuff For Sale</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Phones</option>' +
	'<option value="18599"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home Phones</option>' +
	'<option value="18598"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mobile Phone Accessories</option>' +
	'<option value="18597"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mobile Phones</option>' +
	'<option value="18600"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Phones</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Sport &amp; Fitness</option>' +
	'<option value="18560"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bicycles</option>' +
	'<option value="18561"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boxing &amp; Martial Arts</option>' +
	'<option value="18562"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Camping &amp; Hiking</option>' +
	'<option value="18563"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fishing</option>' +
	'<option value="18564"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Golf</option>' +
	'<option value="18565"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gym &amp; Fitness</option>' +
	'<option value="18566"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Luggage</option>' +
	'<option value="18569"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Sports &amp; Fitness</option>' +
	'<option value="18559"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Racket Sports</option>' +
	'<option value="18567"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skateboards &amp; Rollerblades</option>' +
	'<option value="18568"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Surfing</option>' +
	'<option value="18430"       class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Tools &amp; DIY</option>' +
	'<option value="18316"       class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;TV &amp; DVD players</option>' +
	'<option disabled="disabled" class="cat9-lvl2 cat-lvl2">&nbsp;&nbsp;&nbsp;&nbsp;Video Games &amp; Consoles</option>' +
	'<option value="18616"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessories</option>' +
	'<option value="18617"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consoles</option>' +
	'<option value="18618"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other Video Games &amp; Consoles</option>' +
	'<option value="18615"       class="cat9-lvl3 cat-lvl3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video Games</option>';

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
			".cat1-lvl1,.cat2-lvl1 { background-color: #8F4738; }\n" +
			".cat3-lvl1            { background-color: #7C5320; }\n" +
			".cat4-lvl1            { background-color: #5D5F1E; }\n" +
			".cat5-lvl1            { background-color: #236845; }\n" +
			".cat6-lvl1            { background-color: #2C627A; }\n" +
			".cat7-lvl1            { background-color: #545A7C; }\n" +
			".cat8-lvl1            { background-color: #6B5377; }\n" +
			".cat9-lvl1            { background-color: #8D4557; }\n\n";

		newStyleText +=
			".cat1-lvl2,.cat2-lvl2 { background-color: #E8A388; }\n" +
			".cat3-lvl2            { background-color: #D8AB76; }\n" +
			".cat4-lvl2            { background-color: #BEB575; }\n" +
			".cat5-lvl2            { background-color: #96BD93; }\n" +
			".cat6-lvl2            { background-color: #A0B7BF; }\n" +
			".cat7-lvl2            { background-color: #B8B0C1; }\n" +
			".cat8-lvl2            { background-color: #C8ABBC; }\n" +
			".cat9-lvl2            { background-color: #E5A2A2; }\n\n";

		newStyleText +=
			".cat1-lvl3,.cat2-lvl3 { background-color: #FEC7A9; }\n" +
			".cat3-lvl3            { background-color: #F3CC9D; }\n" +
			".cat4-lvl3            { background-color: #E0D39C; }\n" +
			".cat5-lvl3            { background-color: #C6D9B0; }\n" +
			".cat6-lvl3            { background-color: #CDD4CF; }\n" +
			".cat7-lvl3            { background-color: #DDCFD0; }\n" +
			".cat8-lvl3            { background-color: #E8CCCD; }\n" +
			".cat9-lvl3            { background-color: #FCC6BB; }";
			
		newStyle.appendChild(document.createTextNode(newStyleText));

		// Add the script and stylesheet to the page; the script will be run immediately after insertion
		document.body.appendChild(newScript);
		document.body.appendChild(newStyle);
    }
}

// Before any external resources are loaded, swap out the category select HTML
document.addEventListener('beforeload', setCatSelectOpts, true);
