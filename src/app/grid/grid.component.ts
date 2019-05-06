import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Column, ColumnApi, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';

import { FormCellComponent } from './form-cell/form-cell.component';

@Component({
    selector: 'app-grid',
    templateUrl: 'grid.component.html'
})
export class GridComponent {
    @ViewChild(FormCellComponent)
    private formCell: FormCellComponent;
    private api: GridApi;
    private columnApi: ColumnApi;

    /* formGroup: aggregates the values of each FormControl into one object */
    /* formControl: tracks the value of an individual form control */
    formGroup: FormGroup = new FormGroup({});

    columnDefs;
    rowData;

    constructor(public snackBar: MatSnackBar) {
        this.columnDefs = [
            { headerName: 'Order #', field: 'orderNumber', width: 110, suppressSizeToFit: true },
            { headerName: 'Make', field: 'make', cellRenderer: this.formCell },
            { headerName: 'Model', field: 'model', cellRenderer: this.formCell },
            { headerName: 'Price', field: 'price', cellRenderer: this.formCell }
        ];

        this.rowData = [
            { orderNumber: 1, make: 'Toyota', model: 'Camery', price: 35000 },
            { orderNumber: 2, make: 'Ford', model: 'Mondeo', price: 32000 },
            { orderNumber: 3, make: 'Porsche', model: 'Boxter', price: 72000 },
            { orderNumber: 4, make: 'Benz', model: 'GLE450', price: 132000 },
            { orderNumber: 5, make: 'Honda', model: 'Civic', price: 35000 },
        ];
    }

    /* when fired, it usually means that the grid and all the cells are ready to go */
    gridReady(params: GridReadyEvent) {
        /* 预先声明表单并异步加入表单数据 (cell) */
        this.api = params.api;
        this.columnApi = params.columnApi;

        /* when grid is ready, create and bind FormControls to parent FormGroup */
        this.createFormControls();
        /* then force refresh the cells to update the cells themselves */
        this.api.refreshCells({force: true});
        /* 当表单数据更新时自动调整列宽 */
        this.api.sizeColumnsToFit();
    }

    /* 异步创建表单控制器并加入父类表单群组 */
    private createFormControls() {
        /* 通过列表接口得到所有的列表 */
        const columns = this.columnApi.getAllColumns();

        /* forEachNode: iterate through each node (row) in the grid and call the callback for each node */
        this.api.forEachNode((rowNode: RowNode) => {
            /* 对于每一排的数据, 过滤掉标签为 orderNumber 的列 */
            /* getColDef(): 返回当前列的定义 Object 中的 field 属性 */
            columns.filter(column => column.getColDef().field !== 'orderNumber')
                .forEach((column: Column) => {
                    /* Column: 被过滤掉后的所有保留的数据类型 */
                    /* 通过当前格子的排和列坐标为其创建独一无二的 id */
                    const key = this.createKey(rowNode.id, column);
                    /* 转化当前格子 (cell) 为表单控制器并加入表单组群 */
                    /* 当前格子  (cell) 代表的表单控制器是一个通过 id 鉴别的全新的 FormControl */
                    this.formGroup.addControl(key, new FormControl());
                });
        });
    }

    /* customize row node id instead of using default generated one */
    getRowNodeId(params: any) {
        /* 根据订单号产生 rowNode id */
        return params.orderNumber;
    }

    getComponents() {
        return {
            formCell: FormCellComponent
        };
    }

    /* 将会返回当前文本 Object, 其包含了所有的表单信息和数据 */
    getContext() {
        return {
            formGroup: this.formGroup,
            createKey: this.createKey
        };
    }

    onSubmit() {
        /* 将表单群的数据打印 */
        console.dir(this.formGroup.value);

        this.snackBar.open('Open Console for Form State', null, {
            verticalPosition: 'top',
            duration: 2000
        });
    }

    /* simple logic to generate a unique id for new created cell FormControl */
    private createKey(rowId: string, column: Column): string {
        return `$(rowId)${column.getColId()}`;
    }
}
