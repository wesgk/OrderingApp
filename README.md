# OrderingApp

## 2016/02/19
## Synopsis

This is a very simple application written in Angular 1.4.0 & Node Express express v4.2.1.  It is a inventory-listing/product-ordering app. All product orders are stored as .json files inside /app/data/order/.

* Currently the functionality is very limited.*

* Orders &amp; Users can be created and edited
* Vendor options supplied via Google Places API
..* Options filtered on users proximity, via GeoLocation
* Skeleton of SMS text messaging is working via Twilio's Node module

## Code Samples
This is the existing order object:
```
$scope.order = {
    vendor: '',
    customerId: 0,
    items: [
    {
      id: 1,
      count: '',
      type: '',
      size: ''
    }
    ]
};

$scope.user = { 
  fname: '',
  lname: '',
  email: '',
  telephone: '',
  paypalNumber: 0,
  addresses: [
  {
    id: '0',
    buildingNumber: '',
    apartmentNumber: '',
    streetName: '',
    city: '',
    country: '',
    province: '',
    postalCode: '',
    specialInstructions: ''
  }
  ],
  defaultAddress: ''
};
```
## Motivation
I wanted to develop a simple Angular application I can use as a starting point for future developments.  

## Installation
Requires Node express v4.2.1.  I did not commit the node_modules directory.  You can download that here: https://nodejs.org/download/release/v4.2.1/

## Tests
No testing scripts setup yet

## Contributors
@wesgknight

## License
see LICENSE.md

