
# Modele SQL
Modele Sql is a sql design tool build in VueJs. We wanted to create an easy to use sql design tool for you guys to use and view the full picture of your own design. Of course more features are coming. We are intent to build more than what we are showing right now. As for future plans we wish to create migrations for ROR and Laravel Framework!

## How to use
Table and column are be able to drag and drop everywhere. <br/>
Create table `alt + click(anywhere)` or use `create table button`  <br/> 
Submit table name `enter in in table title input` <br/>
Edit table name `double click on the table name to show input box` <br/>
Submit column name `enter in name or default fields` or `click update button` <br/>
Edit column `double click on the column name to show input settings` <br/>
 
Create foreign key 
- Column must be primary key or unique.
- Click `set foriegn button` then `click on any table (this will create new column under that table and auto link foreign key)`<br/>

OR<br/>

- Click `set foriegn button` then `tap on any column (tab on own table column are not allowed)` this will link the foreign key up.

Remove foreign key - simply tap remove foreign key button at the child column

## Build Setup

``` bash
# install 
npm install

or 

# yarn supporter !
yarn install
```

## Run
``` bash
# serve with hot reload at localhost:8000
npm run dev // yarn run dev

# build for production with minification
npm run build // yarn run dev
```  

# License
Faker is released under the MIT Licence. See the bundled LICENSE file for details.
