import { element, by, ElementFinder } from 'protractor';

export class ProductoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-producto div table .btn-danger'));
    title = element.all(by.css('jhi-producto div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class ProductoUpdatePage {
    pageTitle = element(by.id('jhi-producto-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codigoInput = element(by.id('field_codigo'));
    nombreInput = element(by.id('field_nombre'));
    descripcionInput = element(by.id('field_descripcion'));
    imagenInput = element(by.id('file_imagen'));
    stockInput = element(by.id('field_stock'));
    notificacionDeLimiteDeStockInput = element(by.id('field_notificacionDeLimiteDeStock'));
    unidadDeMedidaSelect = element(by.id('field_unidadDeMedida'));
    precioVentaInput = element(by.id('field_precioVenta'));
    precioCompraInput = element(by.id('field_precioCompra'));
    categoriaSelect = element(by.id('field_categoria'));
    variantesSelect = element(by.id('field_variantes'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setCodigoInput(codigo) {
        await this.codigoInput.sendKeys(codigo);
    }

    async getCodigoInput() {
        return this.codigoInput.getAttribute('value');
    }

    async setNombreInput(nombre) {
        await this.nombreInput.sendKeys(nombre);
    }

    async getNombreInput() {
        return this.nombreInput.getAttribute('value');
    }

    async setDescripcionInput(descripcion) {
        await this.descripcionInput.sendKeys(descripcion);
    }

    async getDescripcionInput() {
        return this.descripcionInput.getAttribute('value');
    }

    async setImagenInput(imagen) {
        await this.imagenInput.sendKeys(imagen);
    }

    async getImagenInput() {
        return this.imagenInput.getAttribute('value');
    }

    async setStockInput(stock) {
        await this.stockInput.sendKeys(stock);
    }

    async getStockInput() {
        return this.stockInput.getAttribute('value');
    }

    async setNotificacionDeLimiteDeStockInput(notificacionDeLimiteDeStock) {
        await this.notificacionDeLimiteDeStockInput.sendKeys(notificacionDeLimiteDeStock);
    }

    async getNotificacionDeLimiteDeStockInput() {
        return this.notificacionDeLimiteDeStockInput.getAttribute('value');
    }

    async setUnidadDeMedidaSelect(unidadDeMedida) {
        await this.unidadDeMedidaSelect.sendKeys(unidadDeMedida);
    }

    async getUnidadDeMedidaSelect() {
        return this.unidadDeMedidaSelect.element(by.css('option:checked')).getText();
    }

    async unidadDeMedidaSelectLastOption() {
        await this.unidadDeMedidaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setPrecioVentaInput(precioVenta) {
        await this.precioVentaInput.sendKeys(precioVenta);
    }

    async getPrecioVentaInput() {
        return this.precioVentaInput.getAttribute('value');
    }

    async setPrecioCompraInput(precioCompra) {
        await this.precioCompraInput.sendKeys(precioCompra);
    }

    async getPrecioCompraInput() {
        return this.precioCompraInput.getAttribute('value');
    }

    async categoriaSelectLastOption() {
        await this.categoriaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async categoriaSelectOption(option) {
        await this.categoriaSelect.sendKeys(option);
    }

    getCategoriaSelect(): ElementFinder {
        return this.categoriaSelect;
    }

    async getCategoriaSelectedOption() {
        return this.categoriaSelect.element(by.css('option:checked')).getText();
    }

    async variantesSelectLastOption() {
        await this.variantesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async variantesSelectOption(option) {
        await this.variantesSelect.sendKeys(option);
    }

    getVariantesSelect(): ElementFinder {
        return this.variantesSelect;
    }

    async getVariantesSelectedOption() {
        return this.variantesSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ProductoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-producto-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-producto'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
