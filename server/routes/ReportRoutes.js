import { Router } from "express";
import { 
    getAllSurveyFormsData, 
    getTableEightReport, 
    getTableEighteenReport, 
    getTableElevenReport, 
    getTableFifteenReport, 
    getTableFiveReport, 
    getTableFourReport, 
    getTableFourteenReport, 
    getTableNineReport, 
    getTableNineteenReport, 
    getTableOneReport, 
    getTableSevenReport, 
    getTableSeventeenReport, 
    getTableSixReport, 
    getTableSixteenReport, 
    getTableTenReport, 
    getTableThirteenReport, 
    getTableThreeReport, 
    getTableTwelveReport, 
    getTableTwentyReport, 
    getTableTwoReport
} from "../controllers/ReportController.js";

const route = Router()

route.get("/survey_form_data", getAllSurveyFormsData);
route.get("/table_one", getTableOneReport);
route.get("/table_two", getTableTwoReport);
route.get("/table_three", getTableThreeReport);
route.get("/table_four", getTableFourReport);
route.get("/table_five", getTableFiveReport);
route.get("/table_six", getTableSixReport);
route.get("/table_seven", getTableSevenReport);
route.get("/table_eight", getTableEightReport);
route.get("/table_nine", getTableNineReport);
route.get("/table_ten", getTableTenReport);
route.get("/table_eleven", getTableElevenReport);
route.get("/table_twelve", getTableTwelveReport);
route.get("/table_thirteen", getTableThirteenReport);
route.get("/table_fourteen", getTableFourteenReport);
route.get("/table_fifteen", getTableFifteenReport);
route.get("/table_sixteen", getTableSixteenReport);
route.get("/table_seventeen", getTableSeventeenReport);
route.get("/table_eighteen", getTableEighteenReport);
route.get("/table_nineteen", getTableNineteenReport);
route.get("/table_twenty", getTableTwentyReport);

export default route