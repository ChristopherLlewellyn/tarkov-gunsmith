# Tarkov Gunsmith 
[Tarkov Gunsmith Website](https://www.tarkov-gunsmith.com/)

A web application providing community curated weapon builds complete with compatibility, stats and flea market prices for [Escape from Tarkov](https://www.escapefromtarkov.com/).

## Features
* Authentication - traditional email/password and verification email authentication, plus single sign on with Google and Discord authentication

* Weapon builder with all weapon/attachment compatibility

* Caliber, ergonomics, vertical/horizontal recoil, recoil modifiers and weight stats for all weapons and attachments

* Flea market prices (updated every few hours)

* Search for loadouts by weapon + price range

* Item stats and prices are automatically kept up to date

## Tools
**Client**

The client/frontend has been built with [Vue](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/).

**Server**

The server is a REST API that has been built with [AdonisJs](https://adonisjs.com/) (a Node.js framework) and connects to a [MYSQL](https://www.mysql.com/) database.

## Thanks

Big thanks to [Morphy2k](https://www.reddit.com/user/Morphy2k) for all the work he does - without him this project in its current form wouldn't exist. 

Check out his work here: [Tarkov-Database](https://tarkov-database.com/)

## Screenshots
![Weapon builder](/Screenshots/weapon-builder.PNG)
![Hover items for info](/Screenshots/hover-item.PNG)
![Components summary](/Screenshots/components-summary.PNG)
![Search for loadouts](/Screenshots/search-loadouts.PNG)
![Sign In (ft. Discord and Google auth)](/Screenshots/sign-in.PNG)
