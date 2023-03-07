sap.ui.jsview("Scripts.ShiftTracker",{
getControllerName : function(){
 return "Scripts.ShiftTracker";
},
createContent : function(oController){

 var Shifttrackerapp = new sap.m.App("Shifttrackerapp", {
      backgroundColor: "Blue"
    });
//************************************************************content for hbox of shifttracker********************************************
var teamdropdownlabel = new sap.m.Label("teamdropdownlabel",{
      text: "Team",
      textAlign: "Left",
      //width: "4rem",
      design: "Bold",
      required: true
    });
   
    var teamdropdown = new sap.m.Select("teamdropdown", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {
        //sap.ui.getCore().byId("username").setVisible(true);
        //oController.getYearDetails();
      }
    });

var yeardropdownlabel = new sap.m.Label("yeardropdownlabel",{
      text: "Year",
      textAlign: "Left",
      //width: "4rem",
      design: "Bold",
      required: true
    });
   
    var yeardropdown = new sap.m.Select("yeardropdown", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {
        //sap.ui.getCore().byId("username").setVisible(true);
        //oController.getTeammemebersDetails();
//oController.getMonthDetails();
      }
    });

var monthdropdownlabel = new sap.m.Label("monthdropdownlabel",{
      text: "Month",
      textAlign: "Left",
      //width: "4rem",
      design: "Bold",
      required: true
    });
   
    var monthdropdown = new sap.m.Select("monthdropdown", {
      width: "16rem",
      showSecondaryValues: true,
      change: function() {
        //sap.ui.getCore().byId("username").setVisible(true);
        //oController.getTeammemebersDetails();
      }
    });
var getshifttrackerbutton = new sap.m.Button("getshifttrackerbutton", {
      text: "Generate Shift Tracker",
      icon: "sap-icon://add",
      press: function() {
        //window.location.href = "/XMII/CM/Default/viswajith/demo/ShiftTracker.irpt";
if(sap.ui.getCore().byId("teamdropdown").getSelectedKey()=="" || sap.ui.getCore().byId("teamdropdown").getSelectedKey()=="--Select--" || sap.ui.getCore().byId("yeardropdown").getSelectedKey()=="" || sap.ui.getCore().byId("yeardropdown").getSelectedKey()=="--Select--" || sap.ui.getCore().byId("monthdropdown").getSelectedKey()=="" || sap.ui.getCore().byId("monthdropdown").getSelectedKey()=="--Select--"){
sap.m.MessageToast.show("Please Fill All Mandatory Fields!!");
}
else{
 //sap.m.MessageToast.show("Logic to generate shift tracker is Still in Progress");
 //sap.ui.getCore().byId("downloadShifttracker").setVisible(true);
shifttrackerdialog.open();
oController.createshifttrackerdata();
oController.AssignShifttracker();

//******************************************************************setting month column dynamically ***********************************
var dynamicmonth=sap.ui.getCore().byId("monthdropdown").getSelectedKey();
dynamicmonth=dynamicmonth.substring(0,3).toUpperCase();
sap.ui.getCore().byId("D1").setText(dynamicmonth+"-1");
sap.ui.getCore().byId("D2").setText(dynamicmonth+"-2");
sap.ui.getCore().byId("D3").setText(dynamicmonth+"-3");
sap.ui.getCore().byId("D4").setText(dynamicmonth+"-4");
sap.ui.getCore().byId("D5").setText(dynamicmonth+"-5");
sap.ui.getCore().byId("D6").setText(dynamicmonth+"-6");
sap.ui.getCore().byId("D7").setText(dynamicmonth+"-7");
sap.ui.getCore().byId("D8").setText(dynamicmonth+"-8");
sap.ui.getCore().byId("D9").setText(dynamicmonth+"-9");
sap.ui.getCore().byId("D10").setText(dynamicmonth+"-10");
sap.ui.getCore().byId("D11").setText(dynamicmonth+"-11");
sap.ui.getCore().byId("D12").setText(dynamicmonth+"-12");
sap.ui.getCore().byId("D13").setText(dynamicmonth+"-13");
sap.ui.getCore().byId("D14").setText(dynamicmonth+"-14");
sap.ui.getCore().byId("D15").setText(dynamicmonth+"-15");
sap.ui.getCore().byId("D16").setText(dynamicmonth+"-16");
sap.ui.getCore().byId("D17").setText(dynamicmonth+"-17");
sap.ui.getCore().byId("D18").setText(dynamicmonth+"-18");
sap.ui.getCore().byId("D19").setText(dynamicmonth+"-19");
sap.ui.getCore().byId("D20").setText(dynamicmonth+"-20");
sap.ui.getCore().byId("D21").setText(dynamicmonth+"-21");
sap.ui.getCore().byId("D22").setText(dynamicmonth+"-22");
sap.ui.getCore().byId("D23").setText(dynamicmonth+"-23");
sap.ui.getCore().byId("D24").setText(dynamicmonth+"-24");
sap.ui.getCore().byId("D25").setText(dynamicmonth+"-25");
sap.ui.getCore().byId("D26").setText(dynamicmonth+"-26");
sap.ui.getCore().byId("D27").setText(dynamicmonth+"-27");
sap.ui.getCore().byId("D28").setText(dynamicmonth+"-28");
sap.ui.getCore().byId("D29").setText(dynamicmonth+"-29");
sap.ui.getCore().byId("D30").setText(dynamicmonth+"-30");
sap.ui.getCore().byId("D31").setText(dynamicmonth+"-31");



}
       
      }
    });
//*****************************************************************************************************************************************************
/*var downloadShifttracker = new sap.m.Button("downloadShifttracker",{
text: "Download Shift Tracker",
      icon: "sap-icon://pdf-attachment",
      press: function() {
sap.m.MessageToast.show("Logic to Download shift tracker Excel is Still in Progress")
}
});
 sap.ui.getCore().byId("downloadShifttracker").setVisible(false);*/

 ///*********************************************Creating content hbox for shifttracker content************************************
 var Shifttrackerhboxcontent = new sap.m.HBox("Shifttrackerhboxcontent", {
      justifyContent: "Center",
      alignItems: "Center",
      items: [teamdropdownlabel,teamdropdown,yeardropdownlabel,yeardropdown,monthdropdownlabel,monthdropdown,getshifttrackerbutton]
    });
//****************************************************************shifttracker table creation **************************************************************
var shifttrackercolumns= [
      new sap.m.Column({
        header: new sap.m.Label({
          text: "SPOC",
          tooltip: "SPOC",
          design: "Bold",
 wrapping: true

        }),width:"100px"
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "NAME",
          tooltip: "USER_NAME",
          design: "Bold",
 wrapping: true

        }),width:"200px"
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "EMAIL",
          tooltip: "Email",
          design: "Bold",
 wrapping: true

        }),width:"300px"
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "USERID",
          tooltip: "User_521ID",
          design: "Bold",
 wrapping: true
        }),width:"100px"
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "LOCATION",
          tooltip: "LOCATION",
          design: "Bold",
 wrapping: true
        }),width:"150px"
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "TEAM",
          tooltip: "Team_Name",
          design: "Bold",
          wrapping: true
        }),width:"150px"
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "NUMBER",
          tooltip: "PHONE_NUMBER",
          design: "Bold",
          wrapping: true
        }),width:"150px"
      }),
     new sap.m.Column({
        header: new sap.m.Label({
          text: "ALT_NUMBER",
          tooltip: "ALTERNATE_NUMBER",
          design: "Bold",
         wrapping: true
        }),width:"150px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D1",{
          text: "DATE1",
          tooltip: "1",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D2",{
          text: "DATE2",
          tooltip: "2",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D3",{
          text: "DATE3",
          tooltip: "3",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D4",{
          text: "DATE4",
          tooltip: "4",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D5",{
          text: "DATE5",
          tooltip: "5",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D6",{
          text: "DATE6",
          tooltip: "6",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D7",{
          text: "DATE7",
          tooltip: "7",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D8",{
          text: "DATE8",
          tooltip: "8",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D9",{
          text: "DATE9",
          tooltip: "9",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D10",{
          text: "DATE10",
          tooltip: "10",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D11",{
          text: "DATE11",
          tooltip: "11",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D12",{
          text: "DATE12",
          tooltip: "12",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D13",{
          text: "DATE13",
          tooltip: "13",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D14",{
          text: "DATE14",
          tooltip: "14",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D15",{
          text: "DATE15",
          tooltip: "15",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D16",{
          text: "DATE16",
          tooltip: "16",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D17",{
          text: "DATE17",
          tooltip: "17",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D18",{
          text: "DATE18",
          tooltip: "18",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D19",{
          text: "DATE19",
          tooltip: "19",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D20",{
          text: "DATE20",
          tooltip: "20",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D21",{
          text: "DATE21",
          tooltip: "21",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D22",{
          text: "DATE22",
          tooltip: "22",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D23",{
          text: "DATE23",
          tooltip: "23",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D24",{
          text: "DATE24",
          tooltip: "24",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D25",{
          text: "DATE25",
          tooltip: "25",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D26",{
          text: "DATE26",
          tooltip: "26",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D27",{
          text: "DATE27",
          tooltip: "27",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D28",{
          text: "DATE28",
          tooltip: "28",
          design: "Bold",
          wrapping: true
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D29",{
          text: "DATE29",
          tooltip: "29",
          design: "Bold",
          wrapping: true
       
         
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D30",{
          text: "DATE30",
          tooltip: "30",
          design: "Bold",
          wrapping: true
    
        }),width:"100px"
      }),
