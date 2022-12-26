sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logalygroup.employees.controller.MainView", {
            onInit: function () {

            },
            onValidate: function () {
                var inputEmployee = this.byId("inputEmployee");
                var valueEployee = inputEmployee.getValue();

                if (valueEployee.length === 6) {
                    inputEmployee.setDescription("OK");
                } else {
                    inputEmployee.setDescription("Not OK");
                }
            }
        });
    });
