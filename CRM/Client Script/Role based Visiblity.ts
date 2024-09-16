
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/
//ZDK.Page.getField('Role').setVisibility(false);
 // ZDK.Page.getField('Funnel_Stage').setVisibility(false);
var field_obj = ZDK.Page.getField('Role').getValue();
if (field_obj == "A. Union Station Security Specialist")
{
    log('Hai');
    ZDK.Page.getField('Security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Weather_conditions').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false); 
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('Valid_G_Driver_s_License').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
    //stage;
}
if (field_obj == "B. Security Guard")
{
    log('Hai');
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_tactical_vest').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false); 
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('Valid_G_Driver_s_License').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
    //stage;
}
if (field_obj == "C. Mobile Patrol Supervisor")
{
    log('Hai');
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Weather_conditions').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false); 
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('Possess_a_valid_Security_license').setVisibility(false);
    //stage;
//     ZDK.Page.getField('WHMIS').setVisibility(false);
//     var newfield = ZDK.Page.getField('Required_Documents_are_Uploaded');
// newfield.setReadOnly(true);
}
else
{
    ZDK.Page.getField('WHMIS').setVisibility(true);
}
if (field_obj == "D. Community Safety Ambassador")
{
    log('Hai');
    ZDK.Page.getField('Security_experience').setVisibility(false);
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_tactical_vest').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false); 
    ZDK.Page.getField('Valid_G_Driver_s_License').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
   ZDK.Page.getField('Possess_a_valid_Security_license').setVisibility(false);
    //stage;
}
if (field_obj == "F. Quality Assurance Coordinator")
{
    log('Hai');
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Weather_conditions').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false); 
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
   ZDK.Page.getField('Possess_a_valid_Security_license').setVisibility(false);
    //stage;
}
if (field_obj == "E. Quality Assurance Manager")
{

    log('Hai');
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Weather_conditions').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);

    //stage;
}

if (field_obj == "G. Respite Security Specialist")
{
    log('Hai');
    ZDK.Page.getField('Security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Weather_conditions').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false); 
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('Valid_G_Driver_s_License').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
    //stage;
}
//New Roles below Jan 22, 2024
if (field_obj == "H. Tactical Security Supervisor")
{
    log('Hai');
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Proficient_in_English').setVisibility(false);
    ZDK.Page.getField('Weather_conditions').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false);
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('Valid_G_Driver_s_License').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
    //stage;
}
if (field_obj == "J. Concierge Security")
{
    log('Hai');
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_tactical_vest').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false);
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('Valid_G_Driver_s_License').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
    //stage;
}
if (field_obj == "K. TTC Security Guard")
{
    log('Hai');
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Proficient_in_English').setVisibility(false);
    ZDK.Page.getField('Weather_conditions').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_tactical_vest').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false);
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('Valid_G_Driver_s_License').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
    //stage;
}
if (field_obj == "L. TTC Mobile Patrol")
{
    log('Hai');
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Proficient_in_English').setVisibility(false);
    ZDK.Page.getField('Weather_conditions').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_tactical_vest').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false);
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    //stage;
}
if (field_obj == "M. Mobile Patrol Guard")
{
    log('Hai');
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Proficient_in_English').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_tactical_vest').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_issued_security_uniform').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false);
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
    //stage;
}
if (field_obj == "N. Semi-Tactical Security Guard")
{
    log('Hai');
    ZDK.Page.getField('law_enforcement_AND_how_much_security_experience').setVisibility(false);
    ZDK.Page.getField('Supervisor_role_experience').setVisibility(false);
    ZDK.Page.getField('Customer_Experience').setVisibility(false);
    ZDK.Page.getField('Comfortable_to_wearing_tactical_vest').setVisibility(false);
    ZDK.Page.getField('Coaching_multiple_guards_at_multiple_locations').setVisibility(false); 
    ZDK.Page.getField('Disposing_of_hazardous_materials').setVisibility(false);
    ZDK.Page.getField('Comfortable_wearing_uniform').setVisibility(false);
    ZDK.Page.getField('Valid_G_Driver_s_License').setVisibility(false);
    ZDK.Page.getField('your_shift_in_a_company_vehicle').setVisibility(false);
    //stage;
}
//field_obj.setVisibility(true);
