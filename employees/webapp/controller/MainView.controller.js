sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("logalygroup.employees.controller.MainView", {
            onInit: function () {

                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oView = this.getView();
                oView.setModel(this.getOwnerComponent().getModel("i18n"), "i18n");
                var i18nBundle = oView.getModel("i18n").getResourceBundle();
                // var oJSON = {
                //     employeeId: "12345",
                //     countryKey: "US",
                //     countrList: [
                //         {
                //             key: "US",
                //             text: i18nBundle.getText("countryUS")
                //         },
                //         {
                //             key: "UK",
                //             text: i18nBundle.getText("countryUK")
                //         },
                //         {
                //             key: "ES",
                //             text: i18nBundle.getText("countryES")
                //         }
                //     ]

                // };
                //oJSONModel.setData(oJSON);
                oJSONModel.loadData("./localService/mockdata/Employees.json", false);
                // oJSONModel.attachRequestCompleted(function () {
                //          console.log(oJSONModel.getData());                         
                // });
                oView.setModel(oJSONModel);
                

            },

            onFilter: function(){
                var oJSON = this.getView().getModel().getData();
                var filters = [];
                if (oJSON.EmployeeId !== "") {
                    filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId));
                };
                if (oJSON.CountryKey !== "") {
                    filters.push(new Filter("Country", FilterOperator.EQ, oJSON.CountryKey));
                }

                var oTable = this.byId("tableEmployees");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(filters);

            },

            onClearFilter: function() {
                var oModel = this.getView().getModel();
                oModel.setProperty("/EmployeeId", "");
                oModel.setProperty("/CountryKey", "");
            },

            showPostalCode: function(oEvent){
                var itemPressed = oEvent.getSource();
                var oContext = itemPressed.getBindingContext().getObject();
                sap.m.MessageToast.show(oContext.PostalCode);

            },

            onValidate: function () {
                var inputEmployee = this.byId("inputEmployee");
                var valueEployee = inputEmployee.getValue();

                if (valueEployee.length === 6) {
                    //inputEmployee.setDescription("OK");
                    this.byId("labelCountry").setVisible(true);
                    this.byId("listCountry").setVisible(true);

                } else {
                    //inputEmployee.setDescription("Not OK");
                    this.byId("labelCountry").setVisible(false);
                    this.byId("listCountry").setVisible(false);
                }
            }
        });
    });
