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
route.get("/table_one/:address?/:dateFrom?/:dateTo?", getTableOneReport);
route.get("/table_two/:address?/:dateFrom?/:dateTo?", getTableTwoReport);
route.get("/table_three/:address?/:dateFrom?/:dateTo?", getTableThreeReport);
route.get("/table_four/:address?/:dateFrom?/:dateTo?", getTableFourReport);
route.get("/table_five/:address?/:dateFrom?/:dateTo?", getTableFiveReport);
route.get("/table_six/:address?/:dateFrom?/:dateTo?", getTableSixReport);
route.get("/table_seven/:address?/:dateFrom?/:dateTo?", getTableSevenReport);
route.get("/table_eight/:address?/:dateFrom?/:dateTo?", getTableEightReport);
route.get("/table_nine/:address?/:dateFrom?/:dateTo?", getTableNineReport);
route.get("/table_ten/:address?/:dateFrom?/:dateTo?", getTableTenReport);
route.get("/table_eleven/:address?/:dateFrom?/:dateTo?", getTableElevenReport);
route.get("/table_twelve/:address?/:dateFrom?/:dateTo?", getTableTwelveReport);
route.get("/table_thirteen/:address?/:dateFrom?/:dateTo?", getTableThirteenReport);
route.get("/table_fourteen/:address?/:dateFrom?/:dateTo?", getTableFourteenReport);
route.get("/table_fifteen/:address?/:dateFrom?/:dateTo?", getTableFifteenReport);
route.get("/table_sixteen/:address?/:dateFrom?/:dateTo?", getTableSixteenReport);
route.get("/table_seventeen/:address?/:dateFrom?/:dateTo?", getTableSeventeenReport);
route.get("/table_eighteen/:address?/:dateFrom?/:dateTo?", getTableEighteenReport);
route.get("/table_nineteen/:address?/:dateFrom?/:dateTo?", getTableNineteenReport);
route.get("/table_twenty/:address?/:dateFrom?/:dateTo?", getTableTwentyReport);

export default route