new sap.m.Column({
        header: new sap.m.Label("D31",{
          text: "DATE31",
          tooltip: "31",
          design: "Bold",

          wrapping: true
        }),width:"100px"
      })



    ];

//Table
//var oScrollContainer = new sap.m.ScrollContainer({height:"100%",vertical:true, horizontal:true, focusable: true, content:[shifttrackertable]});

    var shifttrackertable = new sap.m.Table("shifttrackertable", {
      columns: shifttrackercolumns,
      //mode: "SingleSelectLeft",
      //growing: true,
      //growingScrollToLoad: true,
      //fixedLayout : false
     //width:"100rem"
    });
    



    var shifttrackeritem = new sap.m.ColumnListItem("shifttrackeritem", {
      cells: [
        new sap.m.Text({
          text: "{SPOC}"
        }),
        new sap.m.Text({
          text: "{USER_NAME}"
        }),
        new sap.m.Text({
          text: "{Email}"
        }),
        new sap.m.Text({
          text: "{User_521ID}"
        }),
        new sap.m.Text({
          text: "{LOCATION}"
        }),
        new sap.m.Text({
          text: "{Team_Name}"
        }),
        new sap.m.Text({
          text: "{PHONE_NUMBER}"
        }),
new sap.m.Text({
          text: "{ALTERNATE_NUMBER}"
        }),
new sap.m.Text({
          text: "{Date1}"
        }),
new sap.m.Text({
          text: "{Date2}"
        }),
new sap.m.Text({
         text: "{Date3}"
        }),
		new sap.m.Text({
         text: "{Date4}"
        }),
		new sap.m.Text({
         text: "{Date5}"
        }),
		new sap.m.Text({
         text: "{Date6}"
        }),
		new sap.m.Text({
         text: "{Date7}"
        }),
		new sap.m.Text({
         text: "{Date8}"
        }),
		new sap.m.Text({
         text: "{Date9}"
        }),
		new sap.m.Text({
         text: "{Date10}"
        }),
		new sap.m.Text({
         text: "{Date11}"
        }),
		new sap.m.Text({
         text: "{Date12}"
        }),
		new sap.m.Text({
         text: "{Date13}"
        }),
		new sap.m.Text({
         text: "{Date14}"
        }),
		new sap.m.Text({
         text: "{Date15}"
        }),
		new sap.m.Text({
         text: "{Date16}"
        }),
		new sap.m.Text({
         text: "{Date17}"
        }),
		new sap.m.Text({
         text: "{Date18}"
        }),
		new sap.m.Text({
         text: "{Date19}"
        }),
		new sap.m.Text({
         text: "{Date20}"
        }),
		new sap.m.Text({
         text: "{Date21}"
        }),
		new sap.m.Text({
         text: "{Date22}"
        }),
		new sap.m.Text({
         text: "{Date23}"
        }),
		new sap.m.Text({
         text: "{Date24}"
        }),
		new sap.m.Text({
         text: "{Date25}"
        }),
		new sap.m.Text({
         text: "{Date26}"
        }),
		new sap.m.Text({
         text: "{Date27}"
        }),
		new sap.m.Text({
         text: "{Date28}"
        }),
		new sap.m.Text({
         text: "{Date29}"
        }),
		new sap.m.Text({
         text: "{Date30}"
        }),
		new sap.m.Text({
         text: "{Date31}"
        }),
        
      ]
    });
    shifttrackertable.bindAggregation("items", "/Rowsets/Rowset/0/Row", shifttrackeritem );
    shifttrackertable.setModel(shifttrackermodel);

