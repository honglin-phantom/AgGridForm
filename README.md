# AgGridForm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## install Angular Material

npm install --save @angular/material

## install Angular CDK

npm install --save @angular/cdk

## install ag-grid

npm install --save ag-grid-community ag-grid-angular

## Demo: the grid is the form

the form will encompass the grid and be the only FormGroup used within the application, which each cell in the grid will reference to.

## mechanism

1. link child form cells within the grid to parent FormGroup and this is ordinarily done by specifying the formGroup and formControlName on child input as normal.

2. parent grid is the FormGroup for the application while each child cell acts as a formControl input