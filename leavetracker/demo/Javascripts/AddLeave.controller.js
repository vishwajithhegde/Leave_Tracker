//***********************************************************************************************************************
var leaveModel = new sap.ui.model.json.JSONModel();
var TeamListMappingModel = new sap.ui.model.json.JSONModel();
var TeamListMappingModel2 = new sap.ui.model.json.JSONModel();
var yearmodel = new sap.ui.model.json.JSONModel();
var monthmodel = new sap.ui.model.json.JSONModel();
var Users = new sap.ui.model.json.JSONModel();
var userSuggestionModel = new sap.ui.model.json.JSONModel();
var editusermodel = new sap.ui.model.json.JSONModel();
var editusermodel2 = new sap.ui.model.json.JSONModel();
var userSuggestionModel2 = new sap.ui.model.json.JSONModel();
//****************************Called Query Templates and Transactions****************************************
var getTeamList = "Default/Viswajith/MKVI1/queries/Team_names";
var getUserDetails = "Default/Viswajith/MKVI1/queries/Team_members";
var QTSaveLeaveDetails = "Default/Viswajith/MKVI1/queries/Save_leaveDetailsXacuteQuery";
var QTfetcmonthyear = "Default/Viswajith/MKVI1/queries/Fetch_YearMonth_details";
var getLeavedetailsfortable = "Default/Viswajith/MKVI1/queries/Get_LeaveDetailsbasedonmonthyear";
var withdrawLeaveDetails = "Default/Viswajith/MKVI1/queries/Withdraw_leaves";
var QTaddeditdeleteuser = "Default/Viswajith/MKVI1/queries/AddEditDeleteUserDetailsMasterMDO_XacuteQuery";
var QTGetUserSuggestionQuery = "Default/Viswajith/MKVI1/queries/UserIdSuggestion";
var QTGetUserdetailsonedit = "Default/Viswajith/MKVI1/queries/userdetailsbasedonid";
var edituserdetailsmasterdata = "Default/Viswajith/MKVI1/queries/edituserdetailsXacuteQuery";
var deleteuserdetailsmasterdata = "Default/Viswajith/MKVI1/queries/deleteUserDetailsXacuteQuery";
//****************************************************************************************************************************
sap.ui.controller("Scripts.AddLeave", {
    onInit: function() {
        //this.AssignTeamlist();
        //this.refreshPage();
    },
    refreshPage: function() {
        window.location.reload();
    },
    //********************************************************************fetch Teams LIST during apply leave***************************************************************
    AssignTeamlist: function(oEvent) {
        thisRef = this;
        $.ajax({
            type: 'GET',
            url: '/XMII/Illuminator?QueryTemplate=' + getTeamList + '&Content-Type=text/json',
            success: function(data) {
                var plantItem = new sap.ui.core.ListItem({});
                plantItem.bindProperty("key", "Team_Name");
                plantItem.bindProperty("text", "Team_Name");
                //lantItem.bindProperty("ID","ID");
                sap.ui.getCore().byId("teamIdDropDown").bindItems("/Rowsets/Rowset/0/Row", plantItem);
                TeamListMappingModel.setData(data);
                sap.ui.getCore().byId("teamIdDropDown").setModel(TeamListMappingModel);
                var oItem = new sap.ui.core.ListItem({
                    text: "--Select--",
                    key: "--Select--"
                });
                sap.ui.getCore().byId("teamIdDropDown").insertItem(oItem, 0);
                sap.ui.getCore().byId("teamIdDropDown").setSelectedKey("");
            }
        });
    },
    //*****************************************************************************fetch team members list based on team selection****************************************
    getTeammemebersDetails: function(oEvent) {
        thisRef = this;
        var UserList = {};
        UserList['Param.1'] = sap.ui.getCore().byId("teamIdDropDown").getSelectedKey();
        $.ajax({
            type: 'GET',
            data: UserList,
            cache: false,
            async: false,
            url: '/XMII/Illuminator?QueryTemplate=' + getUserDetails + '&Content-Type=text/json',
            success: function(data) {
                var userItem = new sap.ui.core.ListItem({});
                userItem.bindProperty("key", "User_Name");
                userItem.bindProperty("text", "User_Name");
                //userItem.bindProperty("ID","ID");
                sap.ui.getCore().byId("TeamMemebersidDropDown").bindItems("/Rowsets/Rowset/0/Row", userItem);
                Users.setData(data);
                sap.ui.getCore().byId("TeamMemebersidDropDown").setModel(Users);
                var oItem = new sap.ui.core.ListItem({
                    text: "--Select--",
                    key: ""
                });
                sap.ui.getCore().byId("TeamMemebersidDropDown").insertItem(oItem, 0);
                sap.ui.getCore().byId("TeamMemebersidDropDown").setSelectedKey("");
            }
        });
    },
    //*****************************************************************************************Leave details Save Logic*****************************************************************
    saveLeaveDetails: function(oEvent) {
        var UiDetailsToTransaction = {};
        UiDetailsToTransaction['Param.1'] = sap.ui.getCore().byId("teamIdDropDown").getSelectedKey();
        UiDetailsToTransaction['Param.2'] = sap.ui.getCore().byId("TeamMemebersidDropDown").getSelectedKey();
        UiDetailsToTransaction['Param.3'] = sap.ui.getCore().byId("DatePicker").getValue();
        UiDetailsToTransaction['Param.4'] = sap.ui.getCore().byId("DatePicker2").getValue();
        UiDetailsToTransaction['Param.5'] = sap.ui.getCore().byId("DatePicker3").getValue();
        UiDetailsToTransaction['Param.6'] = sap.ui.getCore().byId("DatePicker4").getValue();
        UiDetailsToTransaction['Param.7'] = sap.ui.getCore().byId("DatePicker5").getValue();
        UiDetailsToTransaction['Param.8'] = sap.ui.getCore().byId("DatePicker6").getValue();
        UiDetailsToTransaction['Param.9'] = sap.ui.getCore().byId("DatePicker7").getValue();
        UiDetailsToTransaction['Param.10'] = sap.ui.getCore().byId("DatePicker8").getValue();
        UiDetailsToTransaction['Param.11'] = sap.ui.getCore().byId("DatePicker9").getValue();
        UiDetailsToTransaction['Param.12'] = sap.ui.getCore().byId("DatePicker10").getValue();
        if (sap.ui.getCore().byId("holidaycheckbox").getSelected()) {
            UiDetailsToTransaction['Param.14'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.14'] = "LEAVE";
        }
        if (sap.ui.getCore().byId("holidaycheckbox2").getSelected()) {
            UiDetailsToTransaction['Param.15'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.15'] = "LEAVE";
        }
        if (sap.ui.getCore().byId("holidaycheckbox3").getSelected()) {
            UiDetailsToTransaction['Param.16'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.16'] = "LEAVE";
        }
        if (sap.ui.getCore().byId("holidaycheckbox4").getSelected()) {
            UiDetailsToTransaction['Param.17'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.17'] = "LEAVE";
        }
        if (sap.ui.getCore().byId("holidaycheckbox5").getSelected()) {
            UiDetailsToTransaction['Param.18'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.18'] = "LEAVE";
        }
        if (sap.ui.getCore().byId("holidaycheckbox6").getSelected()) {
            UiDetailsToTransaction['Param.19'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.19'] = "LEAVE";
        }
        if (sap.ui.getCore().byId("holidaycheckbox7").getSelected()) {
            UiDetailsToTransaction['Param.20'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.20'] = "LEAVE";
        }
        if (sap.ui.getCore().byId("holidaycheckbox8").getSelected()) {
            UiDetailsToTransaction['Param.21'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.21'] = "LEAVE";
        }
        if (sap.ui.getCore().byId("holidaycheckbox9").getSelected()) {
            UiDetailsToTransaction['Param.22'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.22'] = "LEAVE";
        }
        if (sap.ui.getCore().byId("holidaycheckbox10").getSelected()) {
            UiDetailsToTransaction['Param.23'] = "HOLIDAY";
        } else {
            UiDetailsToTransaction['Param.23'] = "LEAVE";
        }
        var totaldayscount = 0;
        if (!(sap.ui.getCore().byId("DatePicker").getValue() == "")) {
            totaldayscount += 1;
        }
        if (!sap.ui.getCore().byId("DatePicker2").getValue() == "") {
            totaldayscount += 1;
        }
        if (!sap.ui.getCore().byId("DatePicker3").getValue() == "") {
            totaldayscount += 1;
        }
        if (!sap.ui.getCore().byId("DatePicker4").getValue() == "") {
            totaldayscount += 1;
        }
        if (!sap.ui.getCore().byId("DatePicker5").getValue() == "") {
            totaldayscount += 1;
        }
        if (!sap.ui.getCore().byId("DatePicker6").getValue() == "") {
            totaldayscount += 1;
        }
        if (!sap.ui.getCore().byId("DatePicker7").getValue() == "") {
            totaldayscount += 1;
        }
        if (!sap.ui.getCore().byId("DatePicker8").getValue() == "") {
            totaldayscount += 1;
        }
        if (!sap.ui.getCore().byId("DatePicker9").getValue() == "") {
            totaldayscount += 1;
        }
        if (!sap.ui.getCore().byId("DatePicker10").getValue() == "") {
            totaldayscount += 1;
        }
        UiDetailsToTransaction['Param.13'] = totaldayscount;
        $.ajax({
            type: 'GET',
            data: UiDetailsToTransaction,
            async: false,
            cache: false,
            url: '/XMII/Illuminator?QueryTemplate=' + QTSaveLeaveDetails + '&Content-Type=text/json',
            success: function(data) {
                if ((data.Rowsets.Rowset[0].Row[0].status) == "error") {
                    sap.m.MessageToast.show(data.Rowsets.Rowset[0].Row[0].saveStatus);
                    sap.ui.getCore().byId("confirmDialog").close();
                }
                if ((data.Rowsets.Rowset[0].Row[0].status) == "success") {
                    sap.m.MessageToast.show(data.Rowsets.Rowset[0].Row[0].saveStatus);
                    sap.ui.getCore().byId("confirmDialog").close();
                    sap.ui.getCore().byId("LeaveDialog").close();
                    sap.ui.getCore().byId("DatePicker").setValue("");
                }
                //sap.m.MessageToast.show(data.Rowsets.Rowset[0].Row[0].status); 
            }
        });
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
                sap.ui.getCore().byId("teamIdDropDown2").bindItems("/Rowsets/Rowset/0/Row", plantItem2);
                TeamListMappingModel2.setData(data);
                sap.ui.getCore().byId("teamIdDropDown2").setModel(TeamListMappingModel2);
                var oItem = new sap.ui.core.ListItem({
                    text: "--Select--",
                    key: "--Select--"
                });
                sap.ui.getCore().byId("teamIdDropDown2").insertItem(oItem, 0);
                sap.ui.getCore().byId("teamIdDropDown2").setSelectedKey("");
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
    //*********************************************************************view leave details logic*********************************************************
    getLeaveDeatails: function(oEvent) {
        var paramDetails = {};
        paramDetails['Param.1'] = sap.ui.getCore().byId("teamIdDropDown2").getSelectedKey();
        paramDetails['Param.2'] = sap.ui.getCore().byId("yeardropdown").getSelectedKey();
        paramDetails['Param.3'] = sap.ui.getCore().byId("monthdropdown").getSelectedKey();
        $.ajax({
            type: 'GET',
            data: paramDetails,
            cache: false,
            async: false,
            url: '/XMII/Illuminator?QueryTemplate=' + getLeavedetailsfortable + '&Content-Type=text/json',
            success: function(data) {
                leaveModel.setData(data);
            }
        });
    },
    //************************************************************************* withdraw leaves logic****************************************************************
    //setwithdrawdialoftitledynamically
    setWithdrawDialogContentText: function() {
        var rowselected = sap.ui.getCore().byId("leaveTable").getSelectedItem();
        var rowindex = sap.ui.getCore().byId("leaveTable").indexOfItem(rowselected);
        var withdrawdates = sap.ui.getCore().getElementById("leaveTable").getModel().getData().Rowsets.Rowset[0].Row[rowindex].date;
        var withdrawmonth = sap.ui.getCore().getElementById("leaveTable").getModel().getData().Rowsets.Rowset[0].Row[rowindex].month;
        var withdrawyear = sap.ui.getCore().getElementById("leaveTable").getModel().getData().Rowsets.Rowset[0].Row[rowindex].year;
        var withdrawuser = sap.ui.getCore().getElementById("leaveTable").getModel().getData().Rowsets.Rowset[0].Row[rowindex].USER_521ID;
        var settextvar = "Are You Sure You Want To Withdraw Leave Details for User " + withdrawuser + " on  " + withdrawdates + withdrawmonth + withdrawyear;
        sap.ui.getCore().byId("withdrawdialogtext").setText(settextvar);
    },
    withdrawleave: function(oEvent) {
        thisRef = this;
        var rowselected = sap.ui.getCore().byId("leaveTable").getSelectedItem();
        var rowindex = sap.ui.getCore().byId("leaveTable").indexOfItem(rowselected);
        var withdrawdates = sap.ui.getCore().getElementById("leaveTable").getModel().getData().Rowsets.Rowset[0].Row[rowindex].date;
        var withdrawmonth = sap.ui.getCore().getElementById("leaveTable").getModel().getData().Rowsets.Rowset[0].Row[rowindex].month;
        var withdrawyear = sap.ui.getCore().getElementById("leaveTable").getModel().getData().Rowsets.Rowset[0].Row[rowindex].year;
        var withdrawuser = sap.ui.getCore().getElementById("leaveTable").getModel().getData().Rowsets.Rowset[0].Row[rowindex].USER_521ID;
        var Withdrawdetails = {};
        Withdrawdetails['Param.1'] = withdrawuser;
        Withdrawdetails['Param.2'] = withdrawdates;
        Withdrawdetails['Param.3'] = withdrawmonth;
        Withdrawdetails['Param.4'] = withdrawyear;
        $.ajax({
            type: 'GET',
            data: Withdrawdetails,
            cache: false,
            async: false,
            url: '/XMII/Illuminator?QueryTemplate=' + withdrawLeaveDetails + '&Content-Type=text/json',
            success: function(data) {
                sap.m.MessageToast.show("Leave Details withdrawn successfully for user" + withdrawuser + " on " + withdrawdates + withdrawmonth + withdrawyear);
                sap.ui.getCore().byId("withdrawconfirmdialog").close();
                thisRef.getLeaveDeatails()
                sap.ui.getCore().byId("leaveTable").setSelectedItem(rowselected, false);
            }
        });
    },
    //********************************************************************************team list for add user *********************************************************
    addteamlisttoadduserdropdown: function(oEvent) {
        thisRef = this;
        $.ajax({
            type: 'GET',
            url: '/XMII/Illuminator?QueryTemplate=' + getTeamList + '&Content-Type=text/json',
            success: function(data) {
                var plantItem = new sap.ui.core.ListItem({});
                plantItem.bindProperty("key", "Team_Name");
                plantItem.bindProperty("text", "Team_Name");
                //lantItem.bindProperty("ID","ID");
                sap.ui.getCore().byId("adduserteamdropdown").bindItems("/Rowsets/Rowset/0/Row", plantItem);
                TeamListMappingModel.setData(data);
                sap.ui.getCore().byId("adduserteamdropdown").setModel(TeamListMappingModel);
                var oItem = new sap.ui.core.ListItem({
                    text: "--Select--",
                    key: "--Select--"
                });
                sap.ui.getCore().byId("adduserteamdropdown").insertItem(oItem, 0);
                sap.ui.getCore().byId("adduserteamdropdown").setSelectedKey("");
            }
        });
    },
    //***************************************************************************saving add user details**************************************************************
    adduser: function(oEvent) {
        thisRef = this;
        var adduserlist = {};
        adduserlist['Param.1'] = "add";
        adduserlist['Param.2'] = sap.ui.getCore().byId("adduserteamdropdown").getSelectedKey();
        adduserlist['Param.3'] = sap.ui.getCore().byId("adduseruserid").getValue().toUpperCase();
        adduserlist['Param.4'] = sap.ui.getCore().byId("adduserusername").getValue();
        $.ajax({
            type: 'GET',
            data: adduserlist,
            url: '/XMII/Illuminator?QueryTemplate=' + QTaddeditdeleteuser + '&Content-Type=text/json',
            success: function(data) {
                if ((data.Rowsets.Rowset[0].Row[0].status) == "error") {
                    sap.m.MessageToast.show(data.Rowsets.Rowset[0].Row[0].output);
                    sap.ui.getCore().byId("commonconfirmdialog").close();
                }
                if ((data.Rowsets.Rowset[0].Row[0].status) == "success") {
                    sap.m.MessageToast.show(data.Rowsets.Rowset[0].Row[0].output);
                    sap.ui.getCore().byId("commonconfirmdialog").close();
                    sap.ui.getCore().byId("adduserteamdropdown").setSelectedKey("");
                }
            }
        });
    },
    //************************************************************************search field***********************************************
    onSearch: function(event) {
        var item = event.getParameter("suggestionItem");
        if (item) {
            this.getAllUserDetailsonedit();
        }
    },
    onSuggest: function(event) {
        $.ajax({
            type: 'GET',
            url: '/XMII/Illuminator?QueryTemplate=' + QTGetUserSuggestionQuery + '&Content-Type=text/json',
            success: function(data) {
                userSuggestionModel.setData(data);
            }
        });
        var value = event.getParameter("suggestValue");
        var filters = [];
        if (value) {
            filters = [
                new sap.ui.model.Filter([
                    new sap.ui.model.Filter("User_521ID", function(sText) {
                        return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
                    })
                ], false)
            ];
        }
        sap.ui.getCore().byId("userSearchField").getBinding("suggestionItems").filter(filters);
        sap.ui.getCore().byId("userSearchField").suggest();
    },
    //******************************************************************getting user details based on search in edit user*************************************************
    getAllUserDetailsonedit: function(oEvent) {
        var filterDetails = {};
        filterDetails['Param.1'] = (sap.ui.getCore().byId("userSearchField").getValue().toUpperCase()).trim();
        $.ajax({
            type: 'GET',
            data: filterDetails,
            cache: false,
            async: false,
            url: '/XMII/Illuminator?QueryTemplate=' + QTGetUserdetailsonedit + '&Content-Type=text/json',
            success: function(data) {
                if (data.Rowsets.Rowset[0].Row != undefined) {
                    var userSize = data.Rowsets.Rowset[0].Row.length;
                    editusermodel.setSizeLimit(userSize);
                }
                editusermodel.setData(data);
                sap.ui.getCore().byId("editusertable").setVisible(true);
                /*if(data.Rowsets.Rowset[0].Row == undefined) {
sap.m.MessageToast.show("Please Fill All Mandatory Fields");
}*/
            }
        });
    },
    //*********Assugning team list during edit user********************************************************
    AssignTeamlistonedituser: function(oEvent) {
        thisRef = this;
        $.ajax({
            type: 'GET',
            url: '/XMII/Illuminator?QueryTemplate=' + getTeamList + '&Content-Type=text/json',
            success: function(data) {
                var plantItem = new sap.ui.core.ListItem({});
                plantItem.bindProperty("key", "Team_Name");
                plantItem.bindProperty("text", "Team_Name");
                //lantItem.bindProperty("ID","ID");
                sap.ui.getCore().byId("edituserteamdropdown").bindItems("/Rowsets/Rowset/0/Row", plantItem);
                TeamListMappingModel.setData(data);
                sap.ui.getCore().byId("edituserteamdropdown").setModel(TeamListMappingModel);
                /*var oItem = new sap.ui.core.ListItem({
                        text: "--Select--",
                        key: "--Select--"
                });*/
                //sap.ui.getCore().byId("edituserteamdropdown").insertItem(oItem, 0);
                // sap.ui.getCore().byId("edituserteamdropdown").setSelectedKey("");
            }
        });
        var tableSelectedItem = sap.ui.getCore().byId("editusertable").getSelectedItem();
        var tableRowSelIndex = sap.ui.getCore().byId("editusertable").indexOfItem(tableSelectedItem);
        var userid = sap.ui.getCore().getElementById("editusertable").getModel().getData().Rowsets.Rowset[0].Row[tableRowSelIndex].User_521ID;
        //console.log(userid);
        var Team = sap.ui.getCore().getElementById("editusertable").getModel().getData().Rowsets.Rowset[0].Row[tableRowSelIndex].Team_Name;
        var username = sap.ui.getCore().getElementById("editusertable").getModel().getData().Rowsets.Rowset[0].Row[tableRowSelIndex].User_Name;
        sap.ui.getCore().byId("edituseruseridinput").setValue(userid);
        sap.ui.getCore().byId("edituserteamdropdown").setSelectedKey(Team);
        sap.ui.getCore().byId("edituserusernameinputbox").setValue(username);
    },
    //********************************EDIT USER DETAILS********************************************************
    editusercontroller: function(oEvent) {
        //sap.m.MessageBox.show("Logic to save edit user details still in progress");
        var edituserdetails = {};
        tableSelectedItem = sap.ui.getCore().byId("editusertable").getSelectedItem();
        var tableRowSelIndex = sap.ui.getCore().byId("editusertable").indexOfItem(tableSelectedItem);
        edituserdetails['Param.1'] = sap.ui.getCore().getElementById("editusertable").getModel().getData().Rowsets.Rowset[0].Row[tableRowSelIndex].User_521ID;
        var userid = sap.ui.getCore().getElementById("editusertable").getModel().getData().Rowsets.Rowset[0].Row[tableRowSelIndex].User_521ID;
        edituserdetails['Param.2'] = sap.ui.getCore().byId("edituserteamdropdown").getSelectedKey();
        edituserdetails['Param.3'] = sap.ui.getCore().byId("edituserusernameinputbox").getValue();
        $.ajax({
            type: 'GET',
            data: edituserdetails,
            cache: false,
            async: false,
            url: '/XMII/Illuminator?QueryTemplate=' + edituserdetailsmasterdata + '&Content-Type=text/json',
            success: function(data) {
                if ((data.Rowsets.Rowset[0].Row[0].status) == "error") {
                    sap.m.MessageToast.show(data.Rowsets.Rowset[0].Row[0].output);
                    sap.ui.getCore().byId("edituserconfirmdialog").close();
                }
                if ((data.Rowsets.Rowset[0].Row[0].status) == "success") {
                    sap.m.MessageToast.show(data.Rowsets.Rowset[0].Row[0].output);
                    sap.ui.getCore().byId("edituserconfirmdialog").close();
                    sap.ui.getCore().byId("edituserdialog").close();
                    sap.ui.getCore().byId("editusertable").setVisible(false);
                    //this.onSearch();
                    sap.ui.getCore().byId("editusertable").setSelectedItem(tableRowSelIndex, false);
                }
            }
        });
    },
    //*******************************************SEARCH LOGIC FOR DELETE ***********************************************************************
    onSearch2: function(event) {
        var item = event.getParameter("suggestionItem");
        if (item) {
            this.getAllUserDetailsonedit2();
        }
    },
    onSuggest2: function(event) {
        $.ajax({
            type: 'GET',
            url: '/XMII/Illuminator?QueryTemplate=' + QTGetUserSuggestionQuery + '&Content-Type=text/json',
            success: function(data) {
                userSuggestionModel2.setData(data);
            }
        });
        var value = event.getParameter("suggestValue");
        var filters = [];
        if (value) {
            filters = [
                new sap.ui.model.Filter([
                    new sap.ui.model.Filter("User_521ID", function(sText) {
                        return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
                    })
                ], false)
            ];
        }
        sap.ui.getCore().byId("userSearchField2").getBinding("suggestionItems").filter(filters);
        sap.ui.getCore().byId("userSearchField2").suggest();
    },
    //******************************************************************getting user details based on search in delete user*************************************************
    getAllUserDetailsonedit2: function(oEvent) {
        var filterDetails2 = {};
        filterDetails2['Param.1'] = (sap.ui.getCore().byId("userSearchField2").getValue().toUpperCase()).trim();
        $.ajax({
            type: 'GET',
            data: filterDetails2,
            cache: false,
            async: false,
            url: '/XMII/Illuminator?QueryTemplate=' + QTGetUserdetailsonedit + '&Content-Type=text/json',
            success: function(data) {
                if (data.Rowsets.Rowset[0].Row != undefined) {
                    var userSize = data.Rowsets.Rowset[0].Row.length;
                    editusermodel2.setSizeLimit(userSize);
                }
                editusermodel2.setData(data);
                sap.ui.getCore().byId("editusertable2").setVisible(true);
                if (data.Rowsets.Rowset[0].Row == undefined) {
                    sap.m.MessageToast.show("Please Fill All Mandatory Fields");
                }
            }
        });
    },
    //**************************************************************DELETE USERS RECORD*************************************************
    deleteuserdetails: function(oEvent) {
        var deleteuserdetails = {};
        tableSelectedItem = sap.ui.getCore().byId("editusertable2").getSelectedItem();
        var tableRowSelIndex = sap.ui.getCore().byId("editusertable2").indexOfItem(tableSelectedItem);
        deleteuserdetails['Param.1'] = sap.ui.getCore().getElementById("editusertable2").getModel().getData().Rowsets.Rowset[0].Row[tableRowSelIndex].User_521ID;
        var userid = sap.ui.getCore().getElementById("editusertable2").getModel().getData().Rowsets.Rowset[0].Row[tableRowSelIndex].User_521ID;
        deleteuserdetails['Param.2'] = sap.ui.getCore().getElementById("editusertable2").getModel().getData().Rowsets.Rowset[0].Row[tableRowSelIndex].Team_Name;
        deleteuserdetails['Param.3'] = sap.ui.getCore().getElementById("editusertable2").getModel().getData().Rowsets.Rowset[0].Row[tableRowSelIndex].User_Name;
        $.ajax({
            type: 'GET',
            data: deleteuserdetails,
            cache: false,
            async: false,
            url: '/XMII/Illuminator?QueryTemplate=' + deleteuserdetailsmasterdata + '&Content-Type=text/json',
            success: function(data) {
                if ((data.Rowsets.Rowset[0].Row[0].status) == "error") {
                    sap.m.MessageToast.show(data.Rowsets.Rowset[0].Row[0].output);
                    sap.ui.getCore().byId("deleteuserconfirmdialog").close();
                }
                if ((data.Rowsets.Rowset[0].Row[0].status) == "success") {
                    sap.m.MessageToast.show(data.Rowsets.Rowset[0].Row[0].output);
                    sap.ui.getCore().byId("deleteuserconfirmdialog").close();
                    sap.ui.getCore().byId("deleteuserdialog").close();
                    sap.ui.getCore().byId("editusertable2").setVisible(false);
                    //this.onSearch();
                    sap.ui.getCore().byId("editusertable2").setSelectedItem(tableRowSelIndex, false);
                }
            }
        });
    }
});