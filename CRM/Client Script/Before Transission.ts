
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/
var stage = ZDK.Page.getField("Funnel_Stage").getValue();
if (stage == "5 Onboarding Review") {
    var role = ZDK.Page.getField("Role").getValue();
    var agreements = ZDK.Page.getField("Agreements").getValue();
    if (role !== null && role !== "" && agreements !== null && agreements !== "") {
        if (role === "A. Union Station Security Specialist") {
            var agreementsU = ["WES: Employment Agreement - UNION STATION", "Workplace Violence & Harassment Video", "Security License", "First Aid", "WHMIS", "AODA", "H&S 4 Steps Training (OHSA)", "SIN / Work Permit", "Covid Vaccination"];
        }
        else if (role === "B. Security Guard") {
            var agreementsU = ["WES: Employment Agreement SECURITY GUARD", "Workplace Violence & Harassment Video", "Security License", "First Aid", "WHMIS", "AODA", "H&S 4 Steps Training (OHSA)", "SIN / Work Permit", "Covid Vaccination"];
        }
        else if (role === "C. Mobile Patrol Supervisor") {
            var agreementsU = ["WES: Employment Agreement - MPS", "Workplace Violence & Harassment Video", "Security License", "First Aid", "WHMIS", "AODA", "H&S 4 Steps Training (OHSA)", "SIN / Work Permit", "Covid Vaccination", "Driver's License"];
        }
        else if (role === "D. Community Safety Ambassador") {
            var agreementsU = ["WES: Employment Agreement CSA", "Workplace Violence & Harassment Video", "First Aid", "WHMIS", "AODA", "H&S 4 Steps Training (OHSA)", "SIN / Work Permit", "Covid Vaccination"];
        }
        else if (role === "F. Quality Assurance Coordinator") {
            var agreementsU = ["WES: Employment Agreement (Quality Assurance Coordinator)", "Workplace Violence & Harassment Video", "Security License", "First Aid", "WHMIS", "AODA", "H&S 4 Steps Training (OHSA)", "SIN / Work Permit", "Covid Vaccination", "Driver's License"];
        }
        else if (role === "E. Quality Assurance Manager") {
            var agreementsU = ["WES: Employment Agreement (Quality Assurance Manager)", "Workplace Violence & Harassment Video", "Security License", "First Aid", "WHMIS", "AODA", "H&S 4 Steps Training (OHSA)", "SIN / Work Permit", "Covid Vaccination", "Driver's License"];
        }
        else if (role === "G. Respite Security Specialist") {
            var agreementsU = ["WES: Employment Agreement RESPITE SPECIALIST", "Workplace Violence & Harassment Video", "Security License", "First Aid", "WHMIS", "AODA", "H&S 4 Steps Training (OHSA)", "SIN / Work Permit", "Covid Vaccination"];
        }
        else {
            var agreementsU = [];
        }
        var revalue = true;
        for (let i = 0; i < agreementsU.length; i++) {
            var recExist = 0;
            for (let j = 0; j < agreements.length; j++) {
                if (agreementsU[i].trim() === agreements[j].trim()) {
                    recExist = recExist + 1;
                }
                else {
                    log(agreementsU[i]);
                    log(agreements[j]);
                }
            }
            if (recExist != 1) {
                revalue = false;
                break;
            }
        }
        if (revalue == false) {
            ZDK.Client.showAlert('Necessary Agreements are not selected');
            return false;
        }
    }
    else {
        ZDK.Client.showAlert('Please select the Role and Agreements before updating this fields');
        return false;
    }
}
