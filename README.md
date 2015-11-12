# OrderingApp

## 2015/11/11
## Synopsis

This is a very simple application written in Angular 1.4.0 & Node Express express v4.2.1.  It is a inventory-listing/product-ordering app. All product orders are stored as .json files inside /app/data/order/.

Currently the functionality is very limited.  Orders can be created and edited.  The 'list all orders' view displays a list of all existing orders.  Once the save button has been pressed on a new order additional order edits are automatically saved, as the order content is edited.

> Customer profiles have yet to be implemented
> Vendor options are hard-coded into the mark-up
> items.type options are hard-coded into the mark-up
> items.size options are hard-coded into the mark-up

## Code Sample
This is the existing order object:
```
$scope.order = {
  vendor: '',
  customerId: 0,
  items: [
    {
      id: 1,
      count: 0,
      type: '',
      size: ''
    }
  ]
};
```
## Motivation
I wanted to develop an app where users can order from multiple vendors in one simple place.  

## Installation
Requires Node express v4.2.1.  I did not commit the node_modules directory.  That is all that is missing.  (More installation notes to come.)

## Tests
No testing scripts setup yet

## Contributors
@wesgknight

## License


