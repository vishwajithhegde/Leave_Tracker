//***********************************************************************************************************************
var TeamListMappingModel = new sap.ui.model.json.JSONModel();
var yearmodel = new sap.ui.model.json.JSONModel();
var monthmodel = new sap.ui.model.json.JSONModel();
var shifttrackermodel= new sap.ui.model.json.JSONModel();
//****************************Called Query Templates and Transactions****************************************
var getTeamList = "Default/Viswajith/MKVI1/queries/Team_names";
var QTfetcmonthyear = "Default/Viswajith/MKVI1/queries/Fetch_YearMonth_details";
var createshifttarcker="Default/Viswajith/MKVI1/queries/createshiftrackerXacuteQuery";
var assignshifttrackerdetails="Default/Viswajith/MKVI1/queries/Assignnshifttrackertotable";
//*******************************************************************************************************************************
sap.ui.controller("Scripts.ShiftTracker",{
 onInit : function() {
       
//sap.m.MessageToast.show("Logic to generate shift tracker is Still in Progress");
this.AssignTeamlist2();
this.getYearDetails();
this.getMonthDetails();
    },
    refreshPage : function() {
        window.location.reload();
    },

//*********************************************************** Assigning team list during view leave details************************************
    AssignTeamlist2: function(oEvent) {
        thisRef = this;
        $.ajax({
            type: 'GET',
            url: '/XMII/Illuminator?QueryTemplate=' + getTeamList + '&Content-Type=text/json',
            success: function(data) {
                var plantItem2 = new sap.ui.core.ListItem({});
                plantItem2.bindProperty("key", "Team_Name");
                plantItem2.bindProperty("text", "Team_Name");
                //PlantItem2.bindProperty("ID","ID");
                sap.ui.getCore().byId("teamdropdown").bindItems("/Rowsets/Rowset/0/Row", plantItem2);
                TeamListMappingModel.setData(data);
                sap.ui.getCore().byId("teamdropdown").setModel(TeamListMappingModel);
                var oItem = new sap.ui.core.ListItem({
                    text: "--Select--",
                    key: "--Select--"
                });
                sap.ui.getCore().byId("teamdropdown").insertItem(oItem, 0);
                sap.ui.getCore().byId("teamdropdown").setSelectedKey("");
            }
        });
    },
    //**********************************************************************fetch Year Details******************************************************************
    getYearDetails: function(oEvent) {
        thisRef = this;
        var yearlist = {};
        yearlist['Param.1'] = "year";
        $.ajax({
            type: 'GET',
            data: yearlist,
            url: '/XMII/Illuminator?QueryTemplate=' + QTfetcmonthyear + '&Content-Type=text/json',
            success: function(data) {
                var yearitem = new sap.ui.core.ListItem({});
                yearitem.bindProperty("key", "year");
                yearitem.bindProperty("text", "year");
                //yearitem.bindProperty.bindProperty("ID","ID");
                sap.ui.getCore().byId("yeardropdown").bindItems("/Rowsets/Rowset/0/Row", yearitem);
                yearmodel.setData(data);
                sap.ui.getCore().byId("yeardropdown").setModel(yearmodel);
                var oItem = new sap.ui.core.ListItem({
                    text: "--Select--",
                    key: "--Select--"
                });
                sap.ui.getCore().byId("yeardropdown").insertItem(oItem, 0);
                sap.ui.getCore().byId("yeardropdown").setSelectedKey("");
            }
        });
    },
    //********************************************************************fetch month details******************************************************************
    getMonthDetails: function(oEvent) {
        thisRef = this;
        var monthlist = {};
        monthlist['Param.1'] = "month";
        $.ajax({
            type: 'GET',
            data: monthlist,
            url: '/XMII/Illuminator?QueryTemplate=' + QTfetcmonthyear + '&Content-Type=text/json',
            success: function(data) {
                var monthitem = new sap.ui.core.ListItem({});
                monthitem.bindProperty("key", "month");
                monthitem.bindProperty("text", "month");
                //monthitem.bindProperty.bindProperty("ID","ID");
                sap.ui.getCore().byId("monthdropdown").bindItems("/Rowsets/Rowset/0/Row", monthitem);
                monthmodel.setData(data);
                sap.ui.getCore().byId("monthdropdown").setModel(monthmodel);
                var oItem = new sap.ui.core.ListItem({
                    text: "--Select--",
                    key: "--Select--"
                });
                sap.ui.getCore().byId("monthdropdown").insertItem(oItem, 0);
                sap.ui.getCore().byId("monthdropdown").setSelectedKey("");
            }
        });
    },
//*************************************************************calling shift tracker generate transaction ******************************************
createshifttrackerdata: function(oEvent) {
        thisRef = this;
        var UserList = {};
        UserList['Param.1'] = sap.ui.getCore().byId("teamdropdown").getSelectedKey();
UserList['Param.2'] = sap.ui.getCore().byId("yeardropdown").getSelectedKey();
UserList['Param.3'] = sap.ui.getCore().byId("monthdropdown").getSelectedKey();
        $.ajax({
            type: 'GET',
            data: UserList,
            cache: false,
            async: false,
            url: '/XMII/Illuminator?QueryTemplate=' + createshifttarcker + '&Content-Type=text/json',
            success: function(data) {
                  //shifttrackermodel.setData(data);
            }
        });
    },
//**********************************************************************************fetching above created shift tarcker ***************************************
AssignShifttracker: function(oEvent) {
        thisRef = this;
        var UserList2 = {};
        UserList2['Param.1'] = sap.ui.getCore().byId("teamdropdown").getSelectedKey();
UserList2['Param.2'] = sap.ui.getCore().byId("yeardropdown").getSelectedKey();
UserList2['Param.3'] = sap.ui.getCore().byId("monthdropdown").getSelectedKey();
        $.ajax({
            type: 'GET',
            data: UserList2,
            cache: false,
            async: false,
            url: '/XMII/Illuminator?QueryTemplate=' + assignshifttrackerdetails + '&Content-Type=text/json',
            success: function(data) {
                  shifttrackermodel.setData(data);
            }
        });
    },
//******************************************************************download excel format of shift tracker details*********************************************
    onDataExport: function(oEvent) {
var month=sap.ui.getCore().byId("monthdropdown").getSelectedKey();
month=month.substring(0,3).toUpperCase();
year=sap.ui.getCore().byId("yeardropdown").getSelectedKey();


        jQuery.sap.require("sap.ui.core.util.Export");
        jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
        var oExport = new sap.ui.core.util.Export({
            // Type that will be used to generate the content. Own ExportType's can be created to support other formats
            exportType: new sap.ui.core.util.ExportTypeCSV({
                separatorChar: "\t",
                mimeType: "application/vnd.ms-excel",
                charset: "utf-16",
                fileExtension: "xls"
            }),

            // Pass in the model created above
            models: sap.ui.getCore().byId("shifttrackertable").getModel(),

            // binding information for the rows aggregation
            rows: {
                path: "/Rowsets/Rowset/0/Row"
            },

            // column definitions with column name and binding info for the content

            columns: [{
                name: "SPOC",
                template: {
                    content: "{SPOC}"
                }
            }, {
                name: "NAME",
                template: {
                    content: "{USER_NAME}"
                }
            }, {
                name: "EMAIL",
                template: {
                    content: "{Email}"
                }
            }, {
                name: "USERID",
                template: {
                    content: "{User_521ID}"
                }
            }, {
                name: "LOCATION",
                template: {
                    content: "{LOCATION}"
                }
            }, {
                name: "TEAM",
                template: {
                    content: "{Team_Name}"
                }
            }, {
                name: "NUMBER",
                template: {
                    content: "{PHONE_NUMBER}"
                }
            },

			{
                name: "ALT_NUMBER",
                template: {
                    content: "{ALTERNATE_NUMBER}"
                }
            }, 
		
			
			{
                name: month+"1",
                template: {
                    content: "{Date1}"
                }
            }, {
                name: month+"2",
                template: {
                    content: "{Date2}"
                }
            },{
                name:month+"3",
                template: {
                    content: "{Date3}"
                }
            }, {
                name:month+"4",
                template: {
                    content: "{Date4}"
                }
            }, {
                name: month+"5",
                template: {
                    content: "{Date5}"
                }
            }, {
                name: month+"6",
                template: {
                    content: "{Date6}"
                }
            },

			{
                name: month+"7",
                template: {
                    content: "{Date7}"
                }
            }, {
                name: month+"8",
                template: {
                    content: "{Date8}"
                }
            },
			 {
                name: month+"9",
                template: {
                    content: "{Date9}"
                }
            },
			 {
                name: month+"10",
                template: {
                    content: "{Date10}"
                }
            },
			{
                name: month+"11",
                template: {
                    content: "{Date11}"
                }
            },
			{
                name: month+"12",
                template: {
                    content: "{Date12}"
                }
            },
			{
                name: month+"13",
                template: {
                    content: "{Date13}"
                }
            },
			{
                name: month+"14",
                template: {
                    content: "{Date14}"
                }
            },
			{
                name: month+"15",
                template: {
                    content: "{Date15}"
                }
            },
			{
                name: month+"16",
                template: {
                    content: "{Date16}"
                }
            },
			{
                name: month+"17",
                template: {
                    content: "{Date17}"
                }
            },
			{
                name: month+"18",
                template: {
                    content: "{Date18}"
                }
            },
			{
                name: month+"19",
                template: {
                    content: "{Date19}"
                }
            },
			{
                name:month+ "20",
                template: {
                    content: "{Date20}"
                }
            },
			{
                name:month+ "21",
                template: {
                    content: "{Date21}"
                }
            },
			{
                name: month+"22",
                template: {
                    content: "{Date22}"
                }
            },
			{
                name: month+"23",
                template: {
                    content: "{Date23}"
                }
            },
			{
                name:month+ "24",
                template: {
                    content: "{Date24}"
                }
            },
			{
                name:month+ "25",
                template: {
                    content: "{Date25}"
                }
            },
			{
                name: month+"26",
                template: {
                    content: "{Date26}"
                }
            },
			{
                name:month+"27",
                template: {
                    content: "{Date27}"
                }
            },
			{
                name:month+"28",
                template: {
                    content: "{Date28}"
                }
            },
			{
                name:month+"29",
                template: {
                    content: "{Date29}"
                }
            },
			{
                name: month+"30",
                template: {
                    content: "{Date30}"
                }
            },
			{
                name: month+"31",
                template: {
                    content: "{Date31}"
                }
            }
		
			]
        });
        // download exported file
        oExport.saveFile("Shift Plan " +sap.ui.getCore().byId("monthdropdown").getSelectedKey().substring(0,3)+" "+year).catch(function(oError) {
            MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
        }).then(function() {
            oExport.destroy();
        });
    }

});

