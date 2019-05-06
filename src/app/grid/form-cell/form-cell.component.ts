import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form-cell',
    templateUrl: 'form-cell.component.html'
})
export class FormCellComponent {
    formGroup: FormGroup;
    key;
    private value;
    columnName: string;

    /* called on each of the newly created cell */
    agInit(params: any) { /* agInit: life cycle method provided for registered component that grid uses to provide initial state & params */
        this.columnName = params.column.colDef.headerName;
        this.key = params.context.createKey(params.node.id, params.column);
        this.value = params.value;
    }

    /*  */
    refresh(params: any): boolean {
        this.formGroup = params.context.formGroup;
        /* 每一个表单群有一个控制器属性: 提供一个 Object 数组包含所有通过键值对儿存储的控制器, 通过下标操作符提取对应键的控制器 */
        console.log(params.context);
        this.formGroup.controls[this.key].patchValue(this.value); /* 发送当前控制器对应的用户键入数值 */

        return true;
    }
}