//********************************************************************Dialog box for table shift tracker*********************************
var shifttrackerdialog = new sap.m.Dialog("shifttrackerdialog",{
 title: "Shift Tracker",
      titleAlignment: "Center",
      content: [shifttrackertable],
      beginButton: new sap.m.Button({
        text: "Download",
        icon: "sap-icon://download",
        press: function() {
          //oController.saveLeaveDetails();
          //confirmDialog.close();
 //sap.m.MessageToast.show("Logic to Download Excel is still in Progress");
oController.onDataExport();
        }
      }),
      endButton: new sap.m.Button({
        text: "Close",
        icon: "sap-icon://decline",
        press: function() {
          shifttrackerdialog.close();
        }
      })
});

  
//******************************************************page and content ***************************************************************
var shifttrackerpage = new sap.m.Page("shifttrackerpage",{
navButtonPress:function(){
  window.location.href = "/XMII/CM/Default/viswajith/demo/index.irpt";
},
navButtonTooltip:"Menu"
//showFooter:true
});

shifttrackerpage.setShowNavButton(true);
    shifttrackerpage.setTitle("Shift Tracker");
    shifttrackerpage.setTitleAlignment("Center");
    shifttrackerpage.addContent(Shifttrackerhboxcontent);
 //shifttrackerpage.addContent(shifttrackertable);
    Shifttrackerapp.addPage(shifttrackerpage);
    return Shifttrackerapp;
}
});

