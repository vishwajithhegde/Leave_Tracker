sap.ui.jsview("Scripts.AddLeave", {
  getControllerName: function() {
    return "Scripts.AddLeave";
  },
  createContent: function(oController) {
    var Leave = new sap.m.App("Leave", {
      backgroundColor: "Blue"
    });
    //***********************************Buttons for adding leaves and viewing leaves*********************************************
    var insertButton = new sap.m.Button("insertButton", {
      text: "Apply Leaves",
      icon: "sap-icon://bed",
      press: function() {
        //AddButtonTriggered = "true";
        //EditButtonTriggered = "false"; 
        LeaveDialog.open();
        //sap.m.MessageToast.show("displaying data in dropdown is Still in Development Stage");
        //sap.ui.getCore().byId("UserDialog").setTitle("AddLeaveDetails");
        sap.ui.getCore().byId("date2").setVisible(false);
        sap.ui.getCore().byId("date3").setVisible(false);
        sap.ui.getCore().byId("date4").setVisible(false);
        sap.ui.getCore().byId("date5").setVisible(false);
        sap.ui.getCore().byId("date6").setVisible(false);
        sap.ui.getCore().byId("date7").setVisible(false);
        sap.ui.getCore().byId("date8").setVisible(false);
        sap.ui.getCore().byId("date9").setVisible(false);
        sap.ui.getCore().byId("date10").setVisible(false);
        sap.ui.getCore().byId("username").setVisible(false);
        sap.ui.getCore().byId("date1").setVisible(false);
        // sap.ui.getCore().byId("UserIDInput").setEnabled(true);
        //sap.ui.getCore().byId("UserIDInput").setValue("");
        oController.AssignTeamlist();
      }
    });
    var ViewButton = new sap.m.Button("ViewButton", {
      text: "View Applied Leaves",
      icon: "sap-icon://check-availability",
      press: function(oEvent) {
        viewLeave.open();
        sap.ui.getCore().byId("yearhbox").setVisible(false);
        sap.ui.getCore().byId("monthhbox").setVisible(false);
        sap.ui.getCore().byId("leavedetailsbutton").setVisible(false);
        oController.AssignTeamlist2();
        //sap.m.MessageToast.show("Logic to view Applied Leaves is Still in Progress");
      }
    });
    var addUser = new sap.m.Button("addUser", {
      text: "Add User",
      icon: "sap-icon://add-employee",
      press: function() {
        addUserDialog.open();
        oController.addteamlisttoadduserdropdown();
        sap.ui.getCore().byId("adduseruseridhbox").setVisible(false);
        sap.ui.getCore().byId("adduseruseridhbox2").setVisible(false);
        sap.ui.getCore().byId("adduserusernamehbox").setVisible(false);
        //sap.ui.getCore().byId("adduserbutton").setVisible(false);
      }
    });
    var editButton = new sap.m.Button("editButton", {
      text: "Edit User",
      icon: "sap-icon://edit",
      press: function() {
        editdeletedialog.open();
        sap.ui.getCore().byId("editusertable").setVisible(false);
        //sap.m.MessageToast.show("Logic to Edit Users MasterData is Still in Progress");
      }
    });
    var deleteButton = new sap.m.Button("deleteButton", {
      text: "Delete User",
      icon: "sap-icon://delete",
      press: function() {
        deleteuserdialog.open();
        sap.ui.getCore().byId("editusertable2").setVisible(false);
        sap.ui.getCore().byId("editusertable").setVisible(false); //AddButtonTriggered = "true";
        //EditButtonTriggered = "false"; 
        //LeaveDialog.open();
        //sap.m.MessageToast.show("Logic to Delete Users MasterData is Still in Progress");
      }
    });
var Shifttrackerbutton = new sap.m.Button("Shifttrackerbutton", {
      text: "Shift Tracker",
      icon: "sap-icon://present",
      press: function() {
        window.location.href = "/XMII/CM/Default/viswajith/demo/ShiftTracker.irpt";
        //sap.m.MessageToast.show("Logic to generate shift tracker is Still in Progress");
      }
    });
    var buttoncontent = new sap.m.HBox("buttoncontent", {
      justifyContent: "Center",
      alignItems: "Center",
      items: [insertButton, ViewButton, addUser, editButton, deleteButton,Shifttrackerbutton]
    });
    //***********************************creating the content for dialog box*********************************************
    var TeamLabel = new sap.m.Label({
      text: "Team",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var TeamDropDown = new sap.m.Select("teamIdDropDown", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {
        sap.ui.getCore().byId("username").setVisible(true);
        oController.getTeammemebersDetails();
      }
    });
    var TeamMembersLabel = new sap.m.Label({
      text: "User",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var TeamMemebersDropdDown = new sap.m.Select("TeamMemebersidDropDown", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {
        //oController.getGroupListByPlantDept();
        //oController.getShiftIDListByPlantDeptGroup();
        sap.ui.getCore().byId("date1").setVisible(true);
      }
    });
    //***************************************************** 10 Leave DAtes adding*******************************************************
    var DatepickerL = new sap.m.Label("date1picker", {
      text: "Choose Date",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var DatePicker = new sap.m.DatePicker("DatePicker", {
      width: "16rem",
      minDate: new Date(2022, 10, 1),
      //maxDate: new Date(2024, 12, 31)
    });
    var holidaycheckbox = new sap.m.CheckBox("holidaycheckbox", {
      text: "Holiday CheckBox ",
      //useEntireWidth:false,
      //width:"25.5rem"
      width: "16rem"
      //class:"sapUiSmallMarginEnd"
    });
    var NewDate = new sap.m.Button("NewDate", {
      //text: "Add Another Date",
      icon: "sap-icon://add",
      press: function() {
        if (sap.ui.getCore().byId("DatePicker").getValue() == "") {
          sap.m.MessageToast.show("please Enter all Mandatory Fields");
        } else {
          sap.ui.getCore().byId("date2").setVisible(true);
          sap.ui.getCore().byId("NewDate").setVisible(false);
          //sap.ui.getCore().byId("removedate1").setVisible(false);
        }
      }
    });
    var DatepickerL2 = new sap.m.Label("date2picker", {
      text: "Choose Date 2",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var DatePicker2 = new sap.m.DatePicker("DatePicker2", {
      width: "16rem",
      minDate: new Date(2022, 10, 1)
    });
    var holidaycheckbox2 = new sap.m.CheckBox("holidaycheckbox2", {
      text: "Holiday CheckBox ",
      width: "16rem"
    });
    var NewDate2 = new sap.m.Button("NewDate2", {
      //text: "Add Another Date",
      icon: "sap-icon://add",
      press: function() {
        if (sap.ui.getCore().byId("DatePicker2").getValue() == "") {
          sap.m.MessageToast.show("please Enter all Mandatory Fields");
        } else {
          sap.ui.getCore().byId("date3").setVisible(true);
          sap.ui.getCore().byId("NewDate2").setVisible(false);
        }
      }
    });
    var removedate2 = new sap.m.Button("removedate2", {
      //text: "Remove Date",
      icon: "sap-icon://delete",
      press: function() {
        sap.ui.getCore().byId("date2").setVisible(false);
        sap.ui.getCore().byId("DatePicker2").setValue("");
        sap.ui.getCore().byId("NewDate").setVisible(true);
      }
    });
    var DatepickerL3 = new sap.m.Label("date3picker", {
      text: "Choose Date 3",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    var holidaycheckbox3 = new sap.m.CheckBox("holidaycheckbox3", {
      text: "Holiday CheckBox ",
      width: "16rem"
    });
    //.addStyleClass("Label");
    var DatePicker3 = new sap.m.DatePicker("DatePicker3", {
      width: "16rem",
      minDate: new Date(2022, 10, 1)
    });
    var NewDate3 = new sap.m.Button("NewDate3", {
      //text: "Add Another Date",
      icon: "sap-icon://add",
      press: function() {
        if (sap.ui.getCore().byId("DatePicker3").getValue() == "") {
          sap.m.MessageToast.show("please Enter all Mandatory Fields");
        } else {
          sap.ui.getCore().byId("date4").setVisible(true);
          sap.ui.getCore().byId("NewDate3").setVisible(false);
        }
      }
    });
    var removedate3 = new sap.m.Button("removedate3", {
      //text: "Remove Date",
      icon: "sap-icon://delete",
      press: function() {
        sap.ui.getCore().byId("date3").setVisible(false);
        sap.ui.getCore().byId("DatePicker3").setValue("");
        sap.ui.getCore().byId("NewDate2").setVisible(true);
      }
    });
    var DatepickerL4 = new sap.m.Label({
      text: "Choose Date 4",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    var holidaycheckbox4 = new sap.m.CheckBox("holidaycheckbox4", {
      text: "Holiday CheckBox ",
      width: "16rem"
    });
    //.addStyleClass("Label");
    var DatePicker4 = new sap.m.DatePicker("DatePicker4", {
      width: "16rem",
      minDate: new Date(2022, 10, 1)
    });
    var NewDate4 = new sap.m.Button("NewDate4", {
      //text: "Add Another Date",
      icon: "sap-icon://add",
      press: function() {
        if (sap.ui.getCore().byId("DatePicker4").getValue() == "") {
          sap.m.MessageToast.show("please Enter all Mandatory Fields");
        } else {
          sap.ui.getCore().byId("date5").setVisible(true);
          sap.ui.getCore().byId("NewDate4").setVisible(false);
        }
      }
    });
    var removedate4 = new sap.m.Button("removedate4", {
      //text: "Remove Date",
      icon: "sap-icon://delete",
      press: function() {
        sap.ui.getCore().byId("date4").setVisible(false);
        sap.ui.getCore().byId("DatePicker4").setValue("");
        sap.ui.getCore().byId("NewDate3").setVisible(true);
      }
    });
    var DatepickerL5 = new sap.m.Label({
      text: "Choose Date 5",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    var holidaycheckbox5 = new sap.m.CheckBox("holidaycheckbox5", {
      text: "Holiday CheckBox ",
      width: "16rem"
    });
    //.addStyleClass("Label");
    var DatePicker5 = new sap.m.DatePicker("DatePicker5", {
      width: "16rem",
      minDate: new Date(2022, 10, 1)
    });
    var NewDate5 = new sap.m.Button("NewDate5", {
      //text: "Add Another Date",
      icon: "sap-icon://add",
      press: function() {
        if (sap.ui.getCore().byId("DatePicker5").getValue() == "") {
          sap.m.MessageToast.show("please Enter all Mandatory Fields");
        } else {
          sap.ui.getCore().byId("date6").setVisible(true);
          sap.ui.getCore().byId("NewDate5").setVisible(false);
        }
      }
    });
    var removedate5 = new sap.m.Button("removedate5", {
      // text: "Remove Date",
      icon: "sap-icon://delete",
      press: function() {
        sap.ui.getCore().byId("date5").setVisible(false);
        sap.ui.getCore().byId("DatePicker5").setValue("");
        sap.ui.getCore().byId("NewDate4").setVisible(true);
      }
    });
    var DatepickerL6 = new sap.m.Label({
      text: "Choose Date 6",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var DatePicker6 = new sap.m.DatePicker("DatePicker6", {
      width: "16rem",
      minDate: new Date(2022, 10, 1)
    });
    var holidaycheckbox6 = new sap.m.CheckBox("holidaycheckbox6", {
      text: "Holiday CheckBox ",
      width: "16rem"
    });
    var NewDate6 = new sap.m.Button("NewDate6", {
      // text: "Add Another Date",
      icon: "sap-icon://add",
      press: function() {
        if (sap.ui.getCore().byId("DatePicker6").getValue() == "") {
          sap.m.MessageToast.show("please Enter all Mandatory Fields");
        } else {
          sap.ui.getCore().byId("date7").setVisible(true);
          sap.ui.getCore().byId("NewDate6").setVisible(false);
        }
      }
    });
    var removedate6 = new sap.m.Button("removedate6", {
      //text: "Remove Date",
      icon: "sap-icon://delete",
      press: function() {
        sap.ui.getCore().byId("date6").setVisible(false);
        sap.ui.getCore().byId("DatePicker6").setValue("");
        sap.ui.getCore().byId("NewDate5").setVisible(true);
      }
    });
    var DatepickerL7 = new sap.m.Label({
      text: "Choose Date 7",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var DatePicker7 = new sap.m.DatePicker("DatePicker7", {
      width: "16rem",
      minDate: new Date(2022, 10, 1)
    });
    var holidaycheckbox7 = new sap.m.CheckBox("holidaycheckbox7", {
      text: "Holiday CheckBox ",
      width: "16rem"
    });
    var NewDate7 = new sap.m.Button("NewDate7", {
      //text: "Add Another Date",
      icon: "sap-icon://add",
      press: function() {
        if (sap.ui.getCore().byId("DatePicker7").getValue() == "") {
          sap.m.MessageToast.show("please Enter all Mandatory Fields");
        } else {
          sap.ui.getCore().byId("date8").setVisible(true);
          sap.ui.getCore().byId("NewDate7").setVisible(false);
        }
      }
    });
    var removedate7 = new sap.m.Button("removedate7", {
      //text: "Remove Date",
      icon: "sap-icon://delete",
      press: function() {
        sap.ui.getCore().byId("date7").setVisible(false);
        sap.ui.getCore().byId("DatePicker7").setValue("");
        sap.ui.getCore().byId("NewDate6").setVisible(true);
      }
    });
    var DatepickerL8 = new sap.m.Label({
      text: "Choose Date 8",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var DatePicker8 = new sap.m.DatePicker("DatePicker8", {
      width: "16rem",
      minDate: new Date(2022, 10, 1)
    });
    var holidaycheckbox8 = new sap.m.CheckBox("holidaycheckbox8", {
      text: "Holiday CheckBox ",
      width: "16rem"
    });
    var NewDate8 = new sap.m.Button("NewDate8", {
      //text: "Add Another Date",
      icon: "sap-icon://add",
      press: function() {
        if (sap.ui.getCore().byId("DatePicker8").getValue() == "") {
          sap.m.MessageToast.show("please Enter all Mandatory Fields");
        } else {
          sap.ui.getCore().byId("date9").setVisible(true);
          sap.ui.getCore().byId("NewDate8").setVisible(false);
        }
      }
    });
    var removedate8 = new sap.m.Button("removedate8", {
      //text: "Remove Date",
      icon: "sap-icon://delete",
      press: function() {
        sap.ui.getCore().byId("date8").setVisible(false);
        sap.ui.getCore().byId("DatePicker8").setValue("");
        sap.ui.getCore().byId("NewDate7").setVisible(true);
      }
    });
    var DatepickerL9 = new sap.m.Label({
      text: "Choose Date 9",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var DatePicker9 = new sap.m.DatePicker("DatePicker9", {
      width: "16rem",
      minDate: new Date(2022, 10, 1)
    });
    var holidaycheckbox9 = new sap.m.CheckBox("holidaycheckbox9", {
      text: "Holiday CheckBox ",
      width: "16rem"
    });
    var NewDate9 = new sap.m.Button("NewDate9", {
      //text: "Add Another Date",
      icon: "sap-icon://add",
      press: function() {
        if (sap.ui.getCore().byId("DatePicker9").getValue() == "") {
          sap.m.MessageToast.show("please Enter all Mandatory Fields");
        } else {
          sap.ui.getCore().byId("date10").setVisible(true);
          sap.ui.getCore().byId("NewDate9").setVisible(false);
        }
      }
    });
    var removedate9 = new sap.m.Button("removedate9", {
      //text: "Remove Date",
      icon: "sap-icon://delete",
      press: function() {
        sap.ui.getCore().byId("date9").setVisible(false);
        sap.ui.getCore().byId("DatePicker9").setValue("");
        sap.ui.getCore().byId("NewDate8").setVisible(true);
      }
    });
    var DatepickerL10 = new sap.m.Label({
      text: "Choose Date 10",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var DatePicker10 = new sap.m.DatePicker("DatePicker10", {
      width: "16rem",
      minDate: new Date(2022, 10, 1)
    });
    var holidaycheckbox10 = new sap.m.CheckBox("holidaycheckbox10", {
      text: "Holiday CheckBox ",
      width: "16rem"
    });
    var removedate10 = new sap.m.Button("removedate10", {
      //text: "Remove Date",
      icon: "sap-icon://delete",
      press: function() {
        sap.ui.getCore().byId("date10").setVisible(false);
        sap.ui.getCore().byId("DatePicker10").setValue("");
        sap.ui.getCore().byId("NewDate9").setVisible(true);
      }
    });
    //**************************************************************************************creating vbox and adding labels and respective dropdown/boxes*************************
    var LeaveVbox = new sap.m.VBox("LeaveVbox", {
      //width: "35%",
      justifyContent: "End",
      alignItems: "Center",
      items: [
        new sap.m.HBox("Team", {
          justifyContent: "End",
          alignItems: "Center",
          items: [TeamLabel, TeamDropDown]
        }),
        new sap.m.HBox("username", {
          justifyContent: "End",
          alignItems: "Center",
          items: [TeamMembersLabel, TeamMemebersDropdDown]
        }),
        new sap.m.HBox("date1", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL, DatePicker, holidaycheckbox, NewDate]
        }),
        new sap.m.HBox("date2", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL2, DatePicker2, holidaycheckbox2, NewDate2, removedate2]
        }),
        new sap.m.HBox("date3", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL3, DatePicker3, holidaycheckbox3, NewDate3, removedate3]
        }),
        new sap.m.HBox("date4", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL4, DatePicker4, holidaycheckbox4, NewDate4, removedate4]
        }),
        new sap.m.HBox("date5", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL5, DatePicker5, holidaycheckbox5, NewDate5, removedate5]
        }),
        new sap.m.HBox("date6", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL6, DatePicker6, holidaycheckbox6, NewDate6, removedate6]
        }),
        new sap.m.HBox("date7", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL7, DatePicker7, holidaycheckbox7, NewDate7, removedate7]
        }),
        new sap.m.HBox("date8", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL8, DatePicker8, holidaycheckbox8, NewDate8, removedate8]
        }),
        new sap.m.HBox("date9", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL9, DatePicker9, holidaycheckbox9, NewDate9, removedate9]
        }),
        new sap.m.HBox("date10", {
          justifyContent: "End",
          alignItems: "Center",
          items: [DatepickerL10, DatePicker10, holidaycheckbox10, removedate10]
        })
      ]
    });
    //***********************************creating dialog and inserting the above content into dailog*********************************************
    var LeaveDialog = new sap.m.Dialog("LeaveDialog", {
      title: "Please Fill Leave Details",
      titleAlignment: "Center",
      content: [LeaveVbox],
      beginButton: new sap.m.Button({
        text: "save",
        icon: "sap-icon://save",
        press: function() {
          var enteredDetails = {};
          enteredDetails['Param.1'] = sap.ui.getCore().byId("teamIdDropDown").getSelectedKey();
          enteredDetails['Param.2'] = sap.ui.getCore().byId("TeamMemebersidDropDown").getSelectedKey();
          var date1visibility = sap.ui.getCore().byId("date1").getVisible();
          var date2visibility = sap.ui.getCore().byId("date2").getVisible();
          var date3visibility = sap.ui.getCore().byId("date3").getVisible();
          var date4visibility = sap.ui.getCore().byId("date4").getVisible();
          var date5visibility = sap.ui.getCore().byId("date5").getVisible();
          var date6visibility = sap.ui.getCore().byId("date6").getVisible();
          var date7visibility = sap.ui.getCore().byId("date7").getVisible();
          var date8visibility = sap.ui.getCore().byId("date8").getVisible();
          var date9visibility = sap.ui.getCore().byId("date9").getVisible();
          var date10visibility = sap.ui.getCore().byId("date10").getVisible();
          if (enteredDetails['Param.1'] == "" || enteredDetails['Param.2'] == "") {
            //sap.m.MessageBox.alert("Please fill all mandatory fields!!!");
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date1visibility && sap.ui.getCore().byId("DatePicker").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date2visibility && sap.ui.getCore().byId("DatePicker2").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date3visibility && sap.ui.getCore().byId("DatePicker3").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date4visibility && sap.ui.getCore().byId("DatePicker4").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date5visibility && sap.ui.getCore().byId("DatePicker5").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date6visibility && sap.ui.getCore().byId("DatePicker6").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date7visibility && sap.ui.getCore().byId("DatePicker7").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date8visibility && sap.ui.getCore().byId("DatePicker8").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date9visibility && sap.ui.getCore().byId("DatePicker9").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else if (date10visibility && sap.ui.getCore().byId("DatePicker10").getValue() == "") {
            sap.m.MessageToast.show("Please fill all Mandatory fields!!");
            sap.ui.getCore().byId("LeaveDialog").open();
          } else {
            confirmDialog.open();
          }
          //sap.m.MessageToast.show("Logic to Save Applied Leaves is Still In Progress .Please Click on Close Button to Go Back to Menu Page");
          //window.location.href = "/XMII/CM/Default/viswajith/demo/index.irpt";
          //oController.saveLeaveDetails();
        }
      }),
      endButton: new sap.m.Button({
        text: "close",
        icon: "sap-icon://log",
        press: function() {
          LeaveDialog.close();
          window.location.href = "/XMII/CM/Default/viswajith/demo/index.irpt";
        }
      })
    });
    //****************************************************************************confirm dialog after clicking save on leave dialog*********************************************
    var confirmDialog = new sap.m.Dialog("confirmDialog", {
      title: "Confirmation",
      titleAlignment: "Center",
      content: [new sap.m.Label({
        text: "Please Confirm if you want to save the Leave Details",
        textAlign: "Center"
      })],
      beginButton: new sap.m.Button({
        text: "Save",
        icon: "sap-icon://accept",
        press: function() {
          oController.saveLeaveDetails();
          confirmDialog.close();
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          confirmDialog.close();
        }
      })
    });
    //******************************************************************************creating content of dialog box for view leave details************************************************
    var TeamLabel2 = new sap.m.Label({
      text: "Team",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var TeamDropDown2 = new sap.m.Select("teamIdDropDown2", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {
        sap.ui.getCore().byId("yearhbox").setVisible(true);
        oController.getYearDetails();
      }
    });
    var yearlabel = new sap.m.Label({
      text: "Year",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var yeardropdown = new sap.m.Select("yeardropdown", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {
        //oController.getGroupListByPlantDept();
        //oController.getShiftIDListByPlantDeptGroup();
        sap.ui.getCore().byId("monthhbox").setVisible(true);
        oController.getMonthDetails();
      }
    });
    var monthlabel = new sap.m.Label({
      text: "Month",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    //.addStyleClass("Label");
    var monthdropdown = new sap.m.Select("monthdropdown", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {
        sap.ui.getCore().byId("leavedetailsbutton").setVisible(true);
      }
    });
    //**************************************************************creating vbox and adding all hbox to it for view leave details******************************************************
    var LeaveViewbox = new sap.m.VBox("LeaveViewbox", {
      //width: "35%",
      justifyContent: "End",
      alignItems: "Center",
      items: [
        new sap.m.HBox("Team2", {
          justifyContent: "End",
          alignItems: "Center",
          items: [TeamLabel2, TeamDropDown2]
        }),
        new sap.m.HBox("yearhbox", {
          justifyContent: "End",
          alignItems: "Center",
          items: [yearlabel, yeardropdown]
        }),
        new sap.m.HBox("monthhbox", {
          justifyContent: "End",
          alignItems: "Center",
          items: [monthlabel, monthdropdown]
        })
      ]
    });
    //*******************************************************************creating dialog to view leave details****************************************************************************
    var viewLeave = new sap.m.Dialog("viewLeave", {
      title: "View Leave Details",
      titleAlignment: "Center",
      content: [LeaveViewbox],
      beginButton: new sap.m.Button("leavedetailsbutton", {
        text: "Get Leave Details",
        icon: "sap-icon://check-availability",
        press: function() {
          //oController.saveLeaveDetails();
          // confirmDialog.close();
          // LeaveDialog.close();
          var teamvalue = sap.ui.getCore().byId("teamIdDropDown2").getSelectedKey();
          var yearvalue = sap.ui.getCore().byId("yeardropdown").getSelectedKey();
          var monthvalue = sap.ui.getCore().byId("monthdropdown").getSelectedKey();
          if (teamvalue == "" || yearvalue == "" || monthvalue == "" || monthvalue == "--Select--" || teamvalue == "--Select--" || yearvalue == "--Select--") {
            sap.m.MessageToast.show("Please Fill All Mandatory Field!!");
          } else {
            leavetableDialog.open();
            oController.getLeaveDeatails();
          }
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          //leavetableDialog.close();
          window.location.href = "/XMII/CM/Default/viswajith/demo/index.irpt";
        }
      })
    });
    //*************************************************************************************leave table  and dialog when clicked on view leave dialog************************
    //leavetable
    var Leavecolumns = [
      new sap.m.Column({
        header: new sap.m.Label({
          text: "Team",
          tooltip: "Team",
          design: "Bold"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "521ID",
          tooltip: "521ID",
          design: "Bold"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "USER",
          tooltip: "USER",
          design: "Bold"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "DATE",
          tooltip: "DATE",
          design: "Bold"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "MONTH",
          tooltip: "MONTH",
          design: "Bold"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "YEAR",
          tooltip: "YEAR",
          design: "Bold",
          wrapping: true
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "TYPE",
          tooltip: "TYPE",
          design: "Bold",
          wrapping: true
        })
      })
     
    ];
    var leaveTable = new sap.m.Table("leaveTable", {
      columns: Leavecolumns,
      mode: "SingleSelectLeft",
      //growing: true,
      //growingScrollToLoad: true
      //fixedLayout : false
    });
    //.addStyleClass("sapUiSizeCompact");
    var leaveItem = new sap.m.ColumnListItem("leaveItem", {
      cells: [
        new sap.m.Text({
          text: "{team}"
        }),
        new sap.m.Text({
          text: "{USER_521ID}"
        }),
        new sap.m.Text({
          text: "{user}"
        }),
        new sap.m.Text({
          text: "{date}"
        }),
        new sap.m.Text({
          text: "{month}"
        }),
        new sap.m.Text({
          text: "{year}"
        }),
        new sap.m.Text({
          text: "{TYPE}"
        })
        
      ]
    });
    leaveTable.bindAggregation("items", "/Rowsets/Rowset/0/Row", leaveItem);
    leaveTable.setModel(leaveModel);
    var leavetableDialog = new sap.m.Dialog("leavetableDialog", {
      title: "Leave Details",
      titleAlignment: "Center",
      content: [leaveTable],
      beginButton: new sap.m.Button({
        text: "Withdraw",
        icon: "sap-icon://undo",
        press: function() {
          //oController.saveLeaveDetails();
          // confirmDialog.close();
          // LeaveDialog.close();
          // leavetableDialog.open();
          var tableSelectedItem = sap.ui.getCore().byId("leaveTable").getSelectedItem();
          if (tableSelectedItem == null) {
            sap.m.MessageToast.show("Please Select a Row to withdraw");
          } else {
            //sap.m.MessageToast.show(tableSelectedItem);
            //oController.withdrawleave();
            withdrawconfirmdialog.open();
            oController.setWithdrawDialogContentText();
          }
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          //leavetableDialog.close();
          //window.location.href = "/XMII/CM/Default/viswajith/demo/index.irpt";
          leavetableDialog.close();
        }
      })
    });
    //withdrawconfirmdialogcontent
    var withdrawtext = new sap.m.Text("withdrawdialogtext", {
      text: ""
    });
    var withdrawconfirmdialog = new sap.m.Dialog("withdrawconfirmdialog", {
      title: "Leave Details",
      titleAlignment: "Center",
      content: [withdrawtext],
      beginButton: new sap.m.Button({
        text: "Yes",
        icon: "sap-icon://undo",
        press: function() {
          oController.withdrawleave();
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          //leavetableDialog.close();
          // window.location.href = "/XMII/CM/Default/viswajith/demo/index.irpt";
          withdrawconfirmdialog.close();
        }
      })
    });
    //************************************************************************************************add user dialog box  content and logic*************************************************************
    //**********************************************dropdown input boxes***********************
    var adduserteamlabel = new sap.m.Label({
      text: "Team",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    var adduserteamdropdown = new sap.m.Select("adduserteamdropdown", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {
        sap.ui.getCore().byId("adduseruseridhbox").setVisible(true);
        sap.ui.getCore().byId("adduseruseridhbox2").setVisible(true);
        sap.ui.getCore().byId("adduserusernamehbox").setVisible(true);
        //oController.getTeammemebersDetailsforadduser();
      }
    });
    var adduseridteamlabel = new sap.m.Label("adduseridteamlabel", {
      text: "521ID",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    var adduseruserid = new sap.m.Input("adduseruserid", {
      width: "16rem"
    });
    var adduseridteamlabel2 = new sap.m.Label("adduseridteamlabel2", {
      text: "Re Enter 521ID",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    var adduseruserid2 = new sap.m.Input("adduseruserid2", {
      width: "16rem"
    });
    var adduserusernamelabel = new sap.m.Label("adduserusernamelabel", {
      text: "User Name",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    var adduserusername = new sap.m.Input("adduserusername", {
      width: "16rem"
      /*liveChange:function(){                
      }*/
    });
    //**************************adding above content into v box********************
    var addUserVbox = new sap.m.VBox("addUserVbox", {
      //width: "35%",
      justifyContent: "End",
      alignItems: "Center",
      items: [
        new sap.m.HBox("adduserteamlisthbox", {
          justifyContent: "End",
          alignItems: "Center",
          items: [adduserteamlabel, adduserteamdropdown]
        }),
        new sap.m.HBox("adduseruseridhbox", {
          justifyContent: "End",
          alignItems: "Center",
          items: [adduseridteamlabel, adduseruserid]
        }),
        new sap.m.HBox("adduseruseridhbox2", {
          justifyContent: "End",
          alignItems: "Center",
          items: [adduseridteamlabel2, adduseruserid2]
        }),
        new sap.m.HBox("adduserusernamehbox", {
          justifyContent: "End",
          alignItems: "Center",
          items: [adduserusernamelabel, adduserusername]
        })
      ]
    });
    //************************************************add user dialog*******************
    var addUserDialog = new sap.m.Dialog("addUserDialog", {
      title: "Add User",
      titleAlignment: "Center",
      content: [addUserVbox],
      beginButton: new sap.m.Button("adduserbutton", {
        text: "Add",
        icon: "sap-icon://add",
        press: function() {
          //validation of userid wether it exists or not yet to be done based on sp help for login user details
          if (sap.ui.getCore().byId("adduserteamdropdown").getSelectedKey() == "" || sap.ui.getCore().byId("adduserteamdropdown").getSelectedKey() == "--Select--" || sap.ui.getCore().byId("adduseruserid").getValue() == "" || sap.ui.getCore().byId("adduserusername").getValue() == "") {
            sap.m.MessageToast.show("Please Fill All Mandatory Fields!!");
          } else if (sap.ui.getCore().byId("adduseruserid").getValue() != sap.ui.getCore().byId("adduseruserid2").getValue()) {
            sap.m.MessageToast.show("521ID's Do not Match");
          } else {
            sap.ui.getCore().byId("commonconfirmdialogcontent").setText("Are You sure You Want to Add User " + sap.ui.getCore().byId("adduseruserid").getValue() + " ?");
            commonconfirmdialog.open();
          }
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          //leavetableDialog.close();
          window.location.href = "/XMII/CM/Default/viswajith/demo/index.irpt";
        }
      })
    });
    //*****************************************************************confirm dialog for add user **************************
    //confirmdialogcontentseetingdynamically
    var commonconfirmdialogcontent = new sap.m.Text("commonconfirmdialogcontent", {
      text: ""
    });
    //sap.ui.getCore().byId("commonconfirmdialogcontent").setText("");
    var commonconfirmdialog = new sap.m.Dialog("commonconfirmdialog", {
      title: "Confirmation",
      titleAlignment: "Center",
      content: [commonconfirmdialogcontent],
      beginButton: new sap.m.Button({
        text: "Add",
        icon: "sap-icon://add",
        press: function() {
          oController.adduser();
          //sap.m.MessageToast.show("Logic to Add New Users MasterData to a Team is Still in Progress");
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          commonconfirmdialog.close();
        }
      })
    });
    //***********************************************************dialog table content for edit  *******************************************************************
    //content
    var Usersearchlabel = new sap.m.Label("Usersearchlabel", {
      text: "521ID",
      textAlign: "Center",
      width: "8rem",
      design: "Bold",
      tooltip: "521ID",
      required: true
    });
    var userSuggestionItems = new sap.m.SuggestionItem("userSuggestion");
    userSuggestionItems.bindProperty("key", "User_521ID");
    userSuggestionItems.bindProperty("text", "User_521ID");
    var userSearchField = new sap.m.SearchField("userSearchField", {
      enableSuggestions: true,
      width: "9rem",
      //maxLength : 12, 
      search: function(event) {
        oController.onSearch(event)
      },
      suggest: function(event) {
        oController.onSuggest(event)
      },
      placeholder: "Search"
    });
    userSearchField.bindAggregation("suggestionItems", "/Rowsets/Rowset/0/Row", userSuggestionItems);
    userSearchField.setModel(userSuggestionModel);
    var SearchButton = new sap.m.Button("SearchButton", {
      text: "Search",
      //textAlign: "Center",
      icon: "sap-icon://search",
      press: function() {
        if (sap.ui.getCore().byId("userSearchField") == null) {
          sap.m.MessagToast.show("Please Fill All Mandatory Fields");
        } else {
          oController.getAllUserDetailsonedit();
        }
      }
    });
    //Table and respective columns 
    var editusercolumns = [
      new sap.m.Column({
        header: new sap.m.Label({
          text: "521ID",
          tooltip: "521ID",
          design: "Bold",
          width: "10rem"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "Team_Name",
          tooltip: "Team_Name",
          design: "Bold",
          width: "10rem"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "User_Name",
          tooltip: "User_Name",
          design: "Bold",
          wrapping: true,
          width: "12rem"
        })
      })
    ];
    var editusertable = new sap.m.Table("editusertable", {
      columns: editusercolumns,
      mode: "SingleSelectLeft",
      fixedLayout: false,
      autoPopinMode: true
    });
    var useredititem = new sap.m.ColumnListItem("useredititem", {
      cells: [
        new sap.m.Text({
          text: "{User_521ID}",
          width: "10rem"
        }),
        new sap.m.Text({
          text: "{Team_Name}",
          width: "10rem"
        }),
        new sap.m.Text({
          text: "{User_Name}",
          width: "12rem"
        })
      ]
    });
    editusertable.bindAggregation("items", "/Rowsets/Rowset/0/Row", useredititem);
    editusertable.setModel(editusermodel);
    //creating vbox and putting search and table in it
    var edituservbox = new sap.m.VBox("edituservbox", {
      //width: "20%",
      justifyContent: "Start",
      alignItems: "Center",
      items: [
        new sap.m.HBox("editusersearchhbox", {
          justifyContent: "Start",
          alignItems: "Center",
          items: [Usersearchlabel, userSearchField, SearchButton]
        }),
        new sap.m.HBox("editusertablehbox", {
          justifyContent: "End",
          alignItems: "Center",
          items: [editusertable]
        })
      ]
    });
    //inserting above content into dialog box
    var editdeletedialog = new sap.m.Dialog("editdeletedialog", {
      title: "Edit User Details",
      titleAlignment: "Center",
      content: [edituservbox],
      beginButton: new sap.m.Button("editdeletebeginbutton", {
        text: "Edit",
        icon: "sap-icon://edit",
        press: function() {
          //sap.m.MessageToast.show("Logic to edit  Users MasterData  is Still in Progress");
          var rowselectionforedit = sap.ui.getCore().byId("editusertable").getSelectedItem();
          if (rowselectionforedit == null) {
            sap.m.MessageToast.show("Please Select a Row to edit");
          } else {
            edituserdialog.open();
            oController.AssignTeamlistonedituser();
          }
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          editdeletedialog.close();
          sap.ui.getCore().byId("userSearchField").setValue("");
        }
      })
    });
    //*******************************************************************edituser second dialog after choosing the userid in table**********************************************************************
    var edituseruseridlabel = new sap.m.Label("edituseruseridlabel", {
      text: "521ID",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      //required: false
    });
    var edituseruseridinput = new sap.m.Input("edituseruseridinput", {
      width: "16rem",
      editable: false
    });
    var edituserteamdropdownlabel = new sap.m.Label("edituserteamdropdownlabel", {
      text: "Team",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    var edituserteamdropdown = new sap.m.Select("edituserteamdropdown", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {}
    });
    var edituserusernamelabel = new sap.m.Label("edituserusernamelabel", {
      text: "UserName",
      textAlign: "Left",
      width: "8rem",
      design: "Bold",
      required: true
    });
    var edituserusernameinputbox = new sap.m.Input("edituserusernameinputbox", {
      width: "16rem"
    });
    var edituserdialogcontent = new sap.m.VBox("edituserdialogcontent", {
      //width: "20%",
      justifyContent: "Start",
      alignItems: "Center",
      items: [
        new sap.m.HBox("edituseruseridhbox", {
          justifyContent: "Start",
          alignItems: "Center",
          items: [edituseruseridlabel, edituseruseridinput]
        }),
        new sap.m.HBox("edituserteamdropdownhbox", {
          justifyContent: "End",
          alignItems: "Center",
          items: [edituserteamdropdownlabel, edituserteamdropdown]
        }),
        new sap.m.HBox("edituserusernamehbox", {
          justifyContent: "End",
          alignItems: "Center",
          items: [edituserusernamelabel, edituserusernameinputbox]
        })
      ]
    });
    var edituserdialog = new sap.m.Dialog("edituserdialog", {
      title: "Edit User Details",
      titleAlignment: "Center",
      content: [edituserdialogcontent],
      beginButton: new sap.m.Button({
        text: "Edit",
        icon: "sap-icon://edit",
        press: function() {
          edituserconfirmdialog.open()
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          edituserdialog.close();
        }
      })
    });
    var userid = "Are you sure you want to edit User details";
    var confirmationdialogeditusercontent = new sap.m.Text("confirmationdialogeditusercontent:", {
      text: userid
    });
    var edituserconfirmdialog = new sap.m.Dialog("edituserconfirmdialog", {
      title: "Confirmation",
      titleAlignment: "Center",
      content: [confirmationdialogeditusercontent],
      beginButton: new sap.m.Button({
        text: "Edit",
        icon: "sap-icon://edit",
        press: function() {
          oController.editusercontroller();
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          edituserconfirmdialog.close();
        }
      })
    });
    //*****************************************************************************delete User Loguic*****************************************************************************************************
    var Usersearchlabel2 = new sap.m.Label("Usersearchlabel2", {
      text: "521ID",
      textAlign: "Center",
      width: "8rem",
      design: "Bold",
      tooltip: "521ID",
      required: true
    });
    var userSuggestionItems2 = new sap.m.SuggestionItem("userSuggestionItems2");
    userSuggestionItems2.bindProperty("key", "User_521ID");
    userSuggestionItems2.bindProperty("text", "User_521ID");
    var userSearchField2 = new sap.m.SearchField("userSearchField2", {
      enableSuggestions: true,
      width: "9rem",
      //maxLength : 12, 
      search: function(event) {
        oController.onSearch2(event)
      },
      suggest: function(event) {
        oController.onSuggest2(event)
      },
      placeholder: "Search"
    });
    userSearchField2.bindAggregation("suggestionItems", "/Rowsets/Rowset/0/Row", userSuggestionItems2);
    userSearchField2.setModel(userSuggestionModel2);
    var SearchButton2 = new sap.m.Button("SearchButton2", {
      text: "Search",
      //textAlign: "Center",
      icon: "sap-icon://search",
      press: function() {
        if (sap.ui.getCore().byId("userSearchField2") == null) {
          sap.m.MessagToast.show("Please Fill All Mandatory Fields");
        } else {
          oController.getAllUserDetailsonedit2();
        }
      }
    });
    //Table and respective columns 
    var editusercolumns2 = [
      new sap.m.Column({
        header: new sap.m.Label({
          text: "521ID",
          tooltip: "521ID",
          design: "Bold",
          width: "10rem"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "Team_Name",
          tooltip: "Team_Name",
          design: "Bold",
          width: "10rem"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "User_Name",
          tooltip: "User_Name",
          design: "Bold",
          wrapping: true,
          width: "12rem"
        })
      })
    ];
    var editusertable2 = new sap.m.Table("editusertable2", {
      columns: editusercolumns2,
      mode: "SingleSelectLeft",
      fixedLayout: false,
      autoPopinMode: true
    });
    var useredititem2 = new sap.m.ColumnListItem("useredititem2", {
      cells: [
        new sap.m.Text({
          text: "{User_521ID}",
          width: "10rem"
        }),
        new sap.m.Text({
          text: "{Team_Name}",
          width: "10rem"
        }),
        new sap.m.Text({
          text: "{User_Name}",
          width: "12rem"
        })
      ]
    });
    editusertable2.bindAggregation("items", "/Rowsets/Rowset/0/Row", useredititem2);
    editusertable2.setModel(editusermodel2);
    //creating vbox and putting search and table in it
    var edituservbox2 = new sap.m.VBox("edituservbox2", {
      //width: "20%",
      justifyContent: "Start",
      alignItems: "Center",
      items: [
        new sap.m.HBox("editusersearchhbox2", {
          justifyContent: "Start",
          alignItems: "Center",
          items: [Usersearchlabel2, userSearchField2, SearchButton2]
        }),
        new sap.m.HBox("editusertablehbox2", {
          justifyContent: "End",
          alignItems: "Center",
          items: [editusertable2]
        })
      ]
    });
    var deleteuserdialog = new sap.m.Dialog("deleteuserdialog", {
      title: "Delete User Details",
      titleAlignment: "Center",
      content: [edituservbox2],
      beginButton: new sap.m.Button({
        text: "Delete",
        icon: "sap-icon://delete",
        press: function() {
          var rowselectionfordelete = sap.ui.getCore().byId("editusertable2").getSelectedItem();
          if (rowselectionfordelete == null) {
            sap.m.MessageToast.show("Please Select a Row to Delete");
          } else {
            deleteuserconfirmdialog.open();
          }
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          deleteuserdialog.close();
          sap.ui.getCore().byId("userSearchField").setValue("");
        }
      })
    });
    var deleteusercontent = new sap.m.Text({
      text: "Are You sure You want to Delete User Details?"
    });
    var deleteuserconfirmdialog = new sap.m.Dialog("deleteuserconfirmdialog", {
      title: "Confirmation",
      titleAlignment: "Center",
      content: [deleteusercontent],
      beginButton: new sap.m.Button({
        text: "Delete",
        icon: "sap-icon://delete",
        press: function() {
          oController.deleteuserdetails();
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          deleteuserconfirmdialog.close();
          sap.ui.getCore().byId("userSearchField").setValue("");
        }
      })
    });
    //***********************************creating new page to the app that is created at createcontent and adding all the content to page and displaying the content*********************************************
    var leaveaddpage = new sap.m.Page("leaveaddpage");
    leaveaddpage.setTitle("Leave Tracker");
    leaveaddpage.setTitleAlignment("Center");
    leaveaddpage.addContent(buttoncontent);
    Leave.addPage(leaveaddpage);
    return Leave
  }
